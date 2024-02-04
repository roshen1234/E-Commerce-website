
const express=require('express');
const { fetchOrdersByUser, createOrder, deleteOrder, updateOrder, fetchAllOrders } = require('../controller/Order');


router=express.Router()

router.get('/user/:userId',fetchOrdersByUser)
      .post('/',createOrder)
      .delete("/:id",deleteOrder)
      .patch("/:id",updateOrder)
      .get('/',fetchAllOrders)

exports.router=router