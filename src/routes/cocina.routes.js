const {Router}=require("express");
const CheffController=require("../controllers/cheff.controller.js");
const CocinaRouter=Router();

CocinaRouter.get("/",CheffController.getIdPedidoAll);
CocinaRouter.get("/summary",CheffController.getSummaryOrders);
CocinaRouter.get("/:id",CheffController.getPedido);
CocinaRouter.put("/:id",CheffController.updateEstadoPed);

module.exports=CocinaRouter;