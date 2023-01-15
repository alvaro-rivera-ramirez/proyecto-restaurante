const { Router } = require("express");
const jwt=require('jsonwebtoken');
const { getProfileHeader } = require("../../services/profileServices");
const { getCountUsers } = require("../../services/userServices");
const {
  getCountOrders,
  getCountOrdersByWaiter,
  getCountOrderWait,
  getCountOrderPrepared,
} = require("../../services/orderServices");
const { getTotalPay, getTotalPayToday } = require("../../services/payServices");
const { getPisos } = require("../../services/pisosServices");
const {
  isLoggedIn,
  verifyLoggedIn,
} = require("../../middleware/authentication");
const router = Router();

// Login
router.get("/", verifyLoggedIn, (req, res) => {
  res.render("login", { layout: false });
});

// Inicio
router.get("/home", isLoggedIn, async (req, res) => {
  const { nom_usu, nom_tipousu } = await getProfileHeader(req.id);

  switch (nom_tipousu) {
    case "Administrador":
      const { count_users } = await getCountUsers();
      const { count_orders} = await getCountOrders();
      const { count_pays }=await getTotalPay();
      let countPays=(parseFloat(count_pays)).toFixed(2);

      res.render("admin/home", {
        nom_usu,
        nom_tipousu,
        count_users,
        count_orders,
        countPays
      });

      break;
    case "Mesero":
      const {count_orders_day} = await getCountOrdersByWaiter(req.id);
      res.render("mesero/home", { nom_usu, nom_tipousu, count_orders_day });
      break;
    case "Cajero":
      const {total_pay}=await getTotalPayToday();
      let totalPay=(parseFloat(total_pay)).toFixed(2);
      res.render("cajero/home", { nom_usu, nom_tipousu, totalPay });
      break;
    case "Cocinero":
      const {count_orders_wait} = await getCountOrderWait();
      const {count_orders_prepared} = await getCountOrderPrepared();
      res.render("cocinero/home", { nom_usu, nom_tipousu,count_orders_wait,count_orders_prepared });
      
      break;
  }
  // res.render('home',{nom_usu,nom_tipousu});
});

// Logout
router.get("/logOut", (req, res) => {
  // Limpia la cookie del navegador
  res.clearCookie("jwt");
  return res.redirect("/");
});

// Cambio contraseña
router.get("/change-password", isLoggedIn, async (req, res) => {
  const { nom_usu, nom_tipousu } = await getProfileHeader(req.id);
  res.render("change-password", { nom_usu, nom_tipousu });
});


//nose donde poner
router.get("/forgot-psw", verifyLoggedIn,(req, res) => {
  res.render("forgotPws",{layout: false});
});
router.get("/reset-psw/:email/:token", verifyLoggedIn,(req, res) => {
  console.log("en reset")
  const{email,token}=req.params;
  try{
    console.log(process.env.JWT_SECRET)
    const payload=jwt.verify(token,process.env.JWT_SECRET);
    console.log(payload)
    console.log(email,token)
    res.render("reset-password",{layout: false,email:email,token:token});
} catch(error){
  return res.status(401);
}
});
module.exports = router;
