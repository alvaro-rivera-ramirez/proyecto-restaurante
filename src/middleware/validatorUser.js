const{validateForgot,}=require('express-validator');
const validateResultForgot=(req,res,next)=>{
    try{
        validateForgot(req).throw()
        return next()
    }
    catch(err){
        res.status(500)
        res.send({error: err.array()})
    }
}
const validateResultReset=(req,res,next)=>{
    try{
        validateReset(req).throw()
        return next()
    }
    catch(err){
        res.status(500)
        res.send({error: err.array()})
    }
}
module.exports={
    validateResultForgot,
    validateResultReset
}