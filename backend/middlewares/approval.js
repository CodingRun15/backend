const approval = (req,res,next)=>{
        if(req.role==='manager'){
            next();
        }
        else{
            res.status(401).json({message:'Waiting for approval from manager'});
        }

}
module.exports ={approval}