const conn = require("../config/bd");

const getCountOrders = async () => {
  const countOrders = await conn.query(
    "SELECT COUNT(*) AS count_orders FROM pedido"
  );

  return countOrders[0];
};
const getCountOrdersByWaiter = async (id_usu) => {
  const countOrders = await conn.query(
    "SELECT COUNT(*) AS count_orders_day FROM pedido WHERE id_usu=? AND DATE_FORMAT(fecha_ped,'%Y-%m-%d')=curdate()",
    [id_usu]
  );
  return countOrders[0];
};

const createOrder = async (order) => {
  try {
    console.log(order);
    const newOrder = await conn.query("INSERT INTO pedido SET ?", [order]);
    return newOrder.insertId;
  } catch (error) {
    console.log(error);
    throw new Error("ERROR EN LA CONSULTA");
  }
};

const createDetailOrder = async (detail) => {
  try {
    console.log(detail);
    const newDetail = await conn.query("INSERT INTO detalle_pedido SET ?", [detail]);
  } catch (error) {
    console.log(error);
    throw new Error("ERROR EN LA CONSULTA");
  }
};

const createTableByOrder=async (idOrder,table)=>{
  try {
    const tOrder={
      id_ped:idOrder,
      id_mesa:table
    }
    const newTableOrder= await conn.query("INSERT INTO mesa_pedido SET ?", [tOrder]);
  } catch (error) {
    console.log(error);
    throw new Error("ERROR EN LA CONSULTA");
  }
}

const getIdTable=async (num)=>{
  try {
    const id=await conn.query("SELECT id_mesa FROM mesa WHERE numero_mesa=?",[num]);
    return id[0];
  } catch (error) {
    console.log(error)
    throw new Error();
  }
}

const updateStateTable = async(idstate,idmesa)=>{
  try {
    await conn.query("UPDATE mesa SET id_emesa=? WHERE id_mesa=?",[idstate,idmesa]);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
const getOneOrder = async(nanoid)=>{
  const order=await conn.query("SELECT p.*,u.nom_usu FROM pedido p,usuario u WHERE p.id_usu=u.id_usu AND p.cod_ped=?",[nanoid])
  return order[0];
}

const getDetailsByOrder= async(idpedido)=>{
  const details=await conn.query("SELECT *,(cantidad_det*precio_u_prod) as subtotal FROM detalle_pedido dp,producto p WHERE dp.id_ped=? AND dp.id_prod=p.id_prod",[idpedido]);
  return details;
}

const getTableOrder=async(idpedido)=>{
  const tableOrder=await conn.query("SELECT mp.*,m.numero_mesa FROM mesa_pedido mp,mesa m WHERE mp.id_mesa=m.id_mesa AND mp.id_ped=?",[idpedido]);
  return tableOrder;
}
const updateStateOrder=async(idorder,idstate)=>{
  const upOrder=await conn.query("UPDATE pedido SET id_epedido=? WHERE id_ped=?",[idorder,idstate])
}

module.exports = {
  getCountOrders,
  getCountOrdersByWaiter,
  createOrder,
  createDetailOrder,
  createTableByOrder,
  getIdTable,
  getOneOrder,
  getDetailsByOrder,
  getTableOrder,
  updateStateTable,
  updateStateOrder
};
