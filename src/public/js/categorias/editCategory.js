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
    await editCategory(id);
  }
});

const editCategory = async (id) => {
  let modalEdit = new bootstrap.Modal(
    document.getElementById("modalCategory"),
    { keyboard: false, backdrop: true }
  );
  document.querySelector(".modal-title").innerHTML = "Editar Categoria";
  modalEdit.show();
  const btnSave = document.getElementById("btnSave");

  fetch(`/api/category/${id}`)
    .then((res) => res.json())
    .then((res) => {
      document.getElementById("nom_categoria").value = res.nom_categoria;
    })
    .catch((err) => console.log(err));

  btnSave.addEventListener("click", async (e) => {
    e.preventDefault();
    const form = new FormData(formCategory);
    let data = {};
    form.forEach((value, key) => (data[key] = value));
    try {
      const response = await fetch("/api/category/" + id, {
        method: "put",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
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
            window.location.reload();
        });
      } else {
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
};
