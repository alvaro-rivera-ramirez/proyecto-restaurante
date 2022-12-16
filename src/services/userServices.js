const conn = require("../config/bd");
const { encrypt, compare } = require("../utils/handlePass");

  const getUsers = async () => {
    const users = await conn.query("SELECT u.id_usu,t.nom_tipousu,u.tipo_usu,u.dni_usu,u.nom_usu,u.ape1_usu,u.ape2_usu,email_usu,u.dir_usu FROM usuario as u inner join tipo_usuario as t on u.tipo_usu=t.id_tipousu");
  
    if (!users) throw new Error();
    return users;
  };

  const getUser = async (nomUsu) => {
    const users = await conn.query("SELECT * FROM usuario WHERE nom_usu=?",nomUsu);
    if (!users) throw new Error();
    return users;
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

  const getCountUsers = async () => {
    const countUsers = await conn.query("SELECT COUNT(*) AS count_users FROM usuario");
  
    return countUsers[0];
  };

  const getCliente = async () => {
    const users = await conn.query("SELECT * FROM cliente;");
  
    if (!users) throw new Error();
    return users;
  };

module.exports={
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    changePassword,
    getCountUsers,
    getCliente,
}