const { Router } = require("express");
const {validationToken}=require("../middleware/validationToken")
const ClientController=require("../controllers/client.controller");
const ClientRouter=Router();

ClientRouter.get("/:dni",ClientController.getClientByDni);
ClientRouter.post("/",ClientController.createClient);

module.exports=ClientRouter;