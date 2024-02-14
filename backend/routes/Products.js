const { createProduct, fetchAllProducts, fetchProductId, updateProduct } = require("../controller/Product")
const express=require('express');
router=express.Router()

router.post('/',createProduct)
      .get('/',fetchAllProducts)
      .get('/:id',fetchProductId)
      .patch('/:id',updateProduct)

exports.router=router