const { Router } = require("express");
const { getProfileHeader } = require("../../services/profileServices");
const {
  isLoggedIn,
  verifyLoggedIn,
} = require("../../middleware/authentication");
const {isAdmin}=require("../../middleware/authRole");
const router = Router();

router.get("/categorias", isLoggedIn,isAdmin,(req, res) => {
    const nom_usu=req.name
    const nom_tipousu=req.role
    res.render("admin/categorias",{nom_usu,nom_tipousu});
});

//Interfaz registro usuarios
router.get('/register-user',isLoggedIn,isAdmin,async(req,res)=>{
  const {nom_usu,nom_tipousu}= await getProfileHeader(req.id);
  res.render('admin/registerUser',{nom_usu,nom_tipousu});
})
//Interfaz vista registro usuarios
router.get('/Users',isLoggedIn,isAdmin,async(req,res)=>{
  const {nom_usu,nom_tipousu}= await getProfileHeader(req.id);
  res.render('admin/adminUsers',{nom_usu,nom_tipousu});
})

router.get("/pedidos", isLoggedIn,isAdmin,(req, res) => {
  const nom_usu=req.name
  const nom_tipousu=req.role
  res.render("admin/pedido",{nom_usu,nom_tipousu});
});

router.get("/mesas", isLoggedIn,isAdmin,(req, res) => {
    const nom_usu=req.name
    const nom_tipousu=req.role
    res.render("admin/mesas",{nom_usu,nom_tipousu});
});

router.get("/pisos", isLoggedIn,isAdmin,(req, res) => {
  const nom_usu=req.name
  const nom_tipousu=req.role
  res.render("admin/pisos",{nom_usu,nom_tipousu});
});

router.get("/productos", isLoggedIn,isAdmin,(req, res) => {
  const nom_usu=req.name
  const nom_tipousu=req.role
  res.render("admin/producto",{nom_usu,nom_tipousu});
});

router.get("/NuevoProducto", isLoggedIn,isAdmin,(req, res) => {
  const nom_usu=req.name
  const nom_tipousu=req.role
  res.render("admin/newproducto",{nom_usu,nom_tipousu});
});
router.get("/reporte-mes", isLoggedIn,isAdmin,(req, res) => {
  const nom_usu=req.name
  const nom_tipousu=req.role
  res.render("admin/adminStatsUsu",{nom_usu,nom_tipousu});
});
router.get("/reporte-dia", isLoggedIn,isAdmin,(req, res) => {
  const nom_usu=req.name
  const nom_tipousu=req.role
  res.render("admin/adminStatsUsuDay",{nom_usu,nom_tipousu});
});
router.get("/reporte", isLoggedIn,isAdmin,(req, res) => {
  const nom_usu=req.name
  const nom_tipousu=req.role
  res.render("admin/reportStats",{nom_usu,nom_tipousu});
});


module.exports=router