const { Router } = require("express");
const {validationToken}=require("../middleware/validationToken")
const {validateCreateClient,validateSearchClient}=require("../middleware/validators/client")
const ClientController=require("../controllers/client.controller");
const ClientRouter=Router();

ClientRouter.get("/:dni",validationToken,validateSearchClient,ClientController.getClientByDni);
ClientRouter.post("/",validationToken,validateCreateClient,ClientController.createClient);

module.exports=ClientRouter;