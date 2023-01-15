const { Router } = require("express");
const { isLoggedIn, verifyLoggedIn } = require("../../middleware/authentication");
const { getTotalPayToday } = require("../../services/payServices");

const router = Router();

router.get('/pago', isLoggedIn, async (req,res) => {
    const nom_usu=req.name;
    const nom_tipousu=req.role;
    const {total_pay}=await getTotalPayToday();
    let totalPay=(parseFloat(total_pay)).toFixed(2);
    res.render('cajero/realizarPago', { nom_usu, nom_tipousu, totalPay });
})
router.get('/reportes',isLoggedIn,(req,res)=>{
    const nom_usu=req.name
    const nom_tipousu=req.role
    res.render('cajero/reportes',{nom_usu,nom_tipousu});
  })
module.exports = router;