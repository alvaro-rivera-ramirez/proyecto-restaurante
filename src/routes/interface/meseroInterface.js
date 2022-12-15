const { Router } = require("express");
const { getProfileHeader } = require("../../services/profileServices");
const {
  isLoggedIn,
  verifyLoggedIn,
} = require("../../middleware/authentication");
const router = Router();

router.get('/realizar-pedido',isLoggedIn,(req,res)=>{
    const nom_usu=req.name
    const nom_tipousu=req.role
    res.render('mesero/realizar-pedido',{nom_usu,nom_tipousu});
})
router.get('/cliente',isLoggedIn,(req,res)=>{
  const nom_usu=req.name
  const nom_tipousu=req.role
  res.render('mesero/cliente',{nom_usu,nom_tipousu});
})
module.exports=router
