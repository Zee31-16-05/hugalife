var express = require('express');
const router = express.Router();

const placeOrderController = require('./order.controller')

router.post('/',function(req, res){
    return placeOrderController.palceOrder(req,res)
})

module.exports = router
