const {verifyToken} = require("../utils/handleToken");
const {handleErrorResponse,handleHttpError}=require("../utils/handleError")
const validationToken = async (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt){
    handleErrorResponse(res,"NO_CREDENTIALS",401)
    return;
  }
  try {

    const token = jwt.split(" ")[1];
    console.log(jwt);
    if (!token){
      console.log("no tengo credencial2");
      handleErrorResponse(res,"NO_CREDENTIALS",401)
      return;
    }
    
    const { payload } = await verifyToken(token);
    req.id = payload.user.id_usu;

    next();
  } catch (err) {
     handleErrorResponse(res,"EXPIRED_CREDENTIALS",401)
  }
};

module.exports = { validationToken };
