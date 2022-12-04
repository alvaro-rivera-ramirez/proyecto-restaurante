const {Router}=require("express");
const letterController=require('../controllers/letter.controller');
const {validationToken}=require('../middleware/validationToken')
const tetterRouter=Router();

tetterRouter.post('/register', letterController.register);
tetterRouter.post('/registerDetalle', letterController.registerDetalle);
module.exports=tetterRouter;