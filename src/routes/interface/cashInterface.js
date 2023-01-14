const { Router } = require("express");
const { isLoggedIn, verifyLoggedIn } = require("../../middleware/authentication");
const { getTotalPayToday } = require("../../services/payServices");

const router = Router();

router.get('/pago', isLoggedIn, async (req,res) => {
    const nom_usu=req.name;
    const nom_tipousu=req.role;
    const {total_pay}=await getTotalPayToday();
    console.log(total_pay);

    res.render('cajero/realizarPago', { nom_usu, nom_tipousu, total_pay });
})

module.exports = router;