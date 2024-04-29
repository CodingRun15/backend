const express = require('express');
const { userModel } = require('../models/user.model');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('../middlewares/auth');
const { access } = require('../middlewares/access');
userRouter.get('/',auth, access("admin"),async(req, res) => {
  const users = await userModel.find();
  res.json(users);
});
userRouter.post('/signup',async(req,res)=>{
    const {name,email,password,role} = req.body;
    try{
    const user = await userModel.findOne({email: email});
    if(user){
        return res.status(401).json("user already exists");
    }
    bcrypt.hash(password,5,async (err, data) => {
    const newUser = new userModel({name:name,email:email,password:data,role:role});
    await newUser.save();
    return res.status(200).json("successfully registered");
})
    }catch(err){
        return res.status(500).json(err);  
}
})
userRouter.post('/signin',async(req,res)=>{
    try{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json("user not found");
    }
    bcrypt.compare(password,user.password,(err,result)=>{
      if(err){
        return res.status(500).json(err);
      }
      if(!result){
        return res.status(401).json("incorrect password");
      }
      const token = jwt.sign({userID:user._id,username:user.name},process.env.secretKey,{expiresIn:"2h"});
      return res.status(200).json({message:"login success",token});
    })
}
    catch(err){
        return res.status(500).json(err);
    }
})
module.exports ={
    userRouter
}