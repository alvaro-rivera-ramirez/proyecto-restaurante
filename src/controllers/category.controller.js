const CategoryServices=require("../services/categoryServices");
const {
    handleErrorResponse,
    handleHttpError,
  } = require("../utils/handleError");
const getCategories = async (req, res) => {
    try {
        const categories=await CategoryServices.getCategories();
        return res.status(201).send(categories);
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
};
const getOneCategory = async(req, res) => {
    const {id_categoria,nom_categoria}=req.body;
    if(!id_categoria || !nom_categoria){
        handleErrorResponse(res,"CAMPOS VACIOS",401);
        return;
    }
    
    try {
        const categories=await CategoryServices.getCategories();
        return res.status(201).send(categories);
    } catch (error) {
        handleErrorResponse(res, "CATEGORY_INVALID", 401);
        console.log(error)
    }
};
const createCategory = (req, res) => {};
const updateCategory = (req, res) => {};
const deleteCategory = (req, res) => {};

module.exports={
    getCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory
}


