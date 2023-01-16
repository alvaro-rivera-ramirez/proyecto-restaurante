document.addEventListener("DOMContentLoaded", async () => {
  const socket = io();
  const addDetail = (idprod, nomprod, countProd, subtotal, observation) => {
    const containerDetails = document.querySelector(
      ".container__order__details__info"
    );
    containerDetails.innerHTML += `<div class="row d-flex align-items-center">
    <input type="hidden" value="${idprod}" class="id_products"">
    <div class="col-4">${nomprod}</div>
    <div class="col-4 d-flex justify-content-center align-items-center">
    <button class="btn btn-decrement me-3" onclick="quantityProd(this)">
            <i class="fa-solid fa-angle-left"></i>
        </button>
        <p class="count_products">${countProd}</p>
        <button class="btn btn-increment ms-3" onclick="quantityProd(this)">
        <i class="fa-solid fa-angle-right"></i>
        </button>
        </div>
        <div class="col-3">
        ${subtotal.toLocaleString("es-PE", {
          style: "currency",
          currency: "PEN",
        })}
        </div>
        <div class="col-md-11 offset-md-1 d-flex mt-2">
        <label>
        Observacion:
        </label>
        <input type="text" class="obs_products" value="${observation}" disabled readonly>
        </div>
        </div>`;
  };

  const renderInfoOrder = (orderInfo) => {
    const containerOrderInfo = document.querySelector(
      ".container__order__info"
    );
    const totalOrder = document.querySelector("#priceTotalOrder");

    containerOrderInfo.innerHTML += `
      <div class="container__order__info_row">
      <h4>Mesa</h4>
      <p id="contain__mesas">${(!orderInfo.mesas)?'Vacío':orderInfo.mesas}</p>
      </div>
      <div class="container__order__info_row">
      <h4>N° Orden</h4>
      <p>${orderInfo.id_ped.toString().padStart(6, 0)}</p>
      </div>
      <div class="container__order__info_row">
      <h4>Cliente</h4>
      <p id="nameClient"></p>
      </div>
      <div class="container__order__info_row">
      <h4>Mesero</h4>
      <p>${orderInfo.nom_usu}</p>
      </div>
      <div class="container__order__info_row">
      <h4>Para</h4>
      <p>${orderInfo.id_mod == 2 ? "Mesa" : "Llevar"}</p>
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
    } catch (error) {
      console.log(error);
    }
  };

  const searchClient = async () => {
    try {
      const dni = document.querySelector("#input-dni-search").value;
      const response = await fetch("/api/client/" + dni);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const nameClient = document.querySelector("#nameClient");
      nameClient.innerText = result.nom_cli;
      console.log(result);
      idClient = result.id_cli;
    } catch (error) {
      console.log(error);
    }
  };

  const createClient = async (data) => {
    try {
      const nombre = data.nombre;
      const dni = data.dni;

      const client = {
        nombre,
        dni,
      };
      const response = await fetch("/api/client/", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });

      if (!response.ok) {
        Swal.fire({
          title: "Error",
          text: "Vuelva a intentarlo",
          icon: "error",
          showConfirmButton: false,
          timer: 800,
        });
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
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const openModalClient = () => {
    formClient.reset();
    let modalNew = new bootstrap.Modal("#modalNewClient", {
      keyboard: false,
      backdrop: true,
    });
    modalNew.show();

    const btnSave = document.querySelector("#btnSaveClient");
    btnSave.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        const form = new FormData(formClient);
        let data = {};
        form.forEach((value, key) => (data[key] = value));
        const infoClient = await createClient(data);
        modalNew.hide();
        const nameClient = document.querySelector("#nameClient");
        nameClient.innerText = data.nombre;
        idClient = infoClient.id;
      } catch (error) {
        console.log(error);
      }
    });
  };

  const sendPreCuenta = async() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const cod = searchParams.get("cod");
      console.log(idClient)
      const response=await fetch(`/api/order/${cod}`,{
        method:"PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stateOrder:3,
          idClient
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
        socket.emit("pedido-precuenta",{code:cod})
        window.location='/home';
      });
      console.log(result);
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        showConfirmButton: false,
        timer: 800,
      });
      console.log(error);
    }
  };

  const btnSearchClient = document.querySelector("#btn-searchClient");
  const btnAddClient = document.querySelector("#btn-addClient");
  const btnPreOrder = document.querySelector("#btn-preCuenta");
  const backOrder = document.querySelector("#btn-cancel");
  let idClient;
  await fetchOrder();

  btnSearchClient.onclick = searchClient;
  btnAddClient.onclick = openModalClient;
  btnPreOrder.onclick = sendPreCuenta;
  backOrder.onclick=()=>{
    window.location="/home";
  }
});
