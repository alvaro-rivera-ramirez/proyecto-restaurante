const socket = io();

socket.on("connect", () => {
  console.log("conectado");
});

socket.on("recibe-pedido-mesa", (infoOrder) => {
  const { order } = infoOrder;
  const { mesas } = infoOrder;
  const panelMesas = document.querySelector("#tablero-mesa");
  let indiceMesa;
  for (const mesa of panelMesas.children) {
    indiceMesa = mesas.indexOf(mesa.innerText);
    if (indiceMesa !== -1) {
      mesa.classList.remove("mesa-disponible");
      mesa.classList.add("mesa-ocupada");
      mesa.innerHTML = `<a href="/comanda?cod=${order.cod_ped}">${mesas[indiceMesa]}</a>`;
    }
  }
});


socket.on("mesas-liberadas", (infoOrder) => {
  const { mesas} = infoOrder;
  const arrayMesas = mesas.split(", ");
  const panelMesas = document.querySelector("#tablero-mesa");
  let indiceMesa;
  for (const mesa of panelMesas.children) {
    indiceMesa = arrayMesas.indexOf(mesa.innerText);
    if (indiceMesa !== -1) {
      mesa.classList.remove("mesa-ocupada");
      mesa.classList.add("mesa-disponible");
      mesa.innerHTML = `${arrayMesas[indiceMesa]}`;
    }
  }
});

socket.on("mesero-pedido-preparado", (infoOrder) => {
  const { id, code, mode, cant } = infoOrder;
  let tagTitle;
  if (mode == "1") {
    tagTitle = document.querySelector("#ordersToTakeAway");
    tagTitle.innerHTML = `Listos para llevar (${cant}) <div class="caret"></div>`;
  } else {
    tagTitle = document.querySelector("#ordersForTable");
    tagTitle.innerHTML = `Listos para la mesa (${cant}) <div class="caret"></div>`;
  }
  const listOrder = tagTitle.parentNode.querySelector(".card-body");
  console.log(listOrder);
  listOrder.innerHTML += `<a class="dropdown-item" href="/comanda?cod=${code}">N° ${id
    .toString()
    .padStart(6, 0)}</a>`;
});