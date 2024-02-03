const express=require("express")
const { fetchLoggedInUser, updateUser } = require("../controller/User")
 router=express.Router()

router.get('/:id',fetchLoggedInUser)
      .patch('/:id',updateUser) 

exports.router=router      