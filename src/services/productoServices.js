const con = require("../config/bd");

const getProducto = async () => {
  const producto = await con.query(
    "SELECT * FROM producto P, categoria C WHERE P.id_categoria=C.id_categoria"
  );
  if (!producto) throw new Error();
  console.log(producto);
  return producto;
};
const getOneProducto = async (id) => {
  const producto = await con.query("SELECT * FROM producto WHERE id_prod=?", [
    id,
  ]);

  if (!producto) throw new Error();

  return producto;
};
const createProducto = async (producto) => {
  try {
    const newProducto = await con.query("INSERT INTO producto SET ?", [
      producto,
    ]);
    return newProducto;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
const updateProducto = async (id, product) => {
  try {
    const newProducto = await con.query(
      "UPDATE producto SET ? WHERE id_prod=? ",
      [product, id]
    );
    return newProducto;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
const deleteProducto = async (id) => {
  try {
    await con.query("DELETE FROM producto WHERE id_prod=?", [id]);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const getProductByCategory = async (id) => {
  const products = await con.query(
    "SELECT p.* FROM categoria c,producto p WHERE c.id_categoria=p.id_categoria AND c.id_categoria=?",
    [id]
  );

  if (!products.length) throw new Error();

  return products;
};
module.exports = {
  getProducto,
  getOneProducto,
  getProductByCategory,
  createProducto,
  updateProducto,
  deleteProducto,
};
