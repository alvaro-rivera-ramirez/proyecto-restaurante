const { Router } = require("express");
const { getProfileHeader } = require("../../services/profileServices");
const {
  isLoggedIn,
  verifyLoggedIn,
} = require("../../middleware/authentication");
const router = Router();
    router.get('/carta',isLoggedIn,async(req,res)=>{
        const {nom_usu,nom_tipousu}= await getProfileHeader(req.id);
        res.render('mozo/nozoCarta',{nom_usu,nom_tipousu});
    })

module.exports=router