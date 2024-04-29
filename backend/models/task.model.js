const mongoose = require('mongoose');
const taskModel = mongoose.model('task',{
    title:String,
    description:String,
    priority:Boolean,
    recurring:Boolean,
    deadline:String,
    username:String,
    userID:String,
})
module.exports ={taskModel};