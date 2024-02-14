const jwt=require("jsonwebtoken")
const { User } = require("../model/user")
const Secreat_Key="himynameisroshen"

const fetchuser =async (req,res,next) =>{
    // get the user from the jwt token and add it to req object
    let token=null
//    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) if we are passing the jwt token in header in postman
if(req && req.cookies )
   {
    try {
        // token =req.headers.authorization.split(' ')[1]
        token=req.cookies['jwt'] //this does it automatically no need to put jwt token by us
        const decoded=jwt.verify(token,Secreat_Key)
        req.user=decoded.id
        next()
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"})
    }
   } 
   else if(!token)
   {
    res.status(401).send({error:"no token entered"})
   } 

   }
 module.exports={fetchuser};
