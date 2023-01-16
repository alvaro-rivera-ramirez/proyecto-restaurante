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
        console.log("en item 0: ",preanio,premes)
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
      console.log(arrayfecha)
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
    console.log("stats: ",stats_)
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
    let array=[];
    let fecha=new Date("'"+req.params.dato+"'");
    let anio=fecha.getFullYear();
    let mes=fecha.getMonth();
    let dia=fecha.getDate();
    console.log(anio,mes,dia);
    for(let item=0;item<5;item++){
      const stats_=await statsServices.pedBiDia(fecha);
      array.push(stats_);
      /*if(dia-1<1){
        if(mes)
      }
      else{
        dia=dia-1;
      }*/
    }
    //const stats_=await statsServices.pedDia(req.params.dato);
    return res.status(201).send("stats_");
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