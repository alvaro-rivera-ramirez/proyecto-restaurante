const {Router}=require("express");
//const storage = require('../config/multer');
//const multer = require('multer');
//const uploadFile=require('../config/multer');
//const uploader = multer({dest: '../config/multer'});
//const upload = require('../config/uploader');
const ProductoController=require("../controllers/producto.controller.js");
const ProductoRouter=Router();
const uploaders=require('../config/uploader');



ProductoRouter.get("/",ProductoController.getProducto);
ProductoRouter.get("/:id",ProductoController.getOneProducto);
//ProductoRouter.post("/",ProductoController.createProducto);
ProductoRouter.post("/registro",uploaders.single('file'),ProductoController.createProducto);
ProductoRouter.put("/:id",ProductoController.updateProducto);
ProductoRouter.delete("/:id",ProductoController.deleteProducto);

module.exports=ProductoRouter;