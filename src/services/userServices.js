const conn=require("../config/bd");

const getUsers = async () => {
    const users = await conn.query("SELECT * FROM usuario");
  
    if (!users) throw new Error();
    return users;
  };
  const getUser = async (id) => {
    
  };
  
  const updateUser = async (user) => {
   
  };
  
  const deleteUser = async (id) => {
    console.log("entre en deleteuser: ",id);
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