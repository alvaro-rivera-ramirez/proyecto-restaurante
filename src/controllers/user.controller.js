const userServices=require("../services/userServices");

const getUsers = async (req, res) => {
  try {
    const users=await userServices.getUsers();
    return res.status(201).send(users);
  } catch (error) {
    return res.status(401);
  }
};
const getUser = async (req, res) => {
  
};

const updateUser = async (req, res) => {
 
};

const deleteUser = async (req, res) => {
  
  try {
    console.log("en el controlador:",id);
    const users=await userServices.deleteUser();

    return res.status(201).send(users);
  } catch (error) {
    
    return res.status(401);
  }
};


module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
