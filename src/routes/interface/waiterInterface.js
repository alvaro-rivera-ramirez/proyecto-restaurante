const { Router } = require("express");
const { getProfileHeader } = require("../../services/profileServices");
const {
  isLoggedIn,
  verifyLoggedIn,
} = require("../../middleware/authentication");
const {getStateOrder}=require("../../services/orderServices")
const {isWaiter}=require("../../middleware/authRole");
const router = Router();


router.get("/comanda", isLoggedIn,isWaiter,async(req, res) => {
    const nom_usu=req.name
    const nom_tipousu=req.role
    if(!req.query.cod){
      res.render("mesero/comanda",{nom_usu,nom_tipousu});
      return;
    }
    const order=await getStateOrder(req.query.cod);
    console.log(order)
    if(!order.length){
      res.render("errors/404",{nom_usu,nom_tipousu});
      return;
    }
    res.render("mesero/comanda-pedido",{nom_usu,nom_tipousu,state:order[0].state});
    return;
  });



module.exports=router;

