var express = require('express');
const router = express.Router();

const userController = require('./users.controller')

router.post('/',function(req,res){
    return userController.createUser(req,res)
})

router.post('/login',function(req,res){
    return userController.loginUser(req,res)
})

module.exports = router