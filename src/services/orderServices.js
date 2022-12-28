const conn = require("../config/bd");

  const getCountOrders = async () => {
    const countOrders = await conn.query("SELECT COUNT(*) AS count_orders FROM pedido");
    return countOrders[0];
  };
  const getCountOrdersByWaiter = async (id_usu) =>{
    const countOrders= await conn.query("SELECT COUNT(*) AS count_orders_day FROM pedido WHERE id_usu=? AND DATE_FORMAT(fecha_ped,'%Y-%m-%d')=curdate()",[id_usu])
    return countOrders[0];
  }

  const getOrdersByTable = async (numero_mesa) =>{
    const orders= await conn.query("SELECT p.id_ped, p.id_usu, p.id_cli, p.id_epedido, p.id_mod FROM pedido p JOIN mesa_pedido mp ON mp.id_ped = p.id_ped JOIN mesa m ON m.id_mesa = mp.id_mesa WHERE numero_mesa = ?",[numero_mesa])
    return orders;
  };

  const getOrderDetailsByOrder = async (id_ped) =>{
    const orders= await conn.query("SELECT * FROM detalle_pedido dp JOIN pedido p ON dp.id_ped = p.id_ped WHERE p.id_ped = ?",[id_ped])
    return orders;
  };

module.exports={
    getCountOrders,
    getCountOrdersByWaiter,
    getOrdersByTable,
    getOrderDetailsByOrder
}