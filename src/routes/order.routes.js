const { Router } = require("express");
const {validationToken}=require("../middleware/validationToken")
const OrderController=require("../controllers/order.controller");
const OrderRouter=Router();

OrderRouter.get("/products/:idcategory",OrderController.getProductsByCategory);
OrderRouter.get("/",validationToken,OrderController.getOrders);
OrderRouter.get("/:codeOrder",OrderController.getOneOrder);
OrderRouter.post("/",validationToken,OrderController.createOrder);
OrderRouter.post("/filtro",OrderController.getPedidosFiltro);
OrderRouter.patch("/:codeOrder",validationToken,OrderController.updateStateOrder);

module.exports=OrderRouter;