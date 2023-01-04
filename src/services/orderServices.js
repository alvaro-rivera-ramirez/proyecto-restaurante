const conn = require("../config/bd");

  const getCountOrders = async () => {
    const countOrders = await conn.query("SELECT COUNT(*) AS count_orders FROM pedido");
    return countOrders[0];
  };

  const getCountOrdersByWaiter = async (id_usu) =>{
    const countOrders= await conn.query("SELECT COUNT(*) AS count_orders_day FROM pedido WHERE id_usu=? AND DATE_FORMAT(fecha_ped,'%Y-%m-%d')=curdate()",[id_usu])
    return countOrders[0];
  }

  const getOrderByTable = async (numero_mesa) =>{
    const orders= await conn.query("SELECT p.id_ped, p.id_usu, CONCAT(u.nom_usu, ' ', u.ape1_usu, ' ', u.ape2_usu) AS nom_usu, p.id_cli, c.nom_cli FROM pedido p JOIN mesa_pedido mp ON mp.id_ped = p.id_ped JOIN mesa m ON m.id_mesa = mp.id_mesa JOIN usuario u ON u.id_usu = p.id_usu JOIN cliente c ON c.id_cli = p.id_cli WHERE numero_mesa = ?",[numero_mesa])

    return orders;
  };

  const getOrderDetailsByOrder = async (id_ped) =>{
    const orders= await conn.query("SELECT dp.id_prod, dp.cantidad_det, dp.descripcion_det, pr.nom_prod, pr.precio_u_prod, (cantidad_det * precio_u_prod) AS subtotal FROM detalle_pedido dp JOIN pedido p ON dp.id_ped = p.id_ped JOIN producto pr ON dp.id_prod = pr.id_prod WHERE p.id_ped = ?",[id_ped])
    return orders;
  };

module.exports={
    getCountOrders,
    getCountOrdersByWaiter,
    getOrderByTable,
    getOrderDetailsByOrder
}