const { Router } = require("express");
const { isLoggedIn, verifyLoggedIn } = require("../../middleware/authentication");
const { getOrderByTable, getOrderDetailsByOrder } = require("../../services/orderServices");

const router = Router();

router.get('/realizar-pago', isLoggedIn, async (req,res) => {
    const nom_usu=req.name;
    const nom_tipousu=req.role;
    
    id_mesa = req.query.mesa;
    ped = await getOrderByTable(id_mesa);
    det = await getOrderDetailsByOrder(ped[0].id_ped);
    
    total = 0;
    for (let i = 0; i < det.length; i++) { total = total + det[i].subtotal; }

    res.render('cajero/realizarPago', { nom_usu, nom_tipousu, id_mesa, ped, det, total });
})
router.get('/reportes',isLoggedIn,(req,res)=>{
    const nom_usu=req.name
    const nom_tipousu=req.role
    res.render('cajero/reportes',{nom_usu,nom_tipousu});
  })
module.exports = router;