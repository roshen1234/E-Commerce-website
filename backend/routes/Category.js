const { fetchCategories, createCategories } = require('../controller/Category');
const express=require('express');

router=express.Router()

router.get('/',fetchCategories).post('/',createCategories)

exports.router=router