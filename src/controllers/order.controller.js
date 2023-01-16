const { getProductByCategory } = require("../services/productoServices");

const { createPay } = require("../services/payServices");

const OrderServices = require("../services/orderServices");
const {
  handleErrorResponse,
  handleHttpError,
} = require("../utils/handleError");
const { getDateTime } = require("../utils/getDateTime");
const { nanoid } = require("nanoid");
const PDF = require("pdfkit-construct");
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

const getOrders = async (req, res) => {
  try {
    const roleUser = req.role;
    let orders = {};
    switch (roleUser) {
      case "Cocinero":
        orders.order = await OrderServices.getInfoOrdersTodayByState(1);
        orders.details = await OrderServices.getDetailsOrdersTodayByState(1);
        break;
      case "Mesero":
        const idusu = req.id;
        orders.takeaway = await OrderServices.getPreparedOrdersByMode(idusu, 1);
        orders.fortable = await OrderServices.getPreparedOrdersByMode(idusu, 2);
        break;
      case "Cajero":
        orders.takeaway = await OrderServices.getPreparedOrdersToCarryOut();
        orders.preAccount = await OrderServices.getPreAccountOrdersToday();
        break;
      default:
        break;
    }
    res.status(200).send(orders);
    return;
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error en la consulta");
  }
};

