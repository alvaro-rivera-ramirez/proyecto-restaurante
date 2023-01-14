const conn = require("../config/bd");

  const getAll =async()=>{
    const order=await conn.query("SELECT pe.id_ped, u.nom_usu, ep.id_epedido, mo.nom_mod,DATE_FORMAT(pe.fecha_ped, '%d-%m-%Y') as fecha,time(pe.fecha_ped) as hora, SUM(dt.cantidad_det*pro.precio_u_prod) as precioT  FROM pedido pe, usuario u, estado_pedido ep, modalidad mo, detalle_pedido dt, producto pro WHERE pe.id_usu=u.id_usu and pe.id_epedido=ep.id_epedido and pe.id_mod=mo.id_mod and pe.id_ped=dt.id_ped and dt.id_prod=pro.id_prod GROUP BY pe.id_ped;");
    return order;
  }

  const getfechaAll =async(date_start,date_end)=>{
    const order=await conn.query("SELECT pe.id_ped, u.nom_usu, ep.id_epedido, mo.nom_mod,DATE_FORMAT(pe.fecha_ped, '%d-%m-%Y') as fecha,time(pe.fecha_ped) as hora, SUM(dt.cantidad_det*pro.precio_u_prod) as precioT  FROM pedido pe, usuario u, estado_pedido ep, modalidad mo, detalle_pedido dt, producto pro WHERE pe.id_usu=u.id_usu and pe.id_epedido=ep.id_epedido and pe.id_mod=mo.id_mod and pe.id_ped=dt.id_ped and dt.id_prod=pro.id_prod and pe.fecha_ped  BETWEEN ? and ? GROUP BY pe.id_ped;",[date_start,date_end]);
    return order;
  }

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


  const getOrderByTable = async (numero_mesa) =>{
    const orders= await conn.query("SELECT p.id_ped, p.id_usu, CONCAT(u.nom_usu, ' ', u.ape1_usu, ' ', u.ape2_usu) AS nom_usu, p.id_cli, c.nom_cli FROM pedido p JOIN mesa_pedido mp ON mp.id_ped = p.id_ped JOIN mesa m ON m.id_mesa = mp.id_mesa JOIN usuario u ON u.id_usu = p.id_usu JOIN cliente c ON c.id_cli = p.id_cli WHERE numero_mesa = ?",[numero_mesa])

    return orders;
  };

  const getOrderDetailsByOrder = async (id_ped) =>{
    const orders= await conn.query("SELECT dp.id_prod, dp.cantidad_det, dp.descripcion_det, pr.nom_prod, pr.precio_u_prod, (cantidad_det * precio_u_prod) AS subtotal FROM detalle_pedido dp JOIN pedido p ON dp.id_ped = p.id_ped JOIN producto pr ON dp.id_prod = pr.id_prod WHERE p.id_ped = ?",[id_ped])
    return orders;
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

// Nuevo codigo
const updateStateTableByNumber = async(idstate,nummesa)=>{
  try {
    await conn.query("UPDATE mesa SET id_emesa=? WHERE numero_mesa=?",[idstate,nummesa]);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

const getOneOrder = async(nanoid)=>{
  // const order=await conn.query("SELECT p.*,u.nom_usu,(SELECT group_concat(numero_mesa separator ', ') from mesa_pedido mp JOIN mesa m ON mp.id_mesa=m.id_mesa WHERE mp.id_ped=p.id_ped) as mesas FROM pedido p INNER JOIN usuario u ON p.id_usu=u.id_usu WHERE p.cod_ped=?",[nanoid])
  const order=await conn.query("SELECT p.*,u.nom_usu,(SELECT group_concat(numero_mesa separator ', ') from mesa_pedido mp JOIN mesa m ON mp.id_mesa=m.id_mesa WHERE mp.id_ped=p.id_ped) as mesas, c.nom_cli FROM pedido p INNER JOIN usuario u ON p.id_usu=u.id_usu LEFT JOIN cliente c ON p.id_cli=c.id_cli WHERE p.cod_ped=?",[nanoid])
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
const updateStateOrder=async(codeOrder,infoOrder)=>{
  const upOrder=await conn.query("UPDATE pedido SET ? WHERE cod_ped=?",[infoOrder,codeOrder])

}

//obtienes las ordenes pedidas por un usuario y que estan preparadas 
const getPreparedOrdersByMode=async(idusu,idmod)=>{
  try {
    const orders=await conn.query("SELECT p.* FROM pedido p WHERE p.id_epedido=2 AND date(p.fecha_ped)= curdate() AND p.id_usu=? AND p.id_mod=?",[idusu,idmod]);
    return orders;
  } catch (error) {
    console.log(error)
    throw Error;
  }
}

// const getPreparedOrdersTodayToCarryOut=async()=>{
//   try {
//     const orders=await conn.query("SELECT p.id_ped,p.cod_ped FROM pedido p WHERE p.id_epedido=2 AND date(p.fecha_ped)= curdate() AND p.id_mod=1");
//     return orders;
//   } catch (error) {
//     console.log(error)
//     throw Error;
//   }
// }

const getPreAccountOrdersToday=async()=>{
  try {
    const orders=await conn.query("SELECT p.id_ped,p.cod_ped,(SELECT group_concat(numero_mesa separator ', ') from mesa_pedido mp JOIN mesa m ON mp.id_mesa=m.id_mesa WHERE mp.id_ped=p.id_ped) as mesas FROM pedido p WHERE p.id_epedido=3 AND date(p.fecha_ped)= curdate()");
    return orders;
  } catch (error) {
    console.log(error)
    throw Error;
  }
}
//Obtiene las consultas de la fecha actual, info del usuario y mesas
const getInfoOrdersTodayByState=async(idestado)=>{
  try {
    const orders=await conn.query("SELECT p.*,u.nom_usu,(SELECT group_concat(numero_mesa separator ', ') from mesa_pedido mp JOIN mesa m ON mp.id_mesa=m.id_mesa WHERE mp.id_ped=p.id_ped) as mesas FROM pedido p INNER JOIN usuario u ON p.id_usu=u.id_usu WHERE p.id_epedido=? AND date_format(p.fecha_ped,'%Y-%m-%d')= DATE(NOW())",[idestado]);
    return orders;
  } catch (error) {
    console.log(error)
    throw Error;
  }
}

/* Obtiene los detalles de pedido del dia actual y el nombre de producto */
const getDetailsOrdersTodayByState=async(idestado)=>{
  try {
    const detailOrders=await conn.query("SELECT dp.*,prod.nom_prod FROM (SELECT * FROM pedido WHERE pedido.id_epedido=? AND date_format(pedido.fecha_ped,'%Y-%m-%d')= DATE(NOW())) AS p INNER JOIN detalle_pedido dp ON p.id_ped=dp.id_ped INNER JOIN producto prod ON dp.id_prod=prod.id_prod GROUP BY p.id_ped,dp.id_prod",[idestado]);
    return detailOrders;
  } catch (error) {
    console.log(error);der
    throw Error;
  }
}
const getOrderReport=async(idPago)=>{
  try {
    const platos=await conn.query(`select pag.id_pago,cli.nom_cli,prod.nom_prod,det.cantidad_det,prod.precio_u_prod,cat.nom_categoria, pag.total_pago, (prod.precio_u_prod*det.cantidad_det) as subTotal
    from pago as pag inner join pedido as ped on ped.id_ped=pag.id_ped inner join cliente as cli on cli.id_cli=ped.id_cli 
    inner join detalle_pedido as det on det.id_ped=ped.id_ped inner join producto as prod on prod.id_prod=det.id_prod inner join categoria as cat
     on cat.id_categoria=prod.id_categoria where pag.id_pago=?;`,[idPago]);
    return platos;
  } catch (error) {
    console.log(error);der
    throw Error;
  }
}
const getOrderPago=async(idPago)=>{
  try {
    const pago=await conn.query(`select * from pago as pag inner join pedido as ped on pag.id_ped=ped.id_ped inner join cliente as cli on cli.id_cli=ped.id_cli where pag.id_pago=?;`,[idPago]);
    return pago;
  } catch (error) {
    console.log(error);der
    throw Error;
  }
}
const getReportAll=async(idPago)=>{
  try {
    const pago=await conn.query(`select pag.id_pago,cli.nom_cli,prod.nom_prod,det.cantidad_det,prod.precio_u_prod,cat.nom_categoria, pag.total_pago, (prod.precio_u_prod*det.cantidad_det) as subTotal
    from pago as pag inner join pedido as ped on ped.id_ped=pag.id_ped inner join cliente as cli on cli.id_cli=ped.id_cli 
    inner join detalle_pedido as det on det.id_ped=ped.id_ped inner join producto as prod on prod.id_prod=det.id_prod inner join categoria as cat
     on cat.id_categoria=prod.id_categoria;`,[idPago]);
    return pago;
  } catch (error) {
    console.log(error);der
    throw Error;
  }
}

const deleteTableOrderByOrder = async (id) => {
  try {
    const orderTable = await conn.query("DELETE FROM mesa_pedido WHERE id_ped=?", [id]);
    return orderTable;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

module.exports = {
  getAll,
  getCountOrders,
  getCountOrdersByWaiter,
  getCountOrderWait,
  getCountOrderPrepared,
  getPedidoIdAll,
  getPedido,
  getPedidoDetalle,
  UpdateEstadoPedido,
  getOrderByTable,
  getOrderDetailsByOrder,
  createOrder,
  createDetailOrder,
  createTableByOrder,
  getIdTable,
  getOneOrder,
  getDetailsByOrder,
  getTableOrder,
  updateStateTable,
  updateStateTableByNumber,
  updateStateOrder,
  getfechaAll,
  getPreparedOrdersByMode,
  getInfoOrdersTodayByState,
  getDetailsOrdersTodayByState,
  getOrderReport,
  getOrderPago,
  getReportAll,
  deleteTableOrderByOrder
};
