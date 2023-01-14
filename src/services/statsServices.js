const conn = require("../config/bd");

  const pedMes = async (arrayfecha) => {
    const users = await conn.query(`select count(distinct ped.id_ped) as countPed,sum(det.cantidad_det) as sumDet, sum(det.cantidad_det) as  cantidad
    ,sum(det.cantidad_det*prod.precio_u_prod) as sumPres,ped.id_usu,u.nom_usu from usuario as u inner join pedido as ped on u.id_usu=ped.id_usu inner join detalle_pedido as det on ped.id_ped=det.id_ped 
    inner join producto as prod on prod.id_prod=det.id_prod inner join categoria as 
    cat on cat.id_categoria=prod.id_categoria where month(ped.fecha_ped)=? and year(ped.fecha_ped)=? group by ped.id_usu;`,arrayfecha);
    if (!users) throw new Error();
    return users;
  };
  const pedBimes = async (arrayfecha) => {
    const users = await conn.query(`select count(id_ped) as cantPed
    from pedido where fecha_ped>=? and fecha_ped<=? ;`,arrayfecha);
    if (!users) throw new Error();
    return users;
  };
  const catMes = async (arrayfecha) => {
    const users = await conn.query(`select cat.nom_categoria,sum(prod.precio_u_prod*det.cantidad_det) as sumDet, count(det.cantidad_det) as cantidad from categoria as cat inner join producto as prod on cat.id_categoria=prod.id_categoria 
    inner join detalle_pedido as det on det.id_prod=prod.id_prod inner join pedido as ped on ped.id_ped=det.id_ped where month(ped.fecha_ped)=? and year(ped.fecha_ped)=? group by cat.nom_categoria limit 5;`,arrayfecha);
    if (!users) throw new Error();
    return users;
  };
  const pedDia = async (arrayfecha) => {
    const users = await conn.query(`select count(distinct ped.id_ped) as countPed,sum(det.cantidad_det) as sumDet, sum(det.cantidad_det) as  cantidad
    ,sum(det.cantidad_det*prod.precio_u_prod) as sumPres,ped.id_usu,u.nom_usu from usuario as u inner join pedido as ped on u.id_usu=ped.id_usu inner join detalle_pedido as det on ped.id_ped=det.id_ped 
    inner join producto as prod on prod.id_prod=det.id_prod inner join categoria as 
    cat on cat.id_categoria=prod.id_categoria where TIMESTAMP(ped.fecha_ped,hour(ped.fecha_ped)) 
    between TIMESTAMP(?,'00:00:00') and TIMESTAMP(?,'23:59:59') group by ped.id_usu;`,[arrayfecha,arrayfecha]);
    if (!users) throw new Error();
    return users;
  };
  const catDia = async (arrayfecha) => {
    const users = await conn.query(`select cat.nom_categoria,sum(prod.precio_u_prod*det.cantidad_det) as sumPres from categoria as cat inner join producto as prod on cat.id_categoria=prod.id_categoria 
    inner join detalle_pedido as det on det.id_prod=prod.id_prod inner join pedido as ped on ped.id_ped=det.id_ped where TIMESTAMP(ped.fecha_ped,hour(ped.fecha_ped)) 
    between TIMESTAMP(?,'00:00:00') and TIMESTAMP(?,'23:59:59') group by cat.nom_categoria;`,[arrayfecha,arrayfecha]);
    if (!users) throw new Error();
    return users;
  };
  const pedBiDia = async (arrayfecha) => {
    const users = await conn.query(`select count(id_ped) as cantPed, day(fecha_ped) as dia,month(fecha_ped) as mes,year(fecha_ped) as anio
    from pedido where TIMESTAMP(fecha_ped,hour(fecha_ped)) 
    between TIMESTAMP(?,'00:00:00') and TIMESTAMP(?,'23:59:59') group by day(fecha_ped),month(fecha_ped),year(fecha_ped);`,[arrayfecha,arrayfecha]);
    if (!users) throw new Error();
    return users;
  };
module.exports={
    pedMes,
    pedDia,
    catMes,
    catDia,
    pedBimes,
    pedBiDia
}