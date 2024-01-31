const mongoose = require('mongoose')
const User = require('../Users/users.model')
const Product = require('../Products/product.model')


const addtocartSchema = mongoose.Schema({

    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    products : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', unique: true }],
    total : {type: Number}
},{ timestamps: true })

module.exports = mongoose.model('Addtocart', addtocartSchema)