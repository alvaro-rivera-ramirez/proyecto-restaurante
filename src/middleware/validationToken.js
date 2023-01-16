const {verifyToken} = require("../utils/handleToken");
const {handleErrorResponse,handleHttpError}=require("../utils/handleError")
const validationToken = async (req, res, next) => {
  try {

    const { jwt } = req.cookies;
    
    if (!jwt){
      handleErrorResponse(res,"NO_CREDENTIALS",401)
      return;
    }
    
    const { payload } = await verifyToken(jwt);
    req.id = payload.user.id_usu;
    req.usu=payload.user.nom_usu;
    req.role=payload.user.nom_tipousu;
    next();
  } catch (err) {
     handleErrorResponse(res,"EXPIRED_CREDENTIALS",401)
  }
};

module.exports = { validationToken };
