const {Router}=require("express");
const letterController=require('../controllers/letter.controller');
const {validationToken}=require('../middleware/validationToken')
const letterRouter=Router();

letterRouter.post('/register', letterController.register);
letterRouter.post('/registerDetalle', letterController.registerDetalle);
letterRouter.get('/lastRecord', letterController.lastRecord);
letterRouter.get('/tableState', letterController.tableState);
letterRouter.put('/emesa', letterController.eMesa);
letterRouter.get('/getMod', letterController.getMod);
letterRouter.get('/getEpedido', letterController.getEpedido);
letterRouter.post('/orderTable', letterController.orderTable);
letterRouter.get('/getDetPed/:id', letterController.getDetPed);

module.exports=letterRouter;