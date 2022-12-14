const conn = require("../config/bd");

const postPedido = async (pedido) => {
    const postPedido_ = await conn.query("INSERT INTO pedido (id_usu,id_epedido,id_mod) Values(?,?,?);",pedido);
    if (!postPedido_) throw new Error();
    return postPedido_;
  };
const postDetallePedido = async (detalle) => {
    const postDetallePedido_ = await conn.query("INSERT INTO detalle_pedido (id_prod,cantidad_det,id_ped) VALUES(?,?,?);",detalle);
    if (!postDetallePedido_) throw new Error();
    return postDetallePedido_;
  };
const getLastRecord = async () => {
    const getLastRecord_ = await conn.query("SELECT id_ped FROM pedido ORDER by id_ped DESC LIMIT 1;");
    if (!getLastRecord_) throw new Error();
    return getLastRecord_;
  };
  const tableState = async () => {
    const tableState_ = await conn.query("select * from mesa as m inner join estado_mesa as em on em.id_emesa=m.id_emesa;");
    if (!tableState_) throw new Error();
    return tableState_;
  };
  const eMesa = async (emesa) => {
    const eMesa_ = await conn.query("UPDATE mesa SET id_emesa=2 WHERE numero_mesa=?;",emesa);
    if (!eMesa_) throw new Error();
    return eMesa_;
  };
  const getMod = async () => {
    const getMod_ = await conn.query("select * from modalidad;");
    if (!getMod_) throw new Error();
    return getMod_;
  };
  const getEpedido = async () => {
    const getEpedido_ = await conn.query("select * from estado_pedido;");
    if (!getEpedido_) throw new Error();
    return getEpedido_;
  };
  const orderTable = async (values) => {
      const id_mesa_= await conn.query("select id_mesa from mesa where numero_mesa=?;",values[1]);
      values.pop();
      values.push(id_mesa_[0].id_mesa);
      const orderTable_ = await conn.query("insert into mesa_pedido(id_ped,id_mesa) values(?,?);",values);
      if (!orderTable_) throw new Error();
      return orderTable_;
    };
    const getDetPed = async (emesa) => {
      const eMesa_ = await conn.query("select * from pedido inner join detalle_pedido on pedido.id_ped=detalle_pedido.id_ped inner join producto on detalle_pedido.id_prod=producto.id_prod where pedido.id_ped=?;",emesa);
      if (!eMesa_) throw new Error();
      return eMesa_;
    };
    const pedidoOcupado = async (mesa) => {
      console.log("nro ped services: ",mesa)
      const eMesa_ = await conn.query("select * from mesa inner join mesa_pedido on mesa.id_mesa=mesa_pedido.id_mesa inner join pedido on pedido.id_ped=mesa_pedido.id_ped where mesa.numero_mesa=?;",mesa);
      console.log("eMesa_ services: ",eMesa_)
      if (!eMesa_) throw new Error();
      return eMesa_;
    };

module.exports={
    postPedido,
    postDetallePedido,
    getLastRecord,
    tableState,
    eMesa,
    getMod,
    getEpedido,
    orderTable,
    getDetPed,
    pedidoOcupado,
}