const ChefServices = require("../services/orderServices");
const {
    handleErrorResponse,
    handleHttpError,
  } = require("../utils/handleError");

  const getIdPedidoAll = async (req, res) => {
    try {
      const pedidos = await ChefServices.getPedidoIdAll();
      return res.status(200).send(pedidos);
    } catch (error) {
      console.log(error);
      return res.status(401);
    }
  };
  const getPedido = async (req, res) => {
    try {
      const pedidos = await ChefServices.getPedido();
      return res.status(201).send(pedidos);
    } catch (error) {
      console.log(error);
      return res.status(401);
    }
  };
  const updateEstadoPed= async (req, res) => {
    const { id } = req.params;
    try {
      await ChefServices.UpdateEstadoPedido(id);
      return res.status(200).send({mensaje:"Pedido_Preparado"});
    } catch (error) {
      handleErrorResponse(res, "ERROR EN LA CONSULTA");
      console.log(error);
    }
  };
  module.exports = {
    getIdPedidoAll,
    updateEstadoPed,
    getPedido,
    updateEstadoPed
  };