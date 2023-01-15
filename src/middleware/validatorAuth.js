const{validationResult}=require('express-validator');
const validateResult=(req,res,next)=>{
    try{
        validationResult(req).throw()
        return next()
    }
    catch(err){
        res.status(500)
        res.send({error: err.array()})
    }
}
module.exports={validateResult}