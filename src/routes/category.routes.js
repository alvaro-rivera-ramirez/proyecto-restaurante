const { Router } = require("express");
const CategoryController = require("../controllers/category.controller.js");
const {
  validateId,
  validateDataCreate,
  validateDataUpdate,
} = require("../middleware/validators/category");
const CategoryRouter = Router();

CategoryRouter.get("/", CategoryController.getCategories);
CategoryRouter.get("/:id", validateId, CategoryController.getOneCategory);
CategoryRouter.post("/", validateDataCreate, CategoryController.createCategory);
CategoryRouter.put("/:id", validateDataUpdate,CategoryController.updateCategory);
CategoryRouter.delete("/:id", validateId, CategoryController.deleteCategory);

CategoryRouter.get("/*",(req,res)=>{
  res.status(404).json({msg:"NOT FOUND PAGE"});
})

module.exports = CategoryRouter;
