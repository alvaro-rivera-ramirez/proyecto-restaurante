document.addEventListener("click", async (e) => {
  let btn = e.target;
  if (
    btn.classList.contains("btnEdit") ||
    btn.parentNode.classList.contains("btnEdit")
  ) {
    if (btn.tagName == "I") {
      btn = btn.parentNode;
    }
    let fila = btn.parentNode.parentNode;
    let id = fila.children[0].innerHTML;
    console.log(id);
    await editTable(id);
  }
});

const editTable = async (id) => {
  let modalEdit = new bootstrap.Modal(
    document.getElementById("modalTable"),
    { keyboard: false, backdrop: true }
  );
  document.querySelector(".modal-title").innerHTML = "Editar Mesa";
  document.querySelector(".modal-body").innerHTML =`${createModal()}<label for="id_emesa" class="col-form-label">Piso</label>
  <select name="id_emesa" id="id_emesa" class="form-select">
    <option value="1">Disponible</option>
    <option value="2">Ocupado</option>
    <option value="3">Deshabilitado</option>
  </select>`
  const btnSave = document.getElementById("btnSave");
  
  fetch(`/api/table/${id}`)
  .then((res) => res.json())
  .then((res) => {
      let select1=document.querySelector('#id_piso');
      let opcion1=select1.querySelector('option[value="'+res.id_piso+'"]');
      console.log(opcion1)
      opcion1.setAttribute('selected',true);
      let select=document.querySelector('#id_emesa');
      let opcion=select.querySelector('option[value="'+res.id_emesa+'"]');
      opcion.setAttribute('selected',true);
      document.getElementById("numero_mesa").value = res.numero_mesa;
      modalEdit.show();
    })
    .catch((err) => console.log(err));
    
    btnSave.addEventListener("click", async (e) => {
    e.preventDefault();
    const form = new FormData(formTable);
    let data = {};
    form.forEach((value, key) => (data[key] = value));
    try {
      const response = await fetch("/api/table/" + id, {
        method: "put",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log(response.ok);
      // Si el res. status es 200 o 201
      if (response.ok) {
        console.log("ok");
        Swal.fire({
          title: "Categoria Actualizada",
          icon: "success",
          showConfirmButton: false,
          timer: 800,
        }).then(() => {
          modalEdit.hide();
          window.location.reload();
          // $("#tableMesas").dataTable().fnDestroy();
          // listTable()
        });
      } else {
        const res = await response.json();
        Swal.fire({
          title: "Error",
          text: "Campos erróneos",
          icon: "error",
          showConfirmButton: false,
          timer: 1000,
        });
        throw new Error(
          `HTTP error! status: ${response.status} message: ${res.error}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  });
  modalEdit.addEventListener("hidden.bs.modal", (e) => {
    closeModal();
  });
};
