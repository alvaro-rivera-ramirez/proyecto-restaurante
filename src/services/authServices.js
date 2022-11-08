const conn = require("../config/bd");
const {encrypt,compare}=require("../utils/handlePass");
const authByEmail = async (email, pass) => {
  const result = await conn.query("SELECT * FROM usuario WHERE EMAIL_USU=?", [
    email
  ]);
  //No haya usuario o que la contraseña esta incorrecta
  if (!result  || !(await compare(pass, result[0]['PSW_USU']))) 
    throw new Error();
  //Retorna el usuario
  return result[0];
};

const authTokenById = async (id) => {
  const result = await conn.query("SELECT * FROM usuario as u WHERE ID_USU=?", [id]);
  return result[0];
};


module.exports={authByEmail,authTokenById};
