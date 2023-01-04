const conn = require("../config/bd");

  const getCountOrders = async () => {
    const countOrders = await conn.query("SELECT COUNT(*) AS count_orders FROM pedido");
  
    return countOrders[0];
  };
  const getCountOrdersByWaiter = async (id_usu) =>{
    const countOrders= await conn.query("SELECT COUNT(*) AS count_orders_day FROM pedido WHERE id_usu=? AND DATE_FORMAT(fecha_ped,'%Y-%m-%d')=curdate()",[id_usu])
    return countOrders[0];
  };
  /*cocina */
  const getCountOrderWait = async () => {
    const countOrders = await conn.query("SELECT count(*) AS count_orders_wait FROM pedido WHERE id_epedido=1 and date(fecha_ped)=curdate()");
    return countOrders[0];
  };
  const getCountOrderPrepared = async () => {
    const countOrders = await conn.query("SELECT count(*) AS count_orders_prepared FROM pedido WHERE id_epedido=2 and date(fecha_ped)=curdate()");
    return countOrders[0];
  };
  const getPedidoIdAll = async () =>{
    const pedido = await conn.query("SELECT id_ped FROM pedido WHERE id_epedido=2 and date(fecha_ped)=curdate()");
    return pedido;
  }
  const getPedido = async(id_ped) =>{
    const pedido = await conn.query("SELECT pe.id_ped,usu.nom_usu,me.numero_mesa FROM pedido pe, usuario usu,mesa_pedido mp, mesa me WHERE pe.id_usu=usu.id_usu and pe.id_ped=mp.id_ped and mp.id_mesa=me.id_mesa and pe.id_ped=?",[id_ped]);
    return pedido;
  }
  const getPedidoDetalle = async(id_ped) =>{
    const pedido = await conn.query("SELECT p.nom_prod, dp.cantidad_det,dp.descripcion_det FROM detalle_pedido dp, producto p where dp.id_prod = p.id_prod and dp.id_ped = ?",[id_ped]);
    return pedido;
  }
  const UpdateEstadoPedido = async(id_ped) =>{
    const pedido = await conn.query("UPDATE pedido SET id_epedido=2 WHERE id_ped=?",[id_ped]);
    return pedido;
  }
module.exports={
    getCountOrders,
    getCountOrdersByWaiter,
    getCountOrderWait,
    getCountOrderPrepared,
    getPedidoIdAll,
    getPedido,
    getPedidoDetalle,
    UpdateEstadoPedido
}