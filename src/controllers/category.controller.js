const CategoryServices = require("../services/categoryServices");
const {
  handleErrorResponse,
  handleHttpError,
} = require("../utils/handleError");
const getCategories = async (req, res) => {
  try {
    const categories = await CategoryServices.getCategories();
    return res.status(201).send(categories);
  } catch (error) {
    console.log(error);
    return res.status(401);
  }
};
const getOneCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoryServices.getOneCategory(id);
    return res.status(201).send(category);
  } catch (error) {
    handleErrorResponse(res, "CATEGORY_INVALID", 401);
    console.log(error);
  }
};
const createCategory = async (req, res) => {
  const { nom_categoria } = req.body;
  const category = { nom_categoria };
  try {
    await CategoryServices.createCategory(category);
    return res.status(201).send({msg:true});
  } catch (error) {
    console.log(error);
    res.status(500).send({msg:false})
  }
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { nom_categoria } = req.body;
  const category = { nom_categoria };
  try {
    await CategoryServices.updateCategory(id, category);
    return res.status(200).send({mensaje:"CATEGORY_UPDATED"});
  } catch (error) {
    handleErrorResponse(res, "ERROR EN LA CONSULTA");
    console.log(error);
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await CategoryServices.deleteCategory(id);
    return res.status(200).send({msg:"CATEGORY_DELETED",ok:true});
  } catch (error) {
      handleErrorResponse(res, "ERROR EN LA CONSULTA");
    console.log(error);
  }
};

module.exports = {
  getCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
