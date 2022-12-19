$(document).ready(() => {
  let option = null;
  let id, categoria;
  const btnSave = document.querySelector("#btnSave");
  let modalNew = new bootstrap.Modal("#modalCategory", {
    keyboard: false,
    backdrop: true,
  });
  let tableCategory = $("#tableCategory").DataTable({
    ajax: function (data, callback) {
      fetch("/api/category")
        .then((res) => res.json())
        .then((res) => {
          callback({ data: res });
        });
    },
    columns: [
      { data: "id_categoria" },
      { data: "nom_categoria" },
      {
        defaultContent: `<button class='btn btn-warning btnEdit me-3'><i class="fa-solid fa-pen-to-square"></i></button><button class='btn btn-danger btnBorrar'><i class="fa-solid fa-trash"></i></button>`,
      },
    ],
    lengthMenu: [
      [5, 15, 50, 100, 200],
      [5, 15, 50, 100, 200],
    ],
    language: configTable,
  });

  //Crear
  document.getElementById("btnAdd").addEventListener("click", async () => {
    option = "crear";
    formCategory.reset();
    document.querySelector(".modal-title").innerHTML = "Nueva Categoría";
    modalNew.show();
  });

  //Editar o Eliminar
  document.addEventListener("click", async (e) => {
    const getID=(btn)=>{
      if (btn.tagName == "I") {
        btn = btn.parentNode;
      }
      let fila = btn.parentNode.parentNode;
      id = fila.children[0].innerHTML;
      categoria = fila.children[1].innerHTML;
    }
    let btn = e.target;
    if (
      btn.classList.contains("btnEdit") ||
      btn.parentNode.classList.contains("btnEdit")
    ) {
      option = "editar";
      getID(btn);
      console.log(id);
      formCategory.reset();
      document.querySelector("#nom_categoria").value = categoria;
      document.querySelector(".modal-title").innerHTML = "Editar Categoría";
      modalNew.show();
    }
    if (
      btn.classList.contains("btnBorrar") ||
      btn.parentNode.classList.contains("btnBorrar")
    ) {
      getID(btn);
      Swal.fire({
        title: "Borrar!!",
        text: `¿Estas seguro de eliminar la categoría ${categoria}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch("/api/category/" + id, {
              method: "delete",
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (response.ok) {
              Swal.fire({
                title: "Eliminado!",
                icon: "success",
                showConfirmButton: false,
                timer: 800,
              }).then(() => {
                tableCategory.ajax.reload(null, false);
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "No se pudo eliminar el registro",
                icon: "error",
                showConfirmButton: false,
                timer: 800,
              });
              const res = await response.json();
              throw new Error(
                `HTTP error! status: ${response.status} message: ${res.error}`
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  });
  
  // Guardar cambios para crear o editar
  btnSave.addEventListener("click", async (e) => {
    e.preventDefault();
    if(validateForm()){
      const form = new FormData(formCategory);
      let data = {};
      form.forEach((value, key) => (data[key] = value));
      console.log(data);
  
      if (option == "crear") {
        try {
          const response = await fetch("/api/category", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (response.ok) {
            const result = await response.json();
            Swal.fire({
              title: "Categoria creada",
              icon: "success",
              showConfirmButton: false,
              timer: 800,
            }).then(() => {
              tableCategory.ajax.reload(null, false);
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Verifique los campos",
              icon: "error",
              showConfirmButton: false,
              timer: 1000,
            });
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (option == "editar") {
        console.log(id);
        try {
          const response = await fetch("/api/category/" + id, {
            method: "put",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          if (response.ok) {
            Swal.fire({
              title: "Categoria Actualizada",
              icon: "success",
              showConfirmButton: false,
              timer: 800,
            }).then(() => {
              tableCategory.ajax.reload(null, false);
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Verifique los campos",
              icon: "error",
              showConfirmButton: false,
              timer: 1000,
            });
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.log(error);
        }
      }
      modalNew.hide();
    }
  });
  const modalCategory = document.getElementById('modalCategory')
  modalCategory.addEventListener('hidden.bs.modal', (e) => {
    clearErrors();
  });
});
