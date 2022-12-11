const listTable=()=>{
  fetch("/api/table")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      renderTable(res);
    })
    .catch((err) => console.log(err));
}

const renderTable =(tables)=>{
  const tableList = document.getElementById("dataTable");
  $(tables).ready(function () {
    $("#tableMesas").DataTable({
      lengthMenu: [[5, 15, 50, 100, 200], [5, 15, 50, 100, 200],],
      language: configTable
    });
  });
  let rows = "";
  tables.forEach((table) => {
    rows += `<tr><td>${table.id_mesa}</td><td>${table.numero_mesa}</td><td>${table.id_piso}</td>`;
    
    switch(table.id_emesa){
      case 1:
        rows+=`<td><span class="badge text-bg-success">Disponible</span></td>`;
        break;
      case 2:
        rows+=`<td><span class="badge text-bg-danger">Ocupado</span></td>`
        break;
      case 3:
        rows+=`<td><span class="badge text-bg-secondary">Deshabilitado</span></td>`
        break;
    }
    rows+=`<td><button class='btn btn-warning btnEdit me-3'><i class="fa-solid fa-pen-to-square"></i></button><button class='btn btn-danger btnBorrar' onclick="eliminar(this)"><i class="fa-solid fa-trash"></i></button></td></tr>`;
  });
  tableList.innerHTML = rows;
}
listTable();