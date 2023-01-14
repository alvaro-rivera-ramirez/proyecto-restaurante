document.addEventListener("DOMContentLoaded", async () => {
  const selectPisos = document.querySelector("#select-pisos");
  const panelMesas = document.querySelector("#mesas__panel");
  const btnLlevar = document.querySelector("#btn-llevar");
  let mesas = [];
  
  const getTableByFloor = async (id_piso) => {
    const result = await fetch("/api/table/?piso=" + id_piso);
    if (result.ok) {
      const tables = await result.json();
      return tables;
    }
    return null;
  };

  const getPreparedOrders = async () => {
    try {
      const response = await fetch("/api/order");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} message: ${result.error}`
          );
        }
      console.log(result);
      renderOrderToTakeAway(result.takeaway);
      renderOrderForTable(result.fortable);
    } catch (error) {
      console.log(error);
    }
  };

  const renderOrderToTakeAway=(orders)=>{
    const tagTitle=document.querySelector('#ordersToTakeAway');
    const tagOrders=document.querySelector('#collapseOrdersPrepared1');
    const node=document.createElement("div")
    node.className="card card-body";
    let listHTML='';
    orders.forEach((order)=>{
      listHTML+=`<a class="dropdown-item" href="/comanda?cod=${order.cod_ped}">N° ${order.id_ped.toString().padStart(6, 0)}</a>`
    })
    node.innerHTML=listHTML;
    tagOrders.appendChild(node);
    tagTitle.innerHTML=`Listos para llevar (${orders.length}) <div class="caret"></div>`;
  }

  const renderOrderForTable=(orders)=>{
    const tagTitle=document.querySelector('#ordersForTable');
    const tagOrders=document.querySelector('#collapseOrdersPrepared2');
    const node=document.createElement("div")
    node.className="card card-body";
    let listHTML='';
    orders.forEach((order)=>{
      listHTML+=`<a class="dropdown-item" href="/comanda?cod=${order.cod_ped}">N° ${order.id_ped.toString().padStart(6, 0)}</a>`
    })
    node.innerHTML=listHTML;
    tagOrders.appendChild(node);
    tagTitle.innerHTML=`Listos para la mesa (${orders.length}) <div class="caret"></div>`;
  }

  const renderTables = (tables, panelMesas) => {
    let listHTML = "";
    tables.forEach((table) => {
      switch (table.epanel) {
          case 1:
          listHTML += `<div class="col-mesa mesa-disponible">${table.numero_mesa}</div>`;
          break;
          case 2:
            listHTML += `<div class="col-mesa mesa-preparada"><a href="/comanda?cod=${table.cod_ped}">${table.numero_mesa}</a></div>`;
          break;
          case 3:
            listHTML += `<div class="col-mesa mesa-preparada"><a href="/comanda?cod=${table.cod_ped}">${table.numero_mesa}</a></div>`;
          break;
          case 4:
            listHTML += `<div class="col-mesa mesa-precuenta"><a href="/pago?cod=${table.cod_ped}">${table.numero_mesa}</a></div>`;
          break;
          case 5:
          listHTML += `<div class="col-mesa mesa-inhabilitada">${table.numero_mesa}</div>`;
          break;
      }
    });
    panelMesas.innerHTML = listHTML;
  };

  selectPisos.addEventListener("change", async (e) => {
    let mesas = await getTableByFloor(e.target.value);
    renderTables(mesas, panelMesas);
  });
  
  btnLlevar.addEventListener("click", (e) => {
    window.location.href = "/comanda";
  });

  panelMesas.addEventListener("click", (e) => {
    const mesaEtiqueta = e.target;
    if (mesaEtiqueta.classList.value === "col-mesa mesa-disponible") {
      window.location.href = "/comanda/?mesa=" + mesaEtiqueta.innerHTML;
    }
  });

  fetch("/api/pisos")
    .then((res) => res.json())
    .then((res) => {
      let listHTML = "";
      console.log(res);
      res.forEach((piso) => {
        listHTML += `<option value="${piso.id_piso}">${piso.nom_piso}</option>`;
      });
      selectPisos.innerHTML = listHTML;
    })
    .then(async () => {
      let mesas = await getTableByFloor(selectPisos.firstChild.value);
      console.log(mesas);
      renderTables(mesas, panelMesas);
    })
    .catch((error) => console.log(error));
  
  await getPreparedOrders();
});