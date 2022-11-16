const userServices = require("../services/userServices");
const { verifyToken } = require("../utils/handleToken");

const getUsers = async (req, res) => {
  try {
    const users=await userServices.getUsers();
    return res.status(201).send(users);
  } catch (error) {
    console.log(error);
    return res.status(401);
  }
};

const getUser = async (req, res) => {
  
};

const updateUser = async (req, res) => {
 
};

const deleteUser = async (req, res) => {
 
};

const changePassword = async (req, res) => {
  const { old_password, new_password } = req.body;

  if (!old_password || !new_password) {
    handleErrorResponse(res, "EMPTY FIELDS", 401);
    return;
  }

  // Obtener id de usuario
  const { jwt } = req.cookies;
  const { payload } = await verifyToken(jwt);
  id_usu = payload.user.id_usu;

  const change = await userServices.changePassword(id_usu, old_password, new_password);
  return res.status(201).send(change);
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changePassword
};