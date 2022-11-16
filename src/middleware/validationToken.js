const {verifyToken} = require("../utils/handleToken");
const {handleErrorResponse,handleHttpError}=require("../utils/handleError")
const validationToken = async (req, res, next) => {
  try {
    const { payload } = await verifyToken(token);
    req.id = payload.user.id_usu;

    next();
  } catch (err) {
     handleErrorResponse(res,"EXPIRED_CREDENTIALS",401)
  }
};

module.exports = { validationToken };
