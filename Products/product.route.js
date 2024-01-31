var express = require('express');
const router = express.Router();

const productController = require('./product.controller')

router.post('/',function(req, res){
    return productController.createProduct(req, res)
})

module.exports = router