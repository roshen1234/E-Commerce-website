const { User } = require("../model/user")


exports.fetchLoggedInUser=async(req,res)=>{
   const id=req.user;
//    console.log(id)
    try{
        // const user=await User.findById(id,"id addresses email role") we can write either like this or given below way
        const user=await User.findById(id)
        // delete user.password
        // delete user.salt  or like this 
        res.status(200).json({id:user.id,addresses:user.addresses,email:user.email,role:user.role})
    }
    catch(err){
        res.status(400).json(err)
    }
 }


exports.updateUser=async(req,res)=>{
    const {id}=req.params;
    try{
        const user=await User.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(user)
    }
    catch{
        res.status(400).json(err)
    }
}