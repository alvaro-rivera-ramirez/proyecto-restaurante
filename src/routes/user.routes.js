const {Router}=require("express");
const nodemailer=require("nodemailer");
const jwt=require('jsonwebtoken');
const userController=require('../controllers/user.controller');
const {validateForgot,validateReset}=require('../middleware/validators/user');
const UserRouter=Router();


UserRouter.get('/',userController.getUsers);
UserRouter.get('/:id',userController.getUser);
UserRouter.put('/',userController.updateUser);
UserRouter.delete('/:id',userController.deleteUser);
UserRouter.post('/change-psd',userController.changePassword);
UserRouter.post('/forgot-psw',validateForgot,userController.forgotPswPost);
UserRouter.put('/reset-psw',validateReset,userController.resetPwsPut);
module.exports=UserRouter;