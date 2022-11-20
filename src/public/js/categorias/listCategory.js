$(document).ready(function () {
  let url = "http://localhost:3000/api/category/";
  $("#tableCategory").DataTable({
    ajax: {
      url: url,
      dataSrc: "",
    },
    responsive: true,
    columns: [
      { data: "id_categoria" },
      { data: "nom_categoria" },
      {
        data: null,
        defaultContent: `<button class='btn btn-warning btnEdit'><i class="fa-solid fa-pen-to-square"></i></button>`,
      },
      {
        data: null,
        defaultContent: `<button class='btn btn-danger btnBorrar' onclick="eliminar(this)"><i class="fa-solid fa-trash"></i></button>`,
      },
    ],
  });
});
