const {Router}=require("express");
const userController=require('../controllers/user.controller')
const {validationToken}=require('../middleware/validationToken')
const UserRouter=Router();

UserRouter.get('/', userController.getUsers);
UserRouter.get('/:id', validationToken, userController.getUser);
UserRouter.put('/:id', validationToken, userController.updateUser);
UserRouter.delete('/:id', validationToken, userController.deleteUser);
UserRouter.post('/change-psd', userController.changePassword);

module.exports=UserRouter;