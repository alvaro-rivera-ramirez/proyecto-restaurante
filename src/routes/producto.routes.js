const {Router}=require("express");
const upload = require('../config/multer.js');
const ProductoController=require("../controllers/producto.controller.js");
const ProductoRouter=Router();


ProductoRouter.get("/",ProductoController.getProducto);
ProductoRouter.get("/:id",ProductoController.getOneProducto);
ProductoRouter.post("/",upload.single('imagenProd'),ProductoController.createProducto);
ProductoRouter.put("/:id",ProductoController.updateProducto);
ProductoRouter.delete("/:id",ProductoController.deleteProducto);

module.exports=ProductoRouter;