const {getCountOrderWait,
  getModeToPreparedOrder,
  getCountOrderPreparedToCarryOut,
  getModeToPreAccountOrder
}=require("../services/orderServices")
const {verifyToken}=require("../utils/handleToken");
const socketController = async(socket) => {

  const {payload}=await verifyToken(socket.handshake.headers.cookie.slice(4));

  if(!payload){
    return socket.disconnet();
  }

  switch (payload.user.nom_tipousu) {
    case "Mesero":
      socket.join(payload.user.id_usu);
      break;
    case "Cajero":
      socket.join("cajeros");
      break;
    default:
      break;
  }

  socket.on("confirmar-pedido", async(payload) => {

    const orderForWaiter={
      order:payload.order,
      mesas:payload.mesas,
    };
    const {count_orders_wait}= await getCountOrderWait();
    console.log(count_orders_wait)
    const orderForCook={
      order:payload.order,
      detail:payload.detail,
      mesas:payload.mesas,
      countOrderWait:count_orders_wait
    };

    /* Objeto Payload
      {
        order:{}
        mesas:[ ]
        detalle:[]
      }
    */
    if(payload.order.id_mod=="2"){
      socket.broadcast.emit("recibe-pedido-mesa",orderForWaiter);
    }
    socket.broadcast.emit("cocinero-recibe-pedido",orderForCook);
  });

  socket.on("pedido-preparado",async(payload)=>{
    const {code}=payload;
    console.log(code)
    const {id,mode,user,cant}=await getModeToPreparedOrder(code);
    const orderPrepared={
      id,code,mode,cant
    }
    console.log(orderPrepared);
    socket.to(user).emit("mesero-pedido-preparado",orderPrepared);
    if(mode=="1"){
      const {count_orders_prepared}=await getCountOrderPreparedToCarryOut();
      console.log("enviando pedido a cajero")
      socket.to("cajeros").emit("cajero-pedido-preparado",{id,code,cant:count_orders_prepared});
    }
  });

  socket.on("pedido-precuenta",async(payload)=>{
    const {code}=payload;
    const {id,mesas,cant}=await getModeToPreAccountOrder(code);
    console.log(id,mesas,cant);
    console.log('socket pedido precuenta')
    const arrayMesas=(mesas)?mesas.split(", "):null;
    socket.to("cajeros").emit("cajero-pedido-precuenta",{id,code,mesas:arrayMesas,cant});
  })

  socket.on('liberar-mesa',async(payload)=>{
    console.log("mesas a liberar",payload);
    if(payload.mesas){
      socket.broadcast.emit("mesas-liberadas",payload);
    }
  })
};

module.exports={
    socketController
}
