const { Router } = require("express");
const { getProfileHeader } = require("../../services/profileServices");
const {
  isLoggedIn,
  verifyLoggedIn,
} = require("../../middleware/authentication");
const { getOrdersByTable, getOrderDetailsByOrder } = require("../../services/orderServices");

const router = Router();

router.get('/realizar-pago', isLoggedIn, async (req,res)=>{
  const nom_usu=req.name;
  const nom_tipousu=req.role;

  console.log(req.query.mesa);
  ped = await getOrdersByTable(req.query.mesa);
  console.log(ped);

  console.log(ped[0].id_ped);
  det = await getOrderDetailsByOrder(ped[0].id_ped);
  console.log(det);

  res.render('cajero/realizarPago', {nom_usu, nom_tipousu, ped, det});
})

module.exports=router