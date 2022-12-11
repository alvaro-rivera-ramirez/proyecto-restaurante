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
      console.log("en registro");
        console.log(Object.values(req.body))
        const values=Object.values(req.body);
       const users=await cartaServices.postPedido(values);
        return res.status(201).send(users);
    } catch (error) {
      return res.status(401);
    }
  };
  const registerDetalle = async (req, res) => {
    
    try {
        console.log("algo pasa")
        console.log(Object.values(req.body))
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
      const { params: {id},}=req;
      console.log("en getuser",req.body)
      const emesa=await cartaServices.tableState(id);
      return res.status(201).send(emesa);
    } catch (error) {
      return res.status(401);
    }
  };
  const eMesa = async (req, res) => {
    try {
      console.log("en emesa")
      console.log(Object.values(req.body))
      const values=Object.values(req.body);
     const users=await cartaServices.eMesa(values);
      return res.status(201).send(users);
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
};