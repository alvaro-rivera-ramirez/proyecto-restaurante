const socket=io();

socket.on('connect',()=>{
    console.log('conectado')
})

socket.on('mesero-recibe-pedido',(infoOrder)=>{
    const {order}=infoOrder;
    if(order.id_mod=="2"){
        const {mesas}=infoOrder;
        const panelMesas = document.querySelector("#tablero-mesa");
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

socket.on("mesero-pedido-preparado",(infoOrder)=>{
    const {id,code,mode,cant}=infoOrder;
    let tagTitle;
    if(mode=="1"){
        tagTitle=document.querySelector('#ordersToTakeAway');
    }else{
        tagTitle=document.querySelector('#ordersForTable');
    }
    const listOrder=tagTitle.parentNode.querySelector('.card-body');
    console.log(listOrder);
    listOrder.innerHTML+=`<a class="dropdown-item" href="/comanda?cod=${code}">N° ${id.toString().padStart(6, 0)}</a>`
    tagTitle.innerHTML=`Listos para la mesa (${cant}) <div class="caret"></div>`;
})