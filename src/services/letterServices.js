const conn = require("../config/bd");

const postPedido = async (pedido) => {
    //const postPedido_ = await conn.query("UPDATE usuario SET nom_usu=?,ape1_usu=?,ape2_usu=?,dni_usu=?,dir_usu=? WHERE email_usu=?;",pedido);
    const postPedido_ = await conn.query("INSERT INTO pedido (id_usu,id_epedido,id_mod) Values(?,?,?);",pedido);
    if (!postPedido_) throw new Error();
    return postPedido_;
  };
  const postDetallePedido = async (detalle) => {
    //const postPedido_ = await conn.query("UPDATE usuario SET nom_usu=?,ape1_usu=?,ape2_usu=?,dni_usu=?,dir_usu=? WHERE email_usu=?;",pedido);
    //const postPedido_ = await conn.query("INSERT INTO pedido (id_usu,id_epedido,id_mod) Values(?,?,?);",detalle);
    const postDetallePedido_ = await conn.query("INSERT INTO pedido (id_ped,id_prod,cantidad_det,descripcion_det) Values(?,?,?,');",detalle);
    if (!postDetallePedido_) throw new Error();
    return postDetallePedido_;
  };

module.exports={
    postPedido,
    postDetallePedido,
}