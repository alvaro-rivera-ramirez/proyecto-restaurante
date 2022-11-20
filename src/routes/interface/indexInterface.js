const {Router}=require("express");
const {getProfileHeader}=require("../../services/profileServices");
const {isLoggedIn,verifyLoggedIn}=require("../../middleware/authentication");
const router=Router();

// Login
router.get('/',verifyLoggedIn,(req,res)=>{
    res.render('login',{ layout: false });
})

// Inicio
router.get('/home',isLoggedIn,async(req,res)=>{
    const {nom_usu,nom_tipousu}= await getProfileHeader(req.id);

    res.render('home',{nom_usu,nom_tipousu});
})

// Logout
router.get('/logOut',(req,res)=>{
    // Limpia la cookie del navegador
    res.clearCookie('jwt')   
    return res.redirect('/');
})

// Cambio contraseña
router.get('/change-password',isLoggedIn,async(req,res)=>{
    const {nom_usu,nom_tipousu} = await getProfileHeader(req.id);
    res.render('change-password',{nom_usu,nom_tipousu});
})
//Interfaz registro usuarios
router.get('/register-user',isLoggedIn,async(req,res)=>{
    const {nom_usu,nom_tipousu}= await getProfileHeader(req.id);
    res.render('admin/registerUser',{nom_usu,nom_tipousu});
})
//Interfaz vista registro usuarios
router.get('/Users',isLoggedIn,async(req,res)=>{
    const {nom_usu,nom_tipousu}= await getProfileHeader(req.id);
    res.render('admin/adminUsers',{nom_usu,nom_tipousu});
})

module.exports=router;