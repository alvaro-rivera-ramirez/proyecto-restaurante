const socketController = (socket) => {
  console.log("Cliente conectado", socket.id);
  
  socket.on("confirmar-pedido", (payload) => {

    const orderForWaiter={
      order:payload.order,
      mesas:payload.mesas,
    };

    const orderForCook={
      order:payload.order,
      detalle:payload.detalle
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
};

module.exports={
    socketController
}
