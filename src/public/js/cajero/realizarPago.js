document.addEventListener("DOMContentLoaded", async () => {
    const socket = io();
    var total, mesas, idPed;

    const addDetail = (idprod, nomprod, countProd, subtotal, observation) => {
        const containerDetails = document.querySelector(".container__order__details__info");
        containerDetails.innerHTML += `<div class="row d-flex align-items-center">
        <input type="hidden" value="${idprod}" class="id_products">
        <div class="col-md-6">${nomprod}</div>
        <div class="col-md-3"><p class="count_products">${countProd}</p></div>
        <div class="col-md-3">
            ${subtotal.toLocaleString("es-PE", {
            style: "currency",
            currency: "PEN",
            })}
        </div>
        </div>`;
    };
  
    const renderInfoOrder = (orderInfo) => {
        const containerOrderInfo = document.querySelector(".container__order__info");
        const totalOrder = document.querySelector("#priceTotalOrder");
  
        containerOrderInfo.innerHTML += `
        <div class="container__order__info_row">
            <h4 class="fw-bold me-1 mb-3">N° Orden:</h4>
            <p class="fw-bold mb-3">${orderInfo.id_ped.toString().padStart(6, 0)}</p>
        </div>
        <div class="d-flex">
        <div class="container__order__info_row">
            <h4 class="me-1">Cliente:</h4>
            <p id="nameClient">${orderInfo.nom_cli ? orderInfo.nom_cli : " "}</p>
        </div>
        <div class="container__order__info_row ms-4">
            <h4 class="me-1">N° Mesa:</h4>
            <p id="contain__mesas">${(!orderInfo.mesas)?'Vacío':orderInfo.mesas}</p>
        </div>
        </div>
        <div class="d-flex">
        <div class="container__order__info_row">
            <h4 class="me-1">Atendido(a) por:</h4>
            <p>${orderInfo.nom_usu}</p>
        </div>
        <div class="container__order__info_row ms-4">
            <h4 class="me-1">Para:</h4>
            <p>${orderInfo.id_mod == 2 ? "Mesa" : "Llevar"}</p>
        </div>
        </div>`;
        totalOrder.innerHTML = `${orderInfo.total.toLocaleString("es-PE", {
            style: "currency",
            currency: "PEN",
        })}`;
    };

    const fetchOrder = async () => {
        const params = window.location.search;
        const searchParams = new URLSearchParams(params);
        const cod = searchParams.get("cod");
        try {
            const response = await fetch(`/api/order/${cod}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            const { detailsOrder, order} = result;
            console.log(result);
            detailsOrder.forEach((detail) => {
                addDetail(
                    detail.id_prod,
                    detail.nom_prod,
                    detail.cantidad_det,
                    detail.subtotal,
                    detail.descripcion_det
                );
            });
            renderInfoOrder(order);
            idPed = order.id_ped;
            total = order.total;
            mesas = order.mesas;
        } catch (error) {
            console.log(error);
        }
    };
    
    const sendPago = async() => {
        let medioPago;
        let entrada_medioPago = (document.getElementById('container__pay-method')).querySelectorAll('input');
        if ( entrada_medioPago[0].checked ) { medioPago = entrada_medioPago[0].value; } 
        else if ( entrada_medioPago[1].checked ) { medioPago = entrada_medioPago[1].value; }
        else { medioPago = entrada_medioPago[0].value; }

        try {
            const searchParams = new URLSearchParams(window.location.search);
            const cod = searchParams.get("cod");
            const response=await fetch(`/api/order/${cod}`,{
                method:"PATCH",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    stateOrder: 4,
                    idPed: idPed,
                    mesas: mesas,
                    medioPago: medioPago,
                    totalPago: total
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
                socket.emit("liberar-mesa",{mesas:result.numMesas})
                window.location='/home';
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };
    
    const btnPago = document.querySelector("#btn-pago");
    await fetchOrder();
    
    btnPago.onclick = sendPago;
});