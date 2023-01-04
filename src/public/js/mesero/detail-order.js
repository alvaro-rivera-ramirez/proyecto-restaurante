const addDetail = (idprod, nomprod, countProd, subtotal, observation) => {
  const containerDetails = document.querySelector(
    ".container__order__details__info"
  );
  containerDetails.innerHTML += `<div class="row d-flex align-items-center">
    <input type="hidden" value="${idprod}" class="id_products"">
    <div class="col-md-4">${nomprod}</div>
    <div class="col-md-4 d-flex justify-content-center align-items-center">
        <button class="btn btn-decrement me-3" onclick="quantityProd(this)">
            <i class="fa-solid fa-angle-left"></i>
        </button>
        <p class="count_products">${countProd}</p>
        <button class="btn btn-increment ms-3" onclick="quantityProd(this)">
            <i class="fa-solid fa-angle-right"></i>
        </button>
    </div>
    <div class="col-md-3">
        ${subtotal.toLocaleString("es-PE", {
          style: "currency",
          currency: "PEN",
        })}
    </div>
    <div class="col-md-11 offset-md-1 d-flex mt-2">
        <label>
            Observacion:
        </label>
        <input type="text" class="obs_products" value="${observation}" disabel readonly>
    </div>
</div>`;
};

const renderInfoOrder = (orderInfo, tables) => {
  console.log(orderInfo);
  const containerOrderInfo = document.querySelector(".container__order__info");
  const totalOrder = document.querySelector("#priceTotalOrder");
  let numMesas = [];
  for (const table of tables) {
    numMesas.push(table.numero_mesa);
  }
  containerOrderInfo.innerHTML += `
        <div class="container__order__info_row">
            <h4>Mesa</h4>
            <p id="contain__mesas">${numMesas.join(",")}</p>
        </div>
        <div class="container__order__info_row">
            <h4>N° Orden</h4>
            <p>${orderInfo.id_ped.toString().padStart(6, 0)}</p>
        </div>
        <div class="container__order__info_row">
            <h4>Cliente</h4>
            <p></p>
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
    const { detailsOrder, order, tables } = result;
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
    renderInfoOrder(order, tables);
  } catch (error) {
    console.log(error);
  }
};

const searchClient = async () => {
  try {
    console.log(1)
    const dni=document.querySelector('#input-dni').value;
    const response = await fetch("/api/client/" + dni);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result=await response.json();
    console.log(result)
  } catch (error) {
    console.log(error)
  }
};

const createClient=async()=>{
    try {
        const nombre=document.querySelector('#input-nombre').value;
        const dni=document.querySelector('#input-dni').value;
    
        const client={
            nombre,dni
        }
        const response = await fetch("/api/client/",{
            method:"POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(client)
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result=await response.json();
        console.log(result)
      } catch (error) {
        console.log(error)
      }
}
document.addEventListener("DOMContentLoaded", async () => {
    const btnSearchClient=document.querySelector('#btn-searchClient');
    const btnAddClient=document.querySelector('#btn-addClient');
    await fetchOrder();

    btnSearchClient.onclick=searchClient;
    btnAddClient.onclick=async()=>{
        document.querySelector('#input-nombre').disabled=false;
        await createClient();
    }
});

