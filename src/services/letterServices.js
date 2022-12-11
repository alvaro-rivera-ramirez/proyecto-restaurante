const conn = require("../config/bd");

const postPedido = async (pedido) => {
  console.log("en registro pedido: ",pedido);
    const postPedido_ = await conn.query("INSERT INTO pedido (id_usu,id_epedido,id_mod) Values(?,?,?);",pedido);
    if (!postPedido_) throw new Error();
    return postPedido_;
  };
const postDetallePedido = async (detalle) => {
    console.log("dentro de servicio: ",detalle)
    const postDetallePedido_ = await conn.query("INSERT INTO detalle_pedido (id_prod,cantidad_det,id_ped) VALUES(?,?,?);",detalle);
    if (!postDetallePedido_) throw new Error();
    return postDetallePedido_;
  };
const getLastRecord = async () => {
    const getLastRecord_ = await conn.query("SELECT id_ped FROM pedido ORDER by id_ped DESC LIMIT 1;");
    if (!getLastRecord_) throw new Error();
    return getLastRecord_;
  };
  const tableState = async (id) => {
    const tableState_ = await conn.query("select * from mesa as m inner join estado_mesa as em on em.id_emesa=m.id_emesa where numero_mesa=?;",id);
    if (!tableState_) throw new Error();
    return tableState_;
  };
  const eMesa = async (emesa) => {
    console.log("dentro de servicio-emesa: ",emesa)
    const eMesa_ = await conn.query("UPDATE mesa SET id_emesa=2 WHERE id_mesa=?;",emesa);
    if (!eMesa_) throw new Error();
    return eMesa_;
  };
module.exports={
    postPedido,
    postDetallePedido,
    getLastRecord,
    tableState,
    eMesa,
}