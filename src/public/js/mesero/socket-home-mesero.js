const socket=io();

socket.on('connect',()=>{
    console.log('conectado')
})

socket.on('mesero-recibe-pedido',(infoOrder)=>{
    const {order}=infoOrder;
    if(order.id_mod=="2"){
        const {mesas}=infoOrder;
        let indiceMesa;
        for (const mesa of panelMesas.children) {
            indiceMesa=mesas.indexOf(mesa.innerText);
            if(indiceMesa!==-1){
                mesa.classList.remove("mesa-disponible")
                mesa.classList.add("mesa-ocupada")
                mesa.innerHTML=`<a href="/comanda?cod=${order.cod_ped}">${mesas[indiceMesa]}</a>`
            }
        }
    }
})