const conn=require("../config/bd");
const getProfileHeader = async (id) => {
  console.log(id);
  const result = await conn.query("SELECT * FROM usuario,tipo_usuario WHERE ID_USU=1 AND TIPO_USU=ID_TIPOUSU", [
    id,
  ]);

  return result[0];
};

module.exports = {
  getProfileHeader,
};
