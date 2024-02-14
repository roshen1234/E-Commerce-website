const express=require("express")
const { createUser,loginUser,checkAuth } = require("../controller/Auth")
const {fetchuser}=require("../middleware/authMiddleWare")
 router=express.Router()

router.post('/signup',createUser)
      .post('/login',loginUser)
      .get('/check',fetchuser,checkAuth)
exports.router=router
      