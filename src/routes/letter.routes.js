const {Router}=require("express");
const letterController=require('../controllers/letter.controller');
const {validationToken}=require('../middleware/validationToken')
const letterRouter=Router();

letterRouter.post('/register', letterController.register);
//letterRouter.get("/:id", letterController.getOneCategory);
letterRouter.post('/registerDetalle', letterController.registerDetalle);
letterRouter.get('/lastRecord', letterController.lastRecord);
letterRouter.get('/tableState/:id', letterController.tableState);
letterRouter.put('/emesa', letterController.eMesa);
module.exports=letterRouter;