const mongoose = require('mongoose');
const userModel = mongoose.model('user',{
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        enum:['admin','manager','member'],
        default:'member'
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active'
    }
})

module.exports = {userModel};