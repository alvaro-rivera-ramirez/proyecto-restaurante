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


const getOrders=async(req,res)=>{
  try {
    const roleUser=req.role;
    let orders={};
    
    switch (roleUser) {
      case "Cocinero":
        orders.order=await OrderServices.getInfoOrdersTodayByState(1);
        orders.details=await OrderServices.getDetailsOrdersTodayByState(1);
        break;
      case "Mesero":
        const idusu=req.id;
        orders.takeaway=await OrderServices.getPreparedOrdersByMode(idusu,1);
        orders.fortable=await OrderServices.getPreparedOrdersByMode(idusu,2);
        break;
      case "Cajero":
        orders.takeaway=await OrderServices.getPreparedOrdersToCarryOut();
        break;
      default:
        break;
    }
    // if(roleUser=="Cocinero"){
    //   orders.order=await OrderServices.getInfoOrdersTodayByState(1);
    //   orders.details=await OrderServices.getDetailsOrdersTodayByState(1);
    // }

    // if(roleUser=="Mesero"){
    //   const idusu=req.id;
    //   orders.takeaway=await OrderServices.getPreparedOrdersByMode(idusu,1);
    //   orders.fortable=await OrderServices.getPreparedOrdersByMode(idusu,2);
    // }
    res.status(200).send(orders);
    return;
  } catch (error) {
    console.log(error);
    handleHttpError(res,"Error en la consulta");
  }
}

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
    order.nom_usu=req.usu;
    order.id_ped=idOrder;
    const detail =await OrderServices.getOrderDetailsByOrder(idOrder);
    if(mod=='2' && mesas.length>0){
        let idTable;
        for (const numMesa of mesas) {
            idTable=await OrderServices.getIdTable(numMesa);
            await OrderServices.createTableByOrder(idOrder,idTable.id_mesa);
            await OrderServices.updateStateTable(2,idTable.id_mesa);
        }

        res.status(201).send({
          order,
          mesas,
          detail
      });
      return;
    }
    res.status(201).send({
        order,
        mesas:null,
        detail
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res,"Error en la consulta");
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
        res.status(200).send({
            order,
            detailsOrder
        })
        return;
    } catch (error) {
        console.log(error)
        handleHttpError(res,"ERROR EN LA CONSULTA");
    }
};

const updateOrder = (req, res) => {

};

const updateStateOrder =async(req,res)=>{
  try {
    const {stateOrder}=req.body;
    const {codeOrder}=req.params;
    let infoOrderUpdate={
      id_epedido:stateOrder
    }
    let msg;
    if(req.body.idClient!=undefined && (req.role=="Cajero" || req.role=="Mesero")){
      console.log('agrgeando id cliente')
      infoOrderUpdate.id_cli=req.body.idClient;
    }
    if(req.role=="Cajero"){
      
    }

    msg=(req.role=="Cajero")?'Orden Pagada':'Orden Actualizada';
    await OrderServices.updateStateOrder(codeOrder,infoOrderUpdate);

    res.status(200).send({ok:true,msg});
  } catch (error) {
    console.log(error);
    handleHttpError(res,"ERROR EN LA CONSULTA");
  }
}
module.exports = {
  getProductsByCategory,
  getOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  updateStateOrder
};
