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
  console.log(Object.values(req.body))
  const values=Object.values(req.body);
  try {
    console.log("oe que")
    const users=await userServices.updateUser(values);
    return res.status(201).send(users);
  } catch (error) {
    return res.status(401);
  }
      
};

const deleteUser = async (req, res) => {
  
  try {
  const { params: {id},}=req;
    const users=await userServices.deleteUser(id);

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
