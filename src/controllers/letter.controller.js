const cartaServices = require("../services/letterServices");
const { verifyToken } = require("../utils/handleToken");

const getCarta = async (req, res) => {
  try {
    const users=await cartaServices.getCarta();
    return res.status(201).send(users);
  } catch (error) {
    return res.status(401);
  }
};
const register = async (req, res) => {
    try {
        const values=Object.values(req.body);
       const users=await cartaServices.postPedido(values);
        return res.status(201).send(users);
    } catch (error) {
      return res.status(401);
    }
  };
  const registerDetalle = async (req, res) => {
    
    try {
        const values=Object.values(req.body);
       const users=await cartaServices.postDetallePedido(values);
        return res.status(201).send(users);
    } catch (error) {
      return res.status(401);
    }
  };
  const lastRecord = async (req, res) => {
    try {
       const users=await cartaServices.getLastRecord();
        return res.status(201).send(users);
    } catch (error) {
      return res.status(401);
    }
  };
  const tableState = async (req, res) => {
    try {
      const emesa=await cartaServices.tableState();
      return res.status(201).send(emesa);
    } catch (error) {
      return res.status(401);
    }
  };
  const eMesa = async (req, res) => {
    try {
      const values=Object.values(req.body);
     const users=await cartaServices.eMesa(values);
      return res.status(201).send(users);
  } catch (error) {
    return res.status(401);
  }
  };
  const getMod = async (req, res) => {
    try {
      const emod=await cartaServices.getMod();
      return res.status(201).send(emod);
    } catch (error) {
      return res.status(401);
    }
  };
  const getEpedido = async (req, res) => {
    try {
      const epedido_=await cartaServices.getEpedido();
      return res.status(201).send(epedido_);
    } catch (error) {
      return res.status(401);
    }
  };
  const orderTable = async (req, res) => {
    try {
      const values=Object.values(req.body);
     const orderTable_=await cartaServices.orderTable(values);
      return res.status(201).send(orderTable_);
  } catch (error) {
    return res.status(401);
  }
  };
  const getDetPed = async (req, res) => {
    try {
      
  const { params: {id},}=req;
     const getDetPed_=await cartaServices.getDetPed(id);
      return res.status(201).send(getDetPed_);
  } catch (error) {
    return res.status(401);
  }
  };

module.exports = {
  getCarta,
  register,
  registerDetalle,
  lastRecord,
  tableState,
  eMesa,
  getMod,
  getEpedido,
  orderTable,
  getDetPed,
};