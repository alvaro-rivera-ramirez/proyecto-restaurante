const userServices = require("../services/userServices");
const { verifyToken } = require("../utils/handleToken");
// const jwt=require('jsonwebtoken');
const { compare, encrypt } = require("../utils/handlePass");
const transporter = require ('../config/nodemailer');
const {tokenSignResetPass}=require("../utils/handleToken")
const getUsers = async (req, res) => {
  try {
    const users=await userServices.getUsers();
    return res.status(201).send(users);
  } catch (error) {
    return res.status(401);
  }
};

const getUser = async (req, res) => {
  const { params: {id},}=req;
  try {
    const users=await userServices.getUser(id);
    return res.status(201).send(users);
  } catch (error) {
    return res.status(401);
  }
};

const updateUser = async (req, res) => {
  const values=Object.values(req.body);
  try {
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

const changePassword = async (req, res) => {
  const { old_password, new_password } = req.body;

  if (!old_password || !new_password) {
    msg="Campos Vacíos";
    return res.status(400).send({ok:false, msg});
  }

  // Obtener id de usuario
  const { jwt } = req.cookies;
  const { payload } = await verifyToken(jwt);
  id_usu = payload.user.id_usu;

  const change = await userServices.changePassword(id_usu, old_password, new_password);

  if (change == undefined) {
    msg="Contraseña Anterior Incorrecta";
    return res.status(401).send({ok:false, msg});
  }
  else {
    msg="Cambio Exitoso";
    return res.status(200).send({ok:true, msg});
  }
}

const forgotPswPost = async (req, res) => {
    const{email}=req.body;
    try{

    
    const getEmail=await userServices.getEmail(req.body.email);
    if(!getEmail){
      res.send("usuario no existe");
      return;
    }
    const secret =process.env.JWT_SECRET;
    const payload ={
      email: getEmail.email_usu
    }
    // const token=jwt.sign(payload,secret,{expiresIn:'5m'});
    const token=await tokenSignResetPass(payload);
    const link=`http://localhost:3000/reset-psw/${getEmail.email_usu}/${token}`;
    let contentHTML;
    contentHTML = `<div style="padding: 7px 0 2px 0;"><b>Reestablecer contraseña:</b>`+link+`</div>
`;
transporter.sendMail({
  from: "elricondetacnar@gmail.com",
  to: getEmail.email_usu,
  subject: 'Reestablecer contraseña',
  html: contentHTML
});
    res.sendStatus(200);
  }
    catch (error) {
    
      return res.status(401);
    }
};


const resetPwsPut = async (req, res) => {
  const { psw1, confirmpsw,email} = req.body;
  console.log(psw1,confirmpsw)
  try{
  
  if (psw1!==confirmpsw || !email) {
    handleErrorResponse(res, "error datos corruptos", 401);
    return;
  }
  else{
    const editusu={
      psw: psw1,
      email: email,
      
  }
  const passEncrypt = await encrypt(psw1);
  editusu.psw= passEncrypt;
  let status=await userServices.resetPwsPut(editusu);
  console.log(status)
  res.status(201).send({ ruta: "/registroUsuarios"});
  }
  
}
  catch (error) {
    
    return res.status(401);
  }
}
module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changePassword,
  forgotPswPost,
  resetPwsPut
};