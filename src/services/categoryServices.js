const con = require("../config/bd");

const getCategories = async () => {
  const categories = await con.query("SELECT * FROM categoria");
  if (!categories) throw new Error();

  return categories;
};
const getOneCategory = async (id) => {
  const category = await con.query(
    "SELECT * FROM categoria WHERE id_categoria=?",
    [id]
  );

  if (!category || !category.length) throw new Error("CATEGORY_NOT_EXISTS");

  return category;
};
const createCategory = async (category) => {
  try {
    console.log(category);
    const newCategory = await con.query("INSERT INTO categoria SET ?", [
      category,
    ]);
    console.log(newCategory);
  } catch (error) {
    console.log(error);
    throw new Error("CATEGORY_INVALID");
  }
};
const updateCategory = async (id, category) => {
  try {
    const upCategory = await con.query(
      "UPDATE categoria SET ? WHERE id_categoria=? ",
      [category, id]
    );
    console.log(upCategory);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
const deleteCategory = async (id) => {
  try {
    const category = await con.query(
      "DELETE FROM categoria WHERE id_categoria=?",
      [id]
    );
    console.log(category)
    return category;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

module.exports = {
  getCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
