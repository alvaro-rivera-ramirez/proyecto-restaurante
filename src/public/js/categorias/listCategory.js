const listCategory = () => {
  fetch("/api/category")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      renderCategory(res);
    })
    .catch((err) => console.log(err));
};

const renderCategory = (categories) => {
  const tableList = document.getElementById("dataCategory");
  $(document).ready(function () {
    $("#tableCategory").DataTable({
      lengthMenu: [[5, 15, 50, 100, 200], [5, 15, 50, 100, 200],],
      language: configTable
    });
  });
  let rows = "";

  categories.forEach((category) => {
    rows += `<tr><td>${category.id_categoria}</td><td>${category.nom_categoria}</td><td><button class='btn btn-warning btnEdit me-3'><i class="fa-solid fa-pen-to-square"></i></button><button class='btn btn-danger btnBorrar' onclick="eliminar(this)"><i class="fa-solid fa-trash"></i></button></td></tr>`;
  });
  tableList.innerHTML = rows;
};

listCategory()