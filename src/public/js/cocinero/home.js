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

  const sendOrderReady = async (codeOrder,codeState) => {
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
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder=()=>{

  }

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
          await sendOrderReady(codeOrder,2);
        }
      });
    }

    if(e.target.classList.contains("btn-cancelar")){
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
          await sendOrderReady(codeOrder,5);
        }
      });
    }
  });

  const Ordenes = document.querySelector("#box-realizados");
   const Modal = document.querySelector(".modal");

    fetch("/api/cocina")
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        let listHTML = "";
        res.forEach((cocina) => {
            let nropedido=cocina.id_ped.toString().padStart(6, 0);
            listHTML += `<button type="button" class="btn i"  data-bs-toggle="modal" data-bs-target="#exampleModal" value="${cocina.id_ped}">${nropedido}</button>`;              
        });
        Ordenes.innerHTML = listHTML;
    }).catch((error) => console.log(error));
    const btnOpenModal = document.querySelectorAll(".i");
    
    console.log(btnOpenModal);
});
