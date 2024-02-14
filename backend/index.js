require('dotenv').config()
const express=require('express');
const server=express();
const mongoose=require('mongoose');
const productsRouter=require("./routes/Products")
const categoriesRouter=require("./routes/Category")
const brandsRouter=require("./routes/Brands")
const authRouter=require("./routes/Auth")
const userRouter=require("./routes/User")
const cartRouter=require("./routes/Cart")
const orderRouter=require("./routes/Order")
const {fetchuser}=require("./middleware/authMiddleWare")
const cors=require('cors');
const cookieParser = require('cookie-parser');
const path=require("path")



//webHook
const endpointSecret = process.env.END_POINT_SECRET;

server.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log({paymentIntentSucceeded})
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});




server.use(express.static(path.resolve(__dirname,'build')))

server.use(cookieParser())

server.use(cors({
exposedHeaders:["X-Total-Count"]
}))

const mongoURI=process.env.MONGODB_URL
mongoose.connect(mongoURI)
    const conn=mongoose.connection
    conn.once('open',()=>{
      console.log('successfullly connected to database')
    })
    conn.once('error',(error)=>{
        console.log(`failed to connected to database${error.message}`)
      })
// server.use(express.raw({type: 'application/json'}))   
server.use(express.json())

server.get('/',(req,res)=>{
    res.json({status:"success"})}
) 

server.use("/products",fetchuser,productsRouter.router)
server.use("/categories",fetchuser,categoriesRouter.router)
server.use("/brands",fetchuser,brandsRouter.router)
server.use("/auth",authRouter.router)
server.use("/users",fetchuser,userRouter.router)
server.use("/cart",fetchuser,cartRouter.router)
server.use("/orders",fetchuser,orderRouter.router)

//payment Intent 

const stripe = require("stripe")(process.env.STRIPE_SERVER_KEY);

server.post("/create-payment-intent", async (req, res) => {
  const {totalAmount}  = req.body;
 console.log(req.body)
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount*100, // for decimal compensation
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


server.listen(process.env.PORT, () => {
    console.log(`Ecommerce backend listening at http://localhost:${process.env.PORT}`)
  })