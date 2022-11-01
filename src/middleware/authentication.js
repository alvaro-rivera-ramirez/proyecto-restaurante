const { verifyToken } = require("../utils/handleToken");
const isLoggedIn = async (req, res, next) => {

  const { jwt } = req.cookies;
  if (!jwt) {
    return res.redirect("/");
  }

  try {
    const { payload } = await verifyToken(jwt);
    req.id = payload.user.id_usu;
    
    next();
  } catch (err) {
    console.log(err);
    res.clearCookie('jwt');
    res.redirect("/");
  }
};

const verifyLoggedIn=(req,res,next)=>{
  const { jwt } = req.cookies;
  if (jwt) {
    return res.redirect("/home");
  }
  
  next();
}
module.exports = {
  isLoggedIn,
  verifyLoggedIn
};
