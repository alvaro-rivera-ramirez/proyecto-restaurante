const { Router } = require("express");
const { isLoggedIn, verifyLoggedIn } = require("../../middleware/authentication");
const {isCashier}=require("../../middleware/authRole");
const { getTotalPayToday } = require("../../services/payServices");
const {getStateOrder}=require("../../services/orderServices")
const router = Router();

router.get('/pago', isLoggedIn,isCashier, async (req,res) => {
    const nom_usu=req.name;
    const nom_tipousu=req.role;

    if(!req.query.cod){
      res.status(404).render("errors/404",{nom_usu,nom_tipousu});
      return;
    }

    const order=await getStateOrder(req.query.cod);
    console.log(order)
    if(!order.length){
      res.status(404).render("errors/404",{nom_usu,nom_tipousu});
      return;
    }

    if(order[0].state!="3"){
      res.status(404).render("errors/404",{nom_usu,nom_tipousu});
      return;
    }
    const {total_pay}=await getTotalPayToday();
    console.log(total_pay);
    res.render('cajero/realizarPago', { nom_usu, nom_tipousu, total_pay });
})
router.get('/reportes',isLoggedIn,(req,res)=>{
    const nom_usu=req.name
    const nom_tipousu=req.role
    res.render('cajero/reportes',{nom_usu,nom_tipousu});
  })
module.exports = router;