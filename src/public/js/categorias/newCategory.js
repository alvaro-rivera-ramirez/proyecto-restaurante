const newCategory = async () => {
  let modalNew = new bootstrap.Modal(document.getElementById("modalCategory"), {
    keyboard: false,
    backdrop: true,
  });
  document.querySelector(".modal-title").innerHTML = "Nueva Categoria";
  modalNew.show();
  const btnSave = document.getElementById("btnSave");

  btnSave.addEventListener("click", async (e) => {
    e.preventDefault();
    const form = new FormData(formCategory);
    let data = {};
    form.forEach((value, key) => (data[key] = value));

    fetch("/api/category", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg) {
          Swal.fire({
            title: "Categoria creada",
            icon: "success",
            showConfirmButton: false,
            timer: 800,
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Campos Incorrectos",
            icon: "error",
            showConfirmButton: false,
            timer: 1000,
          });
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch((error) => console.log(error));
  });
};

document.getElementById("btnAdd").addEventListener("click", async () => {
  await newCategory();
});
