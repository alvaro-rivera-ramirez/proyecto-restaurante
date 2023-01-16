const con = require("../config/bd");

const getTables = async () => {
  const mesas = await con.query("SELECT m.*,p.nom_piso FROM mesa m INNER JOIN piso p ON m.id_piso=p.id_piso");
  if (!mesas) throw new Error();

  return mesas;
};
const getOneTable = async (id) => {
  const mesas = await con.query("SELECT * FROM mesa WHERE id_mesa=?", [id]);

  if (!mesas || !mesas.length) throw new Error("MESA_VACIA");

  return mesas[0];
};
const createTable = async (table) => {
  try {
    console.log(table);
    const newTable = await con.query("INSERT INTO mesa SET ?", [table]);
    console.log(newTable);
  } catch (error) {
    console.log(error);
    throw new Error("TABLE_INVALID");
  }
};
const updateTable = async (id, table) => {
  try {
    const upTable = await con.query("UPDATE mesa SET ? WHERE id_mesa=? ", [
      table,
      id,
    ]);
    console.log(upTable);
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
const deleteTable = async (id) => {
  try {
    const table = await con.query("DELETE FROM mesa WHERE id_mesa=?", [id]);
    console.log(table);
    return table;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const getTablesByFloor=async (id_piso)=>{
  try {
    const mesas = await con.query("(select m.*, (null) as cod_ped, case m.id_emesa when 1 then 1 else 5 end as epanel from mesa m where m.id_piso=? and m.id_emesa!=2) union (select m.*, p.cod_ped, (p.id_epedido + 1) as epanel from mesa m cross join (select ped.cod_ped, ped.id_epedido, dt.id_mesa from pedido ped, mesa_pedido dt where ped.id_ped=dt.id_ped and ped.id_epedido not in (4,5) and ped.id_mod=2) as p where p.id_mesa=m.id_mesa and m.id_piso=?) order by id_mesa;",[id_piso,id_piso]);
    return mesas;
  } catch (error) {
    throw new Error();
  }
}


const getTablesByState = async(piso,estado)=>{
  try {
    const mesas = await con.query("SELECT m.* FROM mesa m INNER JOIN piso p ON m.id_piso=p.id_piso WHERE m.id_piso=? AND m.id_emesa=?",[piso,estado]);
    return mesas;
  } catch (error) {
    throw new Error();
  }
}
module.exports = {
  getTables,
  getOneTable,
  getTablesByFloor,
  getTablesByState,
  createTable,
  updateTable,
  deleteTable,
};
