const bcrypt = require("bcrypt");
const { body } = require("express-validator");
const conn = require("../config/bd.js");
const { authTokenById, authByEmail } = require("../services/authServices");
const {
  handleErrorResponse,
  handleHttpError,
} = require("../utils/handleError");
const { compare, encrypt } = require("../utils/handlePass");
const { tokenSign, verifyToken } = require("../utils/handleToken");

const signIn = async (req, res) => {
  const { email, pass } = req.body;
  
  //Si no existes estos campos
  if (!email || !pass) {
    //console.log(req.body);
    handleErrorResponse(res, "USER_INVALID", 401);
    return;
  }
  try {
    //Buscar al usuario por su correo y obtenemos el id de usuario o un error
    //console.log(req.body);
    const { id_usu} = await authByEmail(email, pass);
   
    //Creamos el objeto usuario
    const User = {
      id_usu
    };

    //Creamos el token
    const jwt = await tokenSign(User);

    //Configuramos las opciones de la cookie
    const cookiesOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000  //Fecha de expiracion
      ),
      httpOnly: true // acepta http y https
    };

    //Guardamos la cookie en el navegador
    res.cookie("jwt", jwt, cookiesOptions);
    return res.status(201).send({ ruta: "/registroUsuarios"});
  } catch (err) {
    handleErrorResponse(res, "USER_INVALID", 401);
    console.log(err)
  }
};

const register = async (req, res) => {
  const { name, email, pass, idRol } = req.body;
  console.log(req.body);
  if (!name || !email || !pass) {
    
    handleErrorResponse(res, "USER_INVALID", 401);
    return;
  }

  const newUser = {
    nom_usu: name,
    email_usu: email,
    psw_usu: pass,
    tipo_usu: idRol,
  };
  const passEncrypt = await encrypt(pass);
  newUser.psw_usu = passEncrypt;
  conn.query("INSERT INTO usuario SET ?", [newUser], (err, res) => {
    if (err) {
      handleErrorResponse(res, "Ocurrio un error", 401);
      
    } else {
      res.status(201).send("Usuario registrado");
    }
  });
};

const home = async (req, res) => {
  const { id } = req;

  const existingUserById = await authTokenById(id);
  console.log(id);
  if (!existingUserById) handleErrorResponse(res, "USUARIO NO AUTORIZADO", 401);

  const { id_usu, nom_usu, email_usu, tipo_usu } = existingUserById;

  return res.send({ id_usu, nom_usu, email_usu, tipo_usu });
};

const signOut = (req, res) => {
  res.send("Cerrar Sesion");
};
module.exports = {
  signIn,
  signOut,
  register,
  home,
};
