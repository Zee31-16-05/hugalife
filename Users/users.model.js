const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    name : {type: String},
    email : {type: String},
    password : {type: String},
    address : {type: String},
    phone : {type: Number}
},{ timestamps: true })

module.exports = mongoose.model('User', userSchema)