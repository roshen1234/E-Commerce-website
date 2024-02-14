const { User } = require("../model/user")
const jwt=require("jsonwebtoken")
const bycrypt=require("bcryptjs")
const Secreat_Key="himynameisroshen"
exports.createUser = async (req, res) => {
    const user = new User(req.body);
    console.log(user);
    try {
        const salt = await bycrypt.genSalt(10);
        console.log("Generated Salt:", salt); // Log generated salt
        const hashedPassword = await bycrypt.hash(req.body.password, salt);
        console.log("Hashed Password:", hashedPassword); // Log hashed password
        user.password = hashedPassword;
        const doc = await user.save();
        
        // const payload = {
        //     userId: doc._id, 
        //     email: doc.email 
        //     // Add other necessary user information as needed
        // };
        // const token =jwt.sign(payload,Secreat_Key)
        // or
        const token =generateToken(user._id)
        res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true })
        res.status(201).json({id:user._id,role:user.role});
    } catch (err) {
        console.error("Error while hashing password:", err); // Log error if any
        res.status(400).json(err);
    }
};

exports.loginUser=async(req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email}).exec()
        if (!user){
            res.status(401).json({message:"No such user email"})
        }
        else if(await bycrypt.compare(req.body.password,user.password))
        {   
            const token=generateToken(user._id)
            res.cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true })
            res.status(201).json({id:user._id,role:user.role})
        }
        else{
            res.status(401).json({message:"invalid credentials"})
        }
        
    }
    catch (err){
        res.status(400).json(err)
    }
}

const generateToken=(id)=>{
  return jwt.sign({id},Secreat_Key)
}

exports.checkAuth=async(req,res)=>{
if(req.user)
{
    res.json(req.user)
}
else{
    res.sendStatus(401)
}
}