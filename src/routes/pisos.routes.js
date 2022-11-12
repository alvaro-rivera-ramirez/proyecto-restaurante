const {Router}=require("express");
const PisosController=require("../controllers/pisos.controller.js");
const PisosRouter=Router();

PisosRouter.get("/",PisosController.getPisos);
PisosRouter.get("/:id",PisosController.getOnePisos);
PisosRouter.post("/",PisosController.createPisos);
PisosRouter.put("/:id",PisosController.updatePisos);
PisosRouter.delete("/:id",PisosController.deletePisos);

module.exports=PisosRouter;