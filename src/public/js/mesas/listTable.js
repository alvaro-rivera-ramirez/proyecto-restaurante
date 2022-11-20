$(document).ready(function () {
    let url = "http://localhost:3000/api/table/";
    //MOSTRAR
    $("#tableMesas").DataTable({
      ajax: {
        url: url,
        dataSrc: "",
      },
      responsive: true,
      columns: [
        { data: "id_mesa" },
        { data: "numero_mesa" },
        { data: "id_piso" },
        { data: "id_emesa" },
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
  