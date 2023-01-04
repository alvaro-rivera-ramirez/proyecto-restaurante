const statsServices = require("../services/statsServices");

const pedMes = async (req, res) => {
  const { params: {dato},}=req;
  try {
    var Navidad = new Date("'"+req.params.dato+"'");
    var mes=Navidad.getMonth()+1;
    var anio=Navidad.getFullYear();
    arrayfecha=[mes,anio];
    const stats_=await statsServices.pedMes(arrayfecha);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }
};
const catMes = async (req, res) => {
  const { params: {dato},}=req;
  try {
    var Navidad = new Date("'"+req.params.dato+"'");
    var mes=Navidad.getMonth()+1;
    var anio=Navidad.getFullYear();
    arrayfecha=[mes,anio];
    console.log(arrayfecha)
    const stats_=await statsServices.catMes(arrayfecha);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }
};
const pedDia = async (req, res) => {
  const { params: {dato},}=req;
  try {
    console.log(req.params.dato)
    const stats_=await statsServices.pedDia(req.params.dato);
    return res.status(201).send(stats_);
  } catch (error) {
    return res.status(401);
  }
};
const catDia = async (req, res) => {
  const { params: {dato},}=req;
  try {
    console.log(req.params.dato)
    const stats_=await statsServices.catDia(req.params.dato);
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
};