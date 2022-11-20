const {Router}=require("express");
const storage = require('../config/multer.js');
const multer = require('multer');
const uploader = multer({storage});
const ProductoController=require("../controllers/producto.controller.js");
const ProductoRouter=Router();


ProductoRouter.get("/",ProductoController.getProducto);
ProductoRouter.get("/:id",ProductoController.getOneProducto);
ProductoRouter.post("/",uploader.single('file'),ProductoController.createProducto);
ProductoRouter.put("/:id",ProductoController.updateProducto);
ProductoRouter.delete("/:id",ProductoController.deleteProducto);

module.exports=ProductoRouter;