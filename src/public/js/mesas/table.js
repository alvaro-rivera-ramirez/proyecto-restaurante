window.addEventListener('DOMContentLoaded', e => {
  let option = null;
  let id, numero,estado,piso;
  const btnSave = document.querySelector("#btnSave");
  const modalNew = new bootstrap.Modal("#modalTable", {
    keyboard: false,
    backdrop: true,
  });
  let tableMesa = $("#tableMesas").DataTable({
    ajax: function (data, callback) {
      fetch("/api/table")
        .then((res) => res.json())
        .then((res) => {
          callback({ data: res });
        });
    },
    columns: [
      { data: "id_mesa" },
      { data: "numero_mesa" },
      { data: "nom_piso" },
      {
        data: "id_emesa",
        render: function (estado_mesa) {
          switch (estado_mesa) {
            case 1:
              return `<td><span class="badge text-bg-success">Disponible</span></td>`;
              break;
            case 2:
              return `<td><span class="badge text-bg-danger">Ocupado</span></td>`;
              break;
            case 3:
              return `<td><span class="badge text-bg-secondary">Deshabilitado</span></td>`;
              break;
          }
        },
      },
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
    formTable.reset();
    document.querySelector(".modal-title").innerHTML = "Nueva Mesa";
    fetch("/api/pisos")
      .then((res) => res.json())
      .then((res) => {
        let listHTML = "";
        res.forEach((piso) => {
          listHTML += `<option value="${piso.id_piso}">${piso.nom_piso}</option>`;
        });
        selectPisos.innerHTML = listHTML;
      }).catch((error) => console.log(error));
    modalNew.show();
  });

  //Editar o Eliminar
  document.addEventListener("click", async (e) => {
    const getID = (btn) => {
      if (btn.tagName == "I") {
        btn = btn.parentNode;
      }
      let fila = btn.parentNode.parentNode;
      id = fila.children[0].innerText;
      numero = fila.children[1].innerText;
      piso = fila.children[2].innerText;
      estado = fila.children[3].innerText;
    };
    let btn = e.target;
    if (
      btn.classList.contains("btnEdit") ||
      btn.parentNode.classList.contains("btnEdit")
    ) {
      option = "editar";
      getID(btn);
      console.log(id,numero,piso,estado);
      formTable.reset();
      document.querySelector("#numero_mesa").value = numero;
      // document.querySelector("#nom_categoria").value = categoria;
      // document.querySelector("#nom_categoria").value = categoria;
      document.querySelector(".modal-title").innerHTML = "Editar Mesa";
      
      // Se genera el select para los pisos
      fetch("/api/pisos")
      .then((res) => res.json())
      .then((res) => {
        let listHTML = "";
        res.forEach((piso) => {
          listHTML += `<option value="${piso.id_piso}">${piso.nom_piso}</option>`;
        });
        selectPisos.innerHTML = listHTML;
      }).then(()=>{
        for (const option of selectPisos.children) {
          if(option.innerText==piso){
            option.selected=true;
          }
        }
      }).catch((error) => console.log(error));

      // Se genera el select para estados de mesa
      const nodeSelectState=document.createElement('div');
      nodeSelectState.className="mb-3";
      nodeSelectState.innerHTML=`<label for="id_emesa" class="col-form-label">Estado</label>
      <select name="id_emesa" id="selectEstado" class="form-select">
        <option value="1">Disponible</option>
        <option value="2">Ocupado</option>
        <option value="3">Deshabilitado</option>
      </select>`;
      const formBody=document.querySelector('.modal-body');
      formBody.insertBefore(nodeSelectState,null)
      const selectEstadoMesa=document.querySelector('#selectEstado');
      for (const option of selectEstadoMesa.children) {
        if(option.innerText==estado){
          option.selected=true;
        }
      }
      modalNew.show();
    }
    if (
      btn.classList.contains("btnBorrar") ||
      btn.parentNode.classList.contains("btnBorrar")
    ) {
      getID(btn);
      console.log(id,numero,piso,estado);
      Swal.fire({
        title: "Borrar!!",
        text: `¿Estas seguro de eliminar la mesa ${numero}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch("/api/table/" + id, {
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
                tableMesa.ajax.reload(null, false);
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
      const form = new FormData(formTable);
      let data = {};
      form.forEach((value, key) => (data[key] = value));
      console.log(data);
  
      if (option == "crear") {
        try {
          const response = await fetch("/api/table", {
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
              title: "Mesa creada",
              icon: "success",
              showConfirmButton: false,
              timer: 800,
            }).then(() => {
              tableMesa.ajax.reload(null, false);
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
          const response = await fetch("/api/table/" + id, {
            method: "put",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
  
          if (response.ok) {
            Swal.fire({
              title: "Mesa Actualizada",
              icon: "success",
              showConfirmButton: false,
              timer: 800,
            }).then(() => {
              tableMesa.ajax.reload(null, false);
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

  const modalTable = document.getElementById('modalTable')
  modalTable.addEventListener('hidden.bs.modal', (e) => {
    console.log('modal cierra')
    if(option=="editar"){
      const formBody=document.querySelector('.modal-body');
      formBody.lastChild.remove();
    }
    clearErrors();
  });
});