const {Router}=require("express");
const CategoryController=require("../controllers/category.controller.js");
const CategoryRouter=Router();


CategoryRouter.get("/",CategoryController.getCategories);
CategoryRouter.get("/:id",CategoryController.getOneCategory);
CategoryRouter.post("/",CategoryController.createCategory);
CategoryRouter.put("/",CategoryController.updateCategory);
CategoryRouter.delete("/",CategoryController.deleteCategory);

module.exports=CategoryRouter;