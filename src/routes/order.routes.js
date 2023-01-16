const { Router } = require("express");
const {validationToken}=require("../middleware/validationToken");
const OrderController=require("../controllers/order.controller");
const {validateCreateOrder}=require("../middleware/validators/newOrder");
const OrderRouter=Router();

OrderRouter.get("/reportAll",OrderController.getReportAll);
OrderRouter.get("/reportOne/:id",OrderController.getReportOne);
OrderRouter.get("/report/:id",OrderController.getReport);
OrderRouter.get("/todo",OrderController.getPedidosAll);
OrderRouter.get("/products/:idcategory",OrderController.getProductsByCategory);
OrderRouter.get("/",validationToken,OrderController.getOrders);
OrderRouter.get("/:codeOrder",validationToken,OrderController.getOneOrder);
OrderRouter.post("/",validationToken,validateCreateOrder,OrderController.createOrder);
OrderRouter.post("/filtro",validationToken,OrderController.getPedidosFiltro);
OrderRouter.patch("/:codeOrder",validationToken,OrderController.updateStateOrder);
module.exports=OrderRouter;