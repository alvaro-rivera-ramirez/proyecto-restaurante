const statsServices = require("../services/statsServices");

const pedMes = async (req, res) => {
  
  try {
    const { params: {dato},}=req;
    var fecha = new Date("'"+req.params.dato+"'");
    var mes=fecha.getMonth()+1;
    var anio=fecha.getFullYear();
    arrayfecha=[mes,anio];
    const stats_=await statsServices.pedMes(arrayfecha);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }
};
const pedBimes=async(req,res)=>{
  try{
    const { params: {dato},}=req;
    var fecha = new Date("'"+req.params.dato+"'");
    var mes=fecha.getMonth()+1;
    var dia;
    var anio=fecha.getFullYear();
    var prefecha;
    let stats_=[];
    var consulta;
    var respuesta;
    
    for(let item=0;item<5;item++){
      if(mes-1<1 & item!=0){
        premes=12;
        preanio=anio-1;
      }
      else if(item==0){
        var preanio=anio;
        var premes=mes;
      }
      else{
        premes=mes-1;
      }
      dia=new Date(anio,mes,0);
      fecha=new Date("'"+preanio+"-"+premes+"-"+dia.getDate()+"'");
      prefecha=new Date("'"+preanio+"-"+premes+"-"+1+"'");
      let arrayfecha=[prefecha,fecha];
      consulta=await statsServices.pedBimes(arrayfecha);
      if(consulta==null){
        consulta.push(0);
      }
      respuesta={
        cantPed:consulta[0].cantPed,
        mes:premes,
        anio:preanio
      }
      stats_.push(respuesta);
      mes=premes;
      anio=preanio;
    }
    //const statsarray=await statsServices.pedBimes(arrayfecha);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }

};
const catMes = async (req, res) => {
  const { params: {dato},}=req;
  try {
    var fecha = new Date("'"+req.params.dato+"'");
    var mes=fecha.getMonth()+1;
    var anio=fecha.getFullYear();
    arrayfecha=[mes,anio];
    const stats_=await statsServices.catMes(arrayfecha);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }
};
const pedDia = async (req, res) => {
  const { params: {dato},}=req;
  try {
    const stats_=await statsServices.pedDia(req.params.dato);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }
};
const catDia = async (req, res) => {
  const { params: {dato},}=req;
  try {
    const stats_=await statsServices.catDia(req.params.dato);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }
};
const pedBiDia = async (req, res) => {
  const { params: {dato},}=req;
  try {
    let stats_=[];
    var preanio;
    var prefecha;
    var predia;
    var premes;
    var diaux;
    var respuesta;
    var consulta;
    let fecha=new Date("'"+req.params.dato+"'");
    let anio=fecha.getFullYear();
    let mes=fecha.getMonth()+1;
    let dia=fecha.getDate();
  
    for(let item=0;item<5;item++){
      if(item==0){
        premes=mes;
        preanio=anio;
        predia=dia;
        fecha=new Date("'"+preanio+"-"+premes+"-"+predia+"'");
      }
      else{
        if(dia-1<1){
          if(mes==1){
            
            preanio=anio-1;
            premes=12;
          }
          else{
            
            premes=mes-1;
            preanio=anio;
          }
          diaux=new Date(preanio,premes,0);
          predia=diaux.getDate();
          fecha=new Date("'"+preanio+"-"+premes+"-"+predia+"'");
        }
        else{
        premes=mes;
        preanio=anio;
        predia=dia-1;
        fecha=new Date("'"+preanio+"-"+premes+"-"+predia+"'");
        }
        
      }
      consulta=await statsServices.pedBiDia(fecha);
      if(consulta==null){
        consulta.push(0);
      }
      respuesta={
        cantPed:consulta[0].cantPed,
        mes:premes,
        anio:preanio,
        dia:predia
      }
      stats_.push(respuesta);
      mes=premes;
      anio=preanio;
      dia=predia;
    };
    console.log(stats_)
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }
};
module.exports = {
  pedMes,
  pedDia,
  catDia,
  catMes,
  pedBimes,
  pedBiDia
};