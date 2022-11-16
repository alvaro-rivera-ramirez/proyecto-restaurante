const conn = require("../config/bd");
const { encrypt, compare } = require("../utils/handlePass");

  const getUsers = async () => {
    const users = await conn.query("SELECT * FROM usuario");
  
    if (!users) throw new Error();
    return users;
  };

  const getUser = async (id) => {
    
  };
  
  const updateUser = async (user) => {
    const userUpdate = await conn.query("UPDATE usuario SET nom_usu=?,ape1_usu=?,ape2_usu=?,dni_usu=?,dir_usu=? WHERE email_usu=?;",user);
    if (!userUpdate) throw new Error();
    return userUpdate;
  };
  
  const deleteUser = async (id) => {
    const users = await conn.query("DELETE FROM usuario WHERE id_usu=?;",id);
  
    if (!users) throw new Error();
    return users;
  };

  const changePassword = async (id_usu, old_password, new_password) => {
    try {
      const pass = await conn.query("SELECT psw_usu FROM usuario WHERE id_usu = ?", [id_usu]);

      if (await compare(old_password, pass[0].psw_usu)) {
        const new_psdEncrypt = await encrypt(new_password);
        const new_psd = new_psdEncrypt;

        const change = await conn.query("UPDATE usuario SET psw_usu = ? WHERE id_usu = ?", [new_psd, id_usu]);
        return change;
      }
    } catch (error) {
      throw new Error();
    }
  };

module.exports={
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    changePassword
}