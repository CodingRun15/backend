const express = require('express');
const { auth } = require('../middlewares/auth');
const { taskModel } = require('../models/task.model');
const { access } = require('../middlewares/access');
const { approval } = require('../middlewares/approval');
const taskRouter = express.Router();

taskRouter.get('/', auth, access("admin","manager","member"),async (req, res) => {
    console.log(req.id);
    if(req.role==='admin'||req.role==='manager'){
  const tasks = await taskModel.find();
  res.json(tasks);
    }else{
        const tasks = await taskModel.find({userID:req.id})
        res.json(tasks);
    }
});
taskRouter.post('/createtask', auth, async (req, res) => {
    const task = new taskModel(req.body);
    await task.save();
    res.json("task created successfully");
})

taskRouter.patch('/:id',auth,access("member"),async(req,res)=>{
    const taskID = req.params.id;
    console.log(taskID);
    try{
        const task = await taskModel.findOne({_id:taskID});
        if(task){
          if(task.userID===req.id){
            await taskModel.findByIdAndUpdate({_id:taskID},req.body)
            return res.json("updated successfully");
        }
       else{
            return res.status(404).json("you can not edit this");
        }
    }
    return res.json("task not found");
    }catch(err){
        return res.status(404).json(err);
    }

})

taskRouter.delete('/:id',auth,access("member","manager"),approval,async(req,res)=>{
    const taskID = req.params.id;
    try{
        const task = await taskModel.findOne({_id:taskID});
        if(task){
          if(task.userID===req.id){
            await taskModel.findByIdAndDelete({_id:taskID})
            return res.json("deleted successfully");
        }
       else{
            return res.status(404).json("you can not delete this");
        }
    }
    return res.json("task not found");
    }catch(err){
        return res.status(404).json(err);
    }
})
module.exports ={
    taskRouter
}