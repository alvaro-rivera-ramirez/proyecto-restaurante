const { getProductByCategory } = require("../services/productoServices");

const { createPay } = require("../services/payServices");

const OrderServices=require("../services/orderServices");
const {
  handleErrorResponse,
  handleHttpError,
} = require("../utils/handleError");
const {getDateTime}=require("../utils/getDateTime");
const {nanoid} = require("nanoid");
const PDF=require("pdfkit-construct");
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
    if(roleUser=="Cajero"){
      const idusu=req.id;
      orders.takeaway=await OrderServices.getPreparedOrdersByMode(idusu,1);
      orders.fortable=await OrderServices.getPreparedOrdersByMode(idusu,2);
    }
    if(roleUser=="Cocinero"){
      orders.order=await OrderServices.getInfoOrdersTodayByState(1);
      orders.details=await OrderServices.getDetailsOrdersTodayByState(1);
    }

    if(roleUser=="Mesero"){
      const idusu=req.id;
      orders.takeaway=await OrderServices.getPreparedOrdersByMode(idusu,1);
      orders.fortable=await OrderServices.getPreparedOrdersByMode(idusu,2);
    }
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

    if(mod=='2' && mesas.length>0){
        let idTable;
        for (const numMesa of mesas) {
            idTable=await OrderServices.getIdTable(numMesa);
            await OrderServices.createTableByOrder(idOrder,idTable.id_mesa);
            await OrderServices.updateStateTable(2,idTable.id_mesa);
        }

        res.status(201).send({
          order,
          mesas
      });
      return;
    }
    res.status(201).send({
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

const updateStateOrder =async(req,res)=>{
  try {
    const {stateOrder}=req.body;
    const {codeOrder}=req.params;

    console.log("updateOrder");
    console.log(req.body);
    console.log(req.params);

    let infoOrderUpdate={
      id_epedido:stateOrder
    }
    let msg;
    if(req.body.idClient!=undefined && (req.role=="Cajero" || req.role=="Mesero")){
      console.log('agrgeando id cliente')
      infoOrderUpdate.id_cli=req.body.idClient;
    }
    if(req.role=="Cajero" && stateOrder==4){
      const {medioPago}=req.body;
      const {idPed}=req.body;
      const {mesas}=req.body;
      const {totalPago}=req.body;
      const date=getDateTime();
      
      var arrayMesas = mesas.split(", ");
      console.log(arrayMesas);

      // En adicion se crea el pago
      await createPay(idPed,medioPago,date,totalPago);
      
      // Actualizar estado mesa a disponible
      for (var i = 0; i < arrayMesas.length; i++) {
        await OrderServices.updateStateTableByNumber(1,arrayMesas[i]);
      }

      // Borrar registro en estado_mesa
      await OrderServices.deleteTableOrderByOrder(idPed);
    }

    msg=(req.role=="Cajero")?'Orden Pagada':'Orden Actualizada';
    await OrderServices.updateStateOrder(codeOrder,infoOrderUpdate);

    res.status(200).send({ok:true,msg});
  } catch (error) {
    console.log(error);
    handleHttpError(res,"ERROR EN LA CONSULTA");
  }
}
const getReport = async (req, res) => {
  const {id}=req.params;
      console.log("idpago en controler:",id)
  try {
      const platos=await OrderServices.getOrderReport(id);
      const pago_=await OrderServices.getOrderPago(id);
      console.log(platos)
      console.log(pago_)
      const doc=new PDF({bufferPage:true});
      const filename=`Boleta${Date.now()}.pdf`;
      //doc.pipe(fs.createWriteStream(`${filename}`));
      const stream =res.writeHead(201,{
        'Content-Type':'application/pdf',
        'Content-disposition':`attachment;filename=${filename}`
      });
      
      doc.on('data',(data)=>{stream.write(data)});
      doc.on('end',()=>{stream.end()});


      //doc.text("hola mundo",30,30);
      doc.setDocumentHeader({
        height:'16'
      },()=>{
        doc.fontSize(15).text('Boleta',{
          width: 500,
          align: 'center'
        });
        doc.fontSize(12);
        doc.text(`nrumo de boleta: ${pago_[0].id_ped}`,{
          width: 500,
          align: 'left'
        });
        doc.text(`cliente: ${pago_[0].nom_cli}`,{
          width: 500,
          align: 'left'
        });
        doc.text(`fecha: ${pago_[0].fecha_pago}`,{
          width: 500,
          align: 'left'
        });
      });
      
      doc.addTable([
        {key:'nom_prod',label:'producto',align:'left'},
        {key:'precio_u_prod',label:'precio unit',align:'left'},
        {key:'cantidad_det',label:'cantidad',align:'left'},
        {key:'subTotal',label:'sub total',align:'left'},
      ],platos,{
        border: null,
        width: "fill_body",
        striped: true,
        stripedColors: ["#f6f6f6", "#d6c4dd"],
        cellsPadding: 10,
        marginLeft: 45,
        marginRight: 45,
        headAlign: 'left'
    });
    doc.setDocumentFooter({
      height: '70%'
    },()=>{
      doc.fontSize(15).text(`TOTAL: S/. ${pago_[0].total_pago}`,doc.footer.x+50,doc.footer.y);
    });
      doc.render();
      doc.end();
      
  } catch (error) {
    return res.status(401);
  };

};
const getReportAll = async (req, res) => {
  
  try {
    const getReportAll_=await OrderServices.getReportAll();

    return res.status(201).send(getReportAll_);
  } catch (error) {
    
    return res.status(401);
  }
};
module.exports = {
  getProductsByCategory,
  getOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  getPedidos,
  getPedidosFiltro,
  updateStateOrder,
  getReport,
  getReportAll
};
