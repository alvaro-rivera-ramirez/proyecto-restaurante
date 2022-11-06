const conn=require("../config/bd");
const getProfileHeader = async (id) => {
  const result = await conn.query("SELECT * FROM usuario,tipo_usuario WHERE id_usu=? AND tipo_usu=id_tipousu", [
    id,
  ]);

  return result[0];
};

module.exports = {
  getProfileHeader,
};
