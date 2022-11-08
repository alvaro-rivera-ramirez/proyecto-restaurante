const conn = require("../config/bd");
const {encrypt,compare}=require("../utils/handlePass");
const authByEmail = async (email, pass) => {
  const result = await conn.query("SELECT * FROM usuario WHERE email_usu=?", [
    email
  ]);
  //No haya usuario o que la contraseña esta incorrecta
  if (!result  || !(await compare(pass, result[0]['psw_usu']))) 
    throw new Error();
  //Retorna el usuario
  return result[0];
};

const authTokenById = async (id) => {
  const result = await conn.query("SELECT * FROM usuario as u WHERE id_usu=?", [id]);
  return result[0];
};


module.exports={authByEmail,authTokenById};
