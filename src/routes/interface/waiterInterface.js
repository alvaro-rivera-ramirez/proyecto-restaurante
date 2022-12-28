const { Router } = require("express");
const { getProfileHeader } = require("../../services/profileServices");
const {
  isLoggedIn,
  verifyLoggedIn,
} = require("../../middleware/authentication");
const router = Router();


router.get("/comanda", isLoggedIn,(req, res) => {
    const nom_usu=req.name
    const nom_tipousu=req.role
    if(!req.query.cod){
      res.render("mesero/comanda",{nom_usu,nom_tipousu});
      return;
    }
    res.render("mesero/comanda-pedido",{nom_usu,nom_tipousu});
});



module.exports=router;

