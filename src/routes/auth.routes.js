const {Router}=require("express");
const authController=require('../controllers/auth.controller');
const {validationToken}=require('../middleware/validationToken')
const {validateUser}=require('../middleware/validators/auth');
const authRouter=Router();

authRouter.post('/register',validateUser, authController.register);
authRouter.post('/login', authController.signIn);
authRouter.get('/home',validationToken,authController.home);


module.exports=authRouter;
