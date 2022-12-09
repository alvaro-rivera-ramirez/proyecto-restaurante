const {Router}=require("express");
const letterController=require('../controllers/letter.controller');
const {validationToken}=require('../middleware/validationToken')
const letterRouter=Router();

letterRouter.post('/register', letterController.register);
letterRouter.post('/registerDetalle', letterController.registerDetalle);
letterRouter.get('/lastRecord', letterController.lastRecord);
module.exports=letterRouter;