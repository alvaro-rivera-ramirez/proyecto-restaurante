const {Router}=require("express");
const upload = require('../config/multer.js');
const ProductoController=require("../controllers/producto.controller.js");
const {
    validateId,
    validateDataCreate,
    validateDataUpdate,
  } = require("../middleware/validators/producto");
const ProductoRouter=Router();


ProductoRouter.get("/",ProductoController.getProducto);
ProductoRouter.get("/:id",ProductoController.getOneProducto);
ProductoRouter.post("/",upload.single('imagenProd'),ProductoController.createProducto);
ProductoRouter.put("/:id",validateDataUpdate,ProductoController.updateProducto);
ProductoRouter.delete("/:id",ProductoController.deleteProducto);

module.exports=ProductoRouter;