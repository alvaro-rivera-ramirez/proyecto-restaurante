const { Router } = require("express");
const { getProfileHeader } = require("../../services/profileServices");
const {
  isLoggedIn,
  verifyLoggedIn,
} = require("../../middleware/authentication");
const router = Router();

router.get("/categorias", isLoggedIn,(req, res) => {
    const nom_usu=req.name
    const nom_tipousu=req.role
    res.render("admin/categorias",{nom_usu,nom_tipousu});
});


module.exports=router