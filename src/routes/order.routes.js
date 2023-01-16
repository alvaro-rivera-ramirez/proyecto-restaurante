const { Router } = require("express");
const {validationToken}=require("../middleware/validationToken")
const OrderController=require("../controllers/order.controller");
const {validateCreateOrder}=require("../middleware/validators/newOrder");
const OrderRouter=Router();
OrderRouter.get("/report/:id",validationToken,OrderController.getReport);
OrderRouter.get("/products/:idcategory",validationToken,OrderController.getProductsByCategory);
OrderRouter.get("/",validationToken,OrderController.getOrders);
OrderRouter.get("/:codeOrder",validationToken,OrderController.getOneOrder);
OrderRouter.post("/",validationToken,validateCreateOrder,OrderController.createOrder);
OrderRouter.post("/filtro",validationToken,OrderController.getPedidosFiltro);
OrderRouter.patch("/:codeOrder",validationToken,OrderController.updateStateOrder);
module.exports=OrderRouter;