const createOrder = async (req, res) => {
  try {
    const { mod, mesas, detalle } = req.body;
    const date = getDateTime();
    const id_usu = req.id;
    const order = {
      id_usu,
      cod_ped: nanoid(12),
      id_epedido: 1,
      id_mod: mod,
      fecha_ped: date,
    };
    const idOrder = await OrderServices.createOrder(order);
    for (const detail of detalle) {
      detail.id_ped = idOrder;
      await OrderServices.createDetailOrder(detail);
    }
    order.nom_usu = req.usu;
    order.id_ped = idOrder;
    const detail = await OrderServices.getOrderDetailsByOrder(idOrder);
    if (mod == "2" && mesas.length > 0) {
      let idTable;
      for (const numMesa of mesas) {
        idTable = await OrderServices.getIdTable(numMesa);
        await OrderServices.createTableByOrder(idOrder, idTable.id_mesa);
        await OrderServices.updateStateTable(2, idTable.id_mesa);
      }

      res.status(201).send({
        order,
        mesas,
        detail,
      });
      return;
    }
    res.status(201).send({
      order,
      mesas: null,
      detail,
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "Error en la consulta");
  }
};

const getOneOrder = async (req, res) => {

  try {
    const { codeOrder } = req.params;
    let total = 0;
    let order = await OrderServices.getOneOrder(codeOrder);
    const detailsOrder = await OrderServices.getDetailsByOrder(order.id_ped);
    for (const detail of detailsOrder) {
      total += detail.subtotal;
    }
    order.total = total;
    res.status(200).send({
      order,
      detailsOrder,
    });
    return;
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR EN LA CONSULTA");
  }
};

const updateOrder = (req, res) => {};

const getPedidosAll = async (req, res) => {
  try {
    const pedidos = await OrderServices.getAll();
    return res.status(201).send(pedidos);
  } catch (error) {
    return res.status(401);
  }
};

const getPedidosFiltro = async (req, res) => {
  try {
    const { start_date, end_date } = req.body;
    if (!start_date && !end_date) {
      handleErrorResponse(res, "CAMPOS VACIOS", 401);
      return;
    }
    console.log(start_date, end_date);
    const pedidos = await OrderServices.getfechaAll(start_date, end_date);
    console.log(pedidos);
    return res.status(201).send(pedidos);
  } catch (error) {
    return res.status(401);
  }
};

const updateStateOrder = async (req, res) => {
  try {
    const { stateOrder } = req.body;
    const { codeOrder } = req.params;
    console.log("updateOrder");
    console.log(req.body);
    console.log(req.params);
    let infoOrderUpdate = {
      id_epedido: stateOrder,
    };
    let msg;
    if (
      req.body.idClient != undefined &&
      (req.role == "Cajero" || req.role == "Mesero")
    ) {
      infoOrderUpdate.id_cli = req.body.idClient;
    }

    if (req.role == "Cajero" && stateOrder == 4) {
      var { numMesas} = await OrderServices.getIdTableByCodeOrder(codeOrder);
      const { medioPago } = req.body;
      const { idPed } = req.body;
      const { mesas } = req.body;
      const { totalPago } = req.body;
      const date = getDateTime();

      // En adicion se crea el pago
      await createPay(idPed, medioPago, date, totalPago);
      if (mesas) {
        var arrayMesas = mesas.split(", ");
        console.log(arrayMesas);
        // Actualizar estado mesa a disponible
        for (var i = 0; i < arrayMesas.length; i++) {
          await OrderServices.updateStateTableByNumber(1, arrayMesas[i]);
        }
        // Borrar registro en estado_mesa
        await OrderServices.deleteTableOrderByOrder(idPed);
      }
    }

    if (req.role == "Cocinero" && stateOrder == "5") {
      var { mesas,numMesas} = await OrderServices.getIdTableByCodeOrder(codeOrder);
      if (mesas) {
        const arrayMesas = mesas.split(", ");
        console.log("pedido cancelado: ", arrayMesas);
        await OrderServices.updateStateGroupTables(arrayMesas);
        await OrderServices.deleteTableOrderByIdTable(arrayMesas);
      }
    }

    msg = stateOrder == "4" ? "Orden Pagada" : "Orden Actualizada";
    await OrderServices.updateStateOrder(codeOrder, infoOrderUpdate);

    res.status(200).send({ ok: true, msg,numMesas });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR EN LA CONSULTA");
  }
};
const getReport = async (req, res) => {
  const { id } = req.params;
  console.log("idpago en controler:", id);
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
          align: "center",
        });
        doc.fontSize(12);
        doc.text(`Nro de Boleta: 2023-${pago_[0].id_ped.toString().padStart(5,0)}`,{
          width: 420,
          align: 'left'
        });
        doc.text(`Cliente: ${pago_[0].nom_cli}`,{
          width: 420,
          align: 'left'
        });
        doc.text(`Fecha: ${pago_[0].fecha_pago}`,{
          width: 420,
          align: 'left'
        });
      });
      
      doc.addTable([
        {key:'nom_prod',label:'Producto',align:'left'},
        {key:'precio_u_prod',label:'Precio Unit en S/.',align:'left'},
        {key:'cantidad_det',label:'Cantidad',align:'left'},
        {key:'subTotal',label:'Total en S/.',align:'left'},
      ],platos,{
        border: null,
        width: "fill_body",
        striped: true,
        stripedColors: ["#e7e9eb","#e7e9eb"],
        headBackground : '#0d94b4',
        headColor : '#e7e9eb',
        cellsPadding: 10,
        marginLeft: 45,
        marginRight: 45,
        marginTop : 0,
        headAlign: 'left'
    });
    let arrayZero=[{
      nom_prod:' ',
      precio_u_prod:' ',
      cantidad_det:' ',
      sub_total: ' '
    }];
    doc.addTable([
      {key:'nom_prod',label:'                                          ',align:'left'},
      {key:'precio_u_prod',label:'                                     ',align:'left'},
      {key:'cantidad_det',label:'Sub Total',align:'left'},
      {key:'sub_total',label:`S/.${pago_[0].sub_total}`,align:'right'},
    ],arrayZero,{
      border: null,
      width: "fill_body",
      striped: true,
      stripedColors: ["#e7e9eb","#e7e9eb"],
      headBackground : '#0d94b4',
      headColor : '#e7e9eb',
      headHeight : 30,
      cellsPadding: null,
      marginLeft: 45,
      marginRight: 45,
      headAlign: 'left'
  });
  doc.addTable([
    {key:'nom_prod',label:'                                     ',align:'left'},
    {key:'precio_u_prod',label:'                                ',align:'left'},
    {key:'cantidad_det',label:'IGV',align:'left'},
    {key:'sub_total',label:`S/.${pago_[0].igv_pago}`,align:'left'},
  ],arrayZero,{
    border: null,
    width: "fill_body",
    striped: true,
    stripedColors: ["#e7e9eb","#e7e9eb"],
    headBackground : '#0d94b4',
    headColor : '#e7e9eb',
    headHeight : 30,
    cellsPadding: null,
    marginLeft: 45,
    marginRight: 45,
    marginBotom: 2,
    headAlign: 'left'
});
doc.addTable([
  {key:'nom_prod',label:'                                ',align:'left'},
  {key:'precio_u_prod',label:'                          ',align:'left'},
  {key:'cantidad_det',label:'Total',align:'left'},
  {key:'sub_total',label:`S/.${pago_[0].total_pago}`,align:'right'},
],arrayZero,{
  border: null,
  width: "fill_body",
  striped: true,
  stripedColors: ["#e7e9eb","#e7e9eb"],
  headBackground : '#0d94b4',
  headColor : '#e7e9eb',
  headHeight : 30,
  cellsPadding: null,
  marginLeft: 45,
  marginRight: 45,
  headAlign: 'left'
});
      doc.render();
      doc.end();
  
  } catch (error) {
    return res.status(401);
  }
};
const getReportAll = async (req, res) => {
  try {
    const getReportAll_ = await OrderServices.getReportAll();

    return res.status(201).send(getReportAll_);
  } catch (error) {
    return res.status(401);
  }
};
const getReportOne = async (req, res) => {
  
  try {
    const {id}=req.params;
    const getReportAll_=await OrderServices.getReportOne(id);

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
  getPedidosAll,
  getPedidosFiltro,
  updateStateOrder,
  getReport,
  getReportAll,
  getReportOne
};
