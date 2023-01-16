const{validationResult}=require('express-validator');
const validateResultForgot=(req,res,next)=>{
    try{
        validationResult(req).throw()
        return next()
    }
    catch(err){
        res.status(500)
        res.send({error: err.array()})
    }
}
const validateResultReset=(req,res,next)=>{
    try{
        validationResult(req).throw()
        return next()
    }
    catch(err){
        res.status(500)
        res.send({error: err.array()})
    }
}
const validateResultUpdateUser=(req,res,next)=>{
    try{
        validationResult(req).throw()
        return next()
    }
    catch(err){
        res.status(500)
        res.send({error: err.array()})
    }
}
module.exports={
    validateResultForgot,
    validateResultReset,
    validateResultUpdateUser
}