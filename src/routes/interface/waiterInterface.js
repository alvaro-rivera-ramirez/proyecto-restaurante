const { Router } = require("express");
const { getProfileHeader } = require("../../services/profileServices");
const {
  isLoggedIn,
  verifyLoggedIn,
} = require("../../middleware/authentication");
const router = Router();
//mesero carta
router.get("/carta", isLoggedIn,(req, res) => {
    const nom_usu=req.name
    const nom_tipousu=req.role
    res.render("mesero/letter",{nom_usu,nom_tipousu});
  });
  module.exports=router