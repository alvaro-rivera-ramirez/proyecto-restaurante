const {Router}=require("express");
const {getProfileHeader}=require("../../services/profileServices");
const {isLoggedIn,verifyLoggedIn}=require("../../middleware/authentication");
const router=Router();

router.get('/',verifyLoggedIn,(req,res)=>{
    res.render('login',{ layout: false });
})
router.get('/home',isLoggedIn,async(req,res)=>{
    const {nom_usu,nom_tipousu}= await getProfileHeader(req.id);
    console.log("oe que",nom_tipousu);
        res.render('Home',{nom_usu,nom_tipousu});
    
})

//Cerrar sesion
router.get('/logOut',(req,res)=>{
    //Limpia la cookie del navegador
    res.clearCookie('jwt')   
    return res.redirect('/');
})

module.exports=router;