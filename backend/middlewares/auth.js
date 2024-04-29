const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user.model');
require("dotenv").config();
const auth = async (req, res, next) => {
    try{
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token,process.env.secretKey,async(err,decoded)=>{
            if(err){
                return res.status(401).json({
                    message:"Token is not valid"
                })
            }
            const {userID,username} = decoded;
            req.body.userID = userID;
            req.body.username = username;
            const user = await userModel.findOne({_id:userID})
            const requiredRole = user.role;
            req.role = requiredRole;
            req.id = userID;
           
             next();
        })
    }
    catch(err){
        return res.status(401).json({
            message:"Some error occurred while verifying"
        })
    }
}
module.exports ={auth};