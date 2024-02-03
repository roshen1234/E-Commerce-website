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
const port=8080;
const cors=require('cors')

server.use(cors({
exposedHeaders:["X-Total-Count"]
}))

const mongoURI="mongodb://0.0.0.0/ecommerce"
mongoose.connect(mongoURI)
    const conn=mongoose.connection
    conn.once('open',()=>{
      console.log('successfullly connected to database')
    })
    conn.once('error',(error)=>{
        console.log(`failed to connected to database${error.message}`)
      })
   
server.use(express.json())

server.get('/',(req,res)=>{
    res.json({status:"success"})}
) 

server.use("/products",productsRouter.router)
server.use("/categories",categoriesRouter.router)
server.use("/brands",brandsRouter.router)
server.use("/auth",authRouter.router)
server.use("/users",userRouter.router)
server.use("/cart",cartRouter.router)
server.use("/orders",orderRouter.router)
// server.listen(8080,()=>{
//     console.log('server started')
// })
server.listen(port, () => {
    console.log(`Ecommerce backend listening at http://localhost:${port}`)
  })