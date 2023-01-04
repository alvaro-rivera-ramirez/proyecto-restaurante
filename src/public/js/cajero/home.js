const selectPisos = document.querySelector("#select-pisos");
const panelMesas = document.querySelector("#mesas__panel");

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
    renderTables(mesas, panelMesas);
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

const getTableAvailable = async (id_piso) =>{
  const response=await fetch(`/api/table/?piso=${id_piso}&estado=2`);
  if (response.ok) {
    const tables = await response.json();
    return tables;
  }
}

const renderTables = (tables, panelMesas) => {
  let listHTML = "";
  tables.forEach((table) => {
    switch (table.id_emesa) {
      case 1:
        listHTML += `<div class="col-mesa mesa-disponible">${table.numero_mesa}</div>`;
        break;
      case 2:
        listHTML += `<div class="col-mesa mesa-ocupada">${table.numero_mesa}</div>`;
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
  renderTables(mesas, panelMesas);
});

panelMesas.addEventListener("click", (e) => {
  const mesaEtiqueta = e.target;
  if (mesaEtiqueta.classList.value == "col-mesa mesa-ocupada") {
    window.location.href = "/realizar-pago/?mesa=" + mesaEtiqueta.innerHTML;
  }
});