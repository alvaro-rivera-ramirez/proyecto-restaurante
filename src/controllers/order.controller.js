const { getProductByCategory } = require("../services/productoServices");
const OrderServices=require("../services/orderServices");
const {
  handleErrorResponse,
  handleHttpError,
} = require("../utils/handleError");
const {getDateTime}=require("../utils/getDateTime")
const {nanoid} = require("nanoid");

const getProductsByCategory = async (req, res) => {
  try {
    const { idcategory } = req.params;
    const products = await getProductByCategory(idcategory);
    return res.status(200).send(products);
  } catch (error) {
    handleHttpError(res, "Error en la consulta");
    console.log(error);
  }
};

const createOrder = async (req, res) => {
  /*
        body Example:
        pedido={
            "id_mod",
            "mesas"=[ 1, 2, 4]
            "detalle"=[
                {
                    "id_pro":1,
                    "cantidad_det":2
                    "descripcion":"Algo"
                },
                {
                    "id_pro":1,
                    "cantidad_det":2
                    "descripcion_det":"Algo"
                }
            ]
        } 
    */

  try {
    const { mod, mesas, detalle } = req.body;
    const date=getDateTime();
    const id_usu=req.id;
    const order={
        id_usu,
        cod_ped:nanoid(12),
        id_epedido:1,
        id_mod:mod,
        fecha_ped:date,
    }
    const idOrder=await OrderServices.createOrder(order)
    for(const detail of detalle){
        detail.id_ped=idOrder;
        await OrderServices.createDetailOrder(detail);
    }

    if(mod=='2' && mesas.length>0){
        let idTable;
        for (const numMesa of mesas) {
            idTable=await OrderServices.getIdTable(numMesa);
            await OrderServices.createTableByOrder(idOrder,idTable.id_mesa);
            await OrderServices.updateStateTable(2,idTable.id_mesa);
        }
    }
    res.status(201).send({
        idOrder,
        order,
        detalle
    });
  } catch (error) {
    console.log(error);
  }
};

const getOneOrder = async (req, res) => {
    try {
        const {codeOrder}=req.params;
        let total=0;
        let order=await OrderServices.getOneOrder(codeOrder);
        const detailsOrder=await OrderServices.getDetailsByOrder(order.id_ped);
        for (const detail of detailsOrder) {
            total+=detail.subtotal;
        }
        order.total=total;
        if(order.id_mod!=2){
          res.status(200).send({
              order,
              detailsOrder
          })
          return;
        }

        const tables=await OrderServices.getTableOrder(order.id_ped);
        res.status(200).send({
          order,
          detailsOrder,
          tables
        })
        return;
    } catch (error) {
        console.log(error)
        handleHttpError(res,"ERROR EN LA CONSULTA");
    }
};

const updateOrder = (req, res) => {

};

const getPedidos = async (req, res) => {
  try {
      const pedidos=await OrderServices.getAll();
      return res.status(201).send(pedidos);
  } catch (error) {
      return res.status(401);
  }
};
const getPedidosFiltro = async (req, res) => {
  try {
      const {start_date,end_date} = req.body;
      if(!start_date && !end_date){
        handleErrorResponse(res,"CAMPOS VACIOS",401);
        return;
      }
      console.log(start_date,end_date);
      const pedidos=await OrderServices.getfechaAll(start_date,end_date);
      console.log(pedidos);
      return res.status(201).send(pedidos);
  } catch (error) {
      return res.status(401);
  }
};
module.exports = {
  getProductsByCategory,
  getOneOrder,
  createOrder,
  updateOrder,
  getPedidos,
  getPedidosFiltro
};
