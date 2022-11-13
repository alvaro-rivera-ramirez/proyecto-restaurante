const { Router } = require("express");
const TableController = require("../controllers/table.controller");
const {
  validateId,
  validateDataCreate,
  validateDataUpdate,
} = require("../middleware/validators/tables");
const TableRouter = Router();

TableRouter.get("/", TableController.getTables);
TableRouter.get("/:id", validateId, TableController.getOneTable);
TableRouter.post("/", validateDataCreate, TableController.createTable);
TableRouter.put("/:id", validateDataUpdate,TableController.updateTable);
TableRouter.delete("/:id", validateId, TableController.deleteTable);

TableRouter.get("/*",(req,res)=>{
  res.status(404).json({msg:"NOT FOUND PAGE"});
})

module.exports = TableRouter;