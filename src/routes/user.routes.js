const {Router}=require("express");
const userController=require('../controllers/user.controller')
const {validationToken}=require('../middleware/validationToken')
const UserRouter=Router();

UserRouter.get('/',userController.getUsers);
UserRouter.get('/:id',validationToken, userController.getUser);
UserRouter.put('/',userController.updateUser);
UserRouter.delete('/:id',userController.deleteUser);



module.exports=UserRouter;