const selectPisos = document.querySelector("#select-pisos");
const panelMesas = document.querySelector("#tablero-mesa");
const panelMesasModal = document.querySelector(".tablero-mesa-modal");
const btnOpenModal = document.querySelector("#btn-merge");
const btnLlevar = document.querySelector("#btn-llevar");
const btnSaveModal = document.querySelector("#btn-save");
let mesas = [];
fetch("/api/pisos")
  .then((res) => res.json())
  .then((res) => {
    let listHTML = "";
    console.log(res)
    res.forEach((piso) => {
      listHTML += `<option value="${piso.id_piso}">${piso.nom_piso}</option>`;
    });
    selectPisos.innerHTML = listHTML;
  })
  .then(async () => {
    let mesas = await getTableByFloor(selectPisos.firstChild.value);
    console.log(mesas)
    renderTables(mesas,panelMesas);
  })
  .catch((error) => console.log(error));

const getTableByFloor = async (id_piso) => {
  const result = await fetch("/api/table/?piso=" + id_piso);
  if (result.ok) {
    const tables = await result.json();
    return tables;
  }
  return null;
};

const getTableAvailable= async (id_piso) =>{
  const response=await fetch(`/api/table/?piso=${id_piso}&estado=1`);
  if(response.ok){
    const tables=await response.json();
    return tables;
  }
}
const renderTables = (tables,panelMesas) => {
  let listHTML = "";
  tables.forEach((table) => {
    switch (table.id_emesa) {
      case 1:
        listHTML += `<div class="col-mesa mesa-disponible">${table.numero_mesa}</div>`;
        break;
      case 2:
        listHTML += `<div class="col-mesa mesa-ocupada"><a href="/comanda?cod=${table.cod_ped}">${table.numero_mesa}</a></div>`;
        break;
      case 3:
        listHTML += `<div class="col-mesa mesa-inhabilitada">${table.numero_mesa}</div>`;
        break;
    }
  });
  panelMesas.innerHTML = listHTML;
};
selectPisos.addEventListener("change", async (e) => {
  let mesas = await getTableByFloor(e.target.value);
  renderTables(mesas,panelMesas);
});

btnLlevar.addEventListener("click", (e) => {
  window.location.href = "/comanda";
});
panelMesas.addEventListener("click", (e) => {
  const mesaEtiqueta = e.target;
  if (mesaEtiqueta.classList.value==="col-mesa mesa-disponible") {
    window.location.href = "/comanda/?mesa=" + mesaEtiqueta.innerHTML;
  }
});



/* Modal Unir Mesas */
btnOpenModal.addEventListener("click", (e) => {
  const modalMesas = document.querySelector("#modalMergeTable");
  const select= document.querySelector('#select-pisos-modal');
  const panelMesasModal= document.querySelector('#tablero-mesa-modal');
  let modalMerge = new bootstrap.Modal(modalMesas, {
    keyboard: false,
    backdrop: true,
  });
  fetch("/api/pisos")
  .then((res) => res.json())
  .then((res) => {
    let listHTML = "";
    res.forEach((piso) => {
      listHTML += `<option value="${piso.id_piso}">${piso.nom_piso}</option>`;
    });
    select.innerHTML = listHTML;
  })
  .then(async () => {
    let mesas = await getTableAvailable(selectPisos.firstChild.value);
    renderTables(mesas,panelMesasModal);
    modalMerge.show();
  })
  .catch((error) => console.log(error));

  select.addEventListener("change", async (e) => {
    let mesas = await getTableAvailable(e.target.value);
    renderTables(mesas,panelMesasModal);
  });
});

panelMesasModal.addEventListener("click", (e) => {
  const mesaEtiqueta = e.target;
  if (mesaEtiqueta.classList.contains("col-mesa")) {
    mesaEtiqueta.classList.toggle("selected");
    if (mesaEtiqueta.classList.contains("selected")) {
      mesas.push(mesaEtiqueta.innerHTML);
    } else {
      let pos = mesas.indexOf(mesaEtiqueta.innerHTML);
      mesas.splice(pos, 1);
    }
  }
});

btnSaveModal.addEventListener("click", () => {
  let baseUrl = "/comanda";
  let paramName = "mesa=";

  let arrayAsString = "?" + paramName + mesas.join("&" + paramName);
  let urlWithParams = baseUrl + arrayAsString;

  window.location.href = urlWithParams;
});
