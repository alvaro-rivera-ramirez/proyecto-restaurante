const { Router } = require("express");
const {validationToken}=require("../middleware/validationToken")
const OrderController=require("../controllers/order.controller");
const OrderRouter=Router();

OrderRouter.get("/products/:idcategory",OrderController.getProductsByCategory);
OrderRouter.get("/:codeOrder",OrderController.getOneOrder);
OrderRouter.post("/",validationToken,OrderController.createOrder);
OrderRouter.put("/:codeOrder",OrderController.updateOrder);
OrderRouter.get("/",OrderController.getPedidos);
OrderRouter.post("/filtro",OrderController.getPedidosFiltro);

module.exports=OrderRouter;