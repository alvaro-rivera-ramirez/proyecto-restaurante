const socketController = (socket) => {
  console.log("Cliente conectado", socket.id);
  socket.on("confirmar-pedido", (payload) => {
    console.log(payload);
    
    /* Objeto Payload
      {
        id:2
        mesas:[ ]
        detalle:[]
        fe
      }
    */
    socket.broadcast.emit("mesas-ocupadas", payload);
  });
};

module.exports={
    socketController
}
