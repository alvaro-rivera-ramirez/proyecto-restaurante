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
   
  };

module.exports={
    getUsers,
    getUser,
    updateUser,
    deleteUser
}