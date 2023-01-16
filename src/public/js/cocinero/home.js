document.addEventListener("DOMContentLoaded", async () => {
  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/order");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} message: ${result.error}`
        );
      }
      const { details } = result;
      console.log(result);
      for (const order of result.order) {
        let detailsOfOneOrder = filterById(details, order.id_ped);
        renderOrders(order, detailsOfOneOrder);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterById = (arrDetails, id) => {
    return arrDetails.filter((detail) => {
      return detail.id_ped == id;
    });
  };
  const renderOrders = (order, detail) => {
    let orderHTML = `<div class="box-orden ms-3">
    <h5 class="mb-2">N° Orden: ${order.id_ped.toString().padStart(6, 0)}</h5>
    <input type="hidden" value="${order.cod_ped}" class="codeOrder">
    <div class="d-flex justify-content">
        <p>Mesa: ${!order.mesas ? "Vacío" : order.mesas}</p>
        <p class="ms-4">Mozo: ${order.nom_usu}</p>
    </div><div class="box-detalle mb-2">
    <p class="mb-2">Orden:</p>`;

    detail.forEach((element) => {
      orderHTML += `<div class="d-flex">
                    <p class="me-2 ms-2 c-red">${element.cantidad_det}</p>
                    <p>${element.nom_prod}</p>
                    </div>
                    <p class="text-obs">Observación: ${element.descripcion_det}</p>`;
    });

    orderHTML += `</div><div class="box-btn">
        <button class="btn btn-cancelar me-2">Cancelar</button>
        <button class="btn btn-realizar">Realizado</button>
    </div></div>`;
    listaPedidos.innerHTML += orderHTML;
  };

  const sendOrderReady = async (codeOrder, codeState) => {
    try {
      const cod = codeOrder;
      const response = await fetch(`/api/order/${cod}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stateOrder: codeState,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      Swal.fire({
        title: result.msg,
        icon: "success",
        showConfirmButton: false,
        timer: 800,
      }).then(()=>{
        if(codeState=="2"){
          socket.emit("pedido-preparado",{code:codeOrder})
        }else if(codeState=="5"){
          socket.emit("liberar-mesa",{mesas:result.numMesas})
        }
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSummaryOrders = async() => {
    try {
      const response=await fetch("/api/cocina/summary");
      const result=await response.json();
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status} message: ${result.error}`);
      }
      console.log(result)
      document.querySelector('#countOrdersWait').innerText=result.ordersWait;
      document.querySelector('#countOrdersPrepared').innerText=result.ordersPrepared;
    } catch (error) {
      console.log(error)
    }
  };

  const listaPedidos = document.querySelector("#tableroPedidos");
  await fetchOrders();

  listaPedidos.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-realizar")) {
      Swal.fire({
        title: "¿Estas seguro que el pedido esta listo?",
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const tagButton = e.target;
          const tagOrder = tagButton.parentNode.parentNode;
          const codeOrder = tagOrder.querySelector(".codeOrder").value;
          await sendOrderReady(codeOrder, 2);
          tagOrder.remove(); //Elimina el pedido de la lista del cocinero
          await fetchOrdersPrepared();
          await fetchSummaryOrders();
        }
      });
    }
    
    if (e.target.classList.contains("btn-cancelar")) {
      Swal.fire({
        title: "¿Estas seguro de cancelar el pedido?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Sí",
        denyButtonText: `No`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const tagButton = e.target;
          const tagOrder = tagButton.parentNode.parentNode;
          const codeOrder = tagOrder.querySelector(".codeOrder").value;
          await sendOrderReady(codeOrder, 5);
          tagOrder.remove();
          await fetchSummaryOrders({code:codeOrder});
        }
      });
    }
  });

  const fetchOrdersPrepared=async()=>{
    try {
      const response = await fetch("/api/cocina");
      const result=await response.json();
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status} message: ${result.error}`);
      }
      let listHTML = "";
      result.forEach((cocina) => {
        let nropedido = cocina.id_ped.toString().padStart(6, 0);
        listHTML += `<button type="button" class="btn i" value="${cocina.cod_ped}">${nropedido}</button>`;
      });
      containerOrders.innerHTML = listHTML;
    } catch (error) {
      console.log(error);
    }
  }
  
  const renderInfoModal=async(order,details)=>{
    try {
      const titleModal=document.querySelector('.modal-title');
      const bodyModal=document.querySelector('.modal-body');
      const nodeDetails=document.createElement('div');
      titleModal.innerText=`Orden ${order.id_ped.toString().padStart(6, 0)}`
      nodeDetails.className="m-orden";

      bodyModal.innerHTML=`<p>Mesa: ${(!order.mesas)?'Vacío':order.mesas}</p>
      <p>Mozo: ${order.nom_usu}</p>
      <p class="mb-1">Orden:</p>`;
      let listDetail='';
      details.forEach(detail=>{
        listDetail+=`<div class="m-orden-detalle">
            <p>${detail.nom_prod} (${detail.cantidad_det})</p>
            <p class="m-obs">Observación: ${detail.descripcion_det}</p>
          </div>`;
      })
      nodeDetails.innerHTML=listDetail;
      bodyModal.appendChild(nodeDetails);
    } catch (error) {
      console.log(error)
    }
  }
  const fetchOneOrder = async (cod) => {
    try {
      const response = await fetch(`/api/order/${cod}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const { detailsOrder, order} = result;
      console.log(result);
      renderInfoModal(order,detailsOrder)
      const modal = new bootstrap.Modal('#modalOrder', {
        keyboard: false
      })
      modal.show();
    } catch (error) {
      console.log(error);
    }
  };

  const containerOrders = document.querySelector("#box-realizados");
  await fetchOrdersPrepared();
  
  const socket = io();
  
  containerOrders.addEventListener('click',async(e)=>{
    try {
      const tag=e.target;
      if(tag.classList=="btn i"){
        const codeOrder=tag.value;
        await fetchOneOrder(codeOrder);
      }
      
    } catch (error) {
      console.log(error)
    }
  })
  socket.on("connect", () => {
    console.log("conectado");
  });

  socket.on("cocinero-recibe-pedido", (infoOrder) => {
    const { order,detail,countOrderWait} = infoOrder;
    console.log(infoOrder);
    order.mesas=infoOrder.mesas;
    renderOrders(order,detail);
    document.querySelector('#countOrdersWait').innerText=countOrderWait;
  });
});
