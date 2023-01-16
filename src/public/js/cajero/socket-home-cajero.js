const socket = io();

socket.on("connect", () => {
  console.log("conectado");
});


socket.on("recibe-pedido-mesa", (infoOrder) => {
  const { order, mesas } = infoOrder;
  const panelMesas = document.querySelector("#mesas__panel");
  let indiceMesa;
  for (const mesa of panelMesas.children) {
    indiceMesa = mesas.indexOf(mesa.innerText);
    if (indiceMesa !== -1) {
      mesa.classList.remove("mesa-disponible");
      mesa.classList.add("mesa-preparada");
      mesa.innerHTML = `<a href="/comanda?cod=${order.cod_ped}">${mesas[indiceMesa]}</a>`;
    }
  }
});

socket.on("mesas-liberadas", (infoOrder) => {
  const { mesas } = infoOrder;
  const arrayMesas = mesas.split(", ");
  const panelMesas = document.querySelector("#mesas__panel");
  let indiceMesa;
  for (const mesa of panelMesas.children) {
    indiceMesa = arrayMesas.indexOf(mesa.innerText);
    if (indiceMesa !== -1) {
      mesa.classList.remove("mesa-preparada");
      mesa.classList.remove("mesa-precuenta");
      mesa.classList.add("mesa-disponible");
      mesa.innerHTML = `${arrayMesas[indiceMesa]}`;
    }
  }
});
socket.on("cajero-pedido-preparado", (infoOrder) => {
  const { id, code, cant } = infoOrder;
  const tagTitle = document.querySelector("#ordersToTakeAway");
  tagTitle.innerHTML = `Listos para llevar (${cant}) <div class="caret"></div>`;
  const listOrder = tagTitle.parentNode.querySelector(".card-body");
  listOrder.innerHTML += `<a class="dropdown-item" href="/comanda?cod=${code}">N° ${id
    .toString()
    .padStart(6, 0)}</a>`;
});

socket.on("cajero-pedido-precuenta", (infoOrder) => {
  const { id, code, cant, mesas } = infoOrder;
  const tagTitle = document.querySelector("#preAccountorders");
  const listOrder = tagTitle.parentNode.querySelector(".card-body");
  listOrder.innerHTML += `<a class="dropdown-item" href="/pago?cod=${code}">N° ${
    id.toString().padStart(6, 0) + (mesas ? " Mesa:" + mesas : "")
  }</a>`;
  tagTitle.innerHTML = `Listos para pagar (${cant}) <div class="caret"></div>`;
  
  if (mesas) {
    const panelMesas = document.querySelector("#mesas__panel");
    let indiceMesa;
    for (const mesa of panelMesas.children) {
      indiceMesa = mesas.indexOf(mesa.innerText);
      if (indiceMesa !== -1) {
        mesa.classList.remove("mesa-preparada");
        mesa.classList.add("mesa-precuenta");
        mesa.innerHTML = `<a href="/pago?cod=${code}">${mesas[indiceMesa]}</a>`;
      }
    }
  }
});
