const eliminar = async (e) => {
  const btn = e;

  let fila = btn.parentNode.parentNode;
  let id = fila.children[0].innerHTML;
  Swal.fire({
    title: "¿Está seguro de eliminar?",
    text: "Está a punto de eliminar este registro",
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
            $("#tableCategory").dataTable().fnDestroy();
            listCategory();
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
};
