const TableServices = require("../services/tableServices");
const {
  handleErrorResponse,
  handleHttpError,
} = require("../utils/handleError");

const getTables = async (req, res) => {
  try {
    let tables;
    if(!(req.query.estado && req.query.piso)){
      tables = await TableServices.getTables();
    }
    else if(!req.query.estado){
      tables = await TableServices.getTablesByFloor(req.query.piso);
    }else if(req.query.estado && req.query.piso){
      tables = await TableServices.getTablesByState(req.query.piso,req.query.estado);
    }
    return res.status(200).send(tables);
  } catch (error) {
    console.log(error);
    return res.status(401);
  }
};
const getOneTable = async (req, res) => {
  const { id } = req.params;
  try {
    const table = await TableServices.getOneTable(id);
    return res.status(200).send(table);
  } catch (error) {
    handleErrorResponse(res, "TABLE_INVALID", 401);
    console.log(error);
  }
};
const createTable = async (req, res) => {
  const { numero_mesa } = req.body;
  const { id_piso } = req.body;
  const id_emesa = 1;
  const table = { numero_mesa, id_piso, id_emesa };
  try {
    await TableServices.createTable(table);
    return res.status(201).send("TABLE_CREATED");
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, "ERROR EN LA CONSULTA");
  }
};
const updateTable = async (req, res) => {
  const { id } = req.params;
  const { numero_mesa,id_piso,id_emesa } = req.body;

  const table = { id_piso, numero_mesa, id_emesa };
  try {
    await TableServices.updateTable(id, table);
    return res.status(201).send("TABLE_UPDATED");
  } catch (error) {
    handleErrorResponse(res, "ERROR EN LA CONSULTA");
    console.log(error);
  }
};
const deleteTable = async (req, res) => {
  const { id } = req.params;
  try {
    await TableServices.deleteTable(id);
    return res.status(201).send("TABLE_DELETED");
  } catch (error) {
    handleErrorResponse(res, "ERROR EN LA CONSULTA");
    console.log(error);
  }
};

module.exports = {
  getTables,
  getOneTable,
  createTable,
  updateTable,
  deleteTable,
};
