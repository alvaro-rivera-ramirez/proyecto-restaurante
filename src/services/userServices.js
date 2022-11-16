const conn=require("../config/bd");

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

module.exports={
    getUsers,
    getUser,
    updateUser,
    deleteUser
}