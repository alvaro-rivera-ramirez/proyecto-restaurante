const {getCountOrderWait,getModeToOrder}=require("../services/orderServices")
const {verifyToken}=require("../utils/handleToken");
const socketController = async(socket) => {

  const {payload}=await verifyToken(socket.handshake.headers.cookie.slice(4));

  if(!payload){
    return socket.disconnet();
  }
  socket.join(payload.user.id_usu);
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

    socket.broadcast.emit("mesero-recibe-pedido",orderForWaiter);
    socket.broadcast.emit("cocinero-recibe-pedido",orderForCook);
  });

  socket.on("pedido-preparado",async(payload)=>{
    const {code}=payload;
    console.log(code)
    const {id,mode,user,cant}=await getModeToOrder(code);
    const orderPrepared={
      id,code,mode,cant
    }
    console.log(orderPrepared);
    socket.to(user).emit("mesero-pedido-preparado",orderPrepared);
  })
};

module.exports={
    socketController
}
