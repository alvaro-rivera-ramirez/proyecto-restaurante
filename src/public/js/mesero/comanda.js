const socket = io();
const selectCategory = document.querySelector("#selectCategory");
const containerProducts = document.querySelector(".container__carta__products");
const saveOrder = document.querySelector("#btn-save");
const typeOrder = document.querySelector("#modalidad");
let mesas = [];
fetch("/api/category")
  .then((res) => res.json())
  .then((res) => {
    let listHTML = "";
    res.forEach((category) => {
      listHTML += `<option value="${category.id_categoria}">${category.nom_categoria}</option>`;
    });
    selectCategory.innerHTML += listHTML;
  })
  .catch((error) => {
    console.log(error);
  });

if (window.location.search) {
  const params = window.location.search;
  const searchParams = new URLSearchParams(params);
  mesas = searchParams.getAll("mesa");
}

if (!mesas.length > 0) {
  typeOrder.value = 1;
  typeOrder.parentNode.lastElementChild.innerHTML = "Llevar";
  document.querySelector("#contain__mesas").innerHTML = "Vacío";
} else {
  typeOrder.value = 2;
  typeOrder.parentNode.lastElementChild.innerHTML = "Mesa";
  console.log(mesas.join(","));
  document.querySelector("#contain__mesas").innerHTML = mesas.join(",");
}
const fetchProduct = async (idcategory) => {
  const response = await fetch("/api/order/products/" + idcategory);
  if (response.ok) {
    const products = await response.json();
    return products;
  }
  return null;
};

const renderProducts = (products) => {
  let listHTML = "";
  products.forEach((product) => {
    listHTML += `<div class="container__carta__products__content">
        <input type="hidden" value="${product.id_prod}">
        <input type="hidden" value="${product.precio_u_prod}">
        <img src="/public/img/productos/${product.imagen_prod}" alt="producto">
        <h3>${product.nom_prod}</h3>
        <div class="container__carta__products__content-p-button">
            <p>S/. ${product.precio_u_prod}.00</p>
            <button class="add_product">+</button>
        </div></div>`;
  });
  containerProducts.innerHTML = listHTML;
};
selectCategory.addEventListener("change", async (e) => {
  const products = await fetchProduct(e.target.value);
  renderProducts(products);
});

const updatePriceProduct = (contentDetail, tagQuantity) => {
  const price = parseInt(contentDetail.children[2].value);
  const quantity = parseInt(tagQuantity.textContent);
  const tagPrice = contentDetail.children[5];
  const totalPrice = price * quantity;
  tagPrice.innerHTML = `S/. ${
    Number.isInteger(totalPrice) ? totalPrice + ".00" : totalPrice
  }`;
};

const quantityProd = (e) => {
  const op = e.classList.contains("btn-decrement") ? 1 : 2;
  const cantidad = e.parentNode.children[1];

  switch (op) {
    case 1:
      if (cantidad.innerHTML > 1) {
        cantidad.innerHTML--;
        updatePriceProduct(e.parentNode.parentNode, cantidad);
      } else {
        cantidad.disabled = true;
      }
      break;
    case 2:
      cantidad.innerHTML++;
      updatePriceProduct(e.parentNode.parentNode, cantidad);
      break;
  }
};

const deleteDetail = (e) => {
  const detail = e.parentNode;
  detail.remove();
};
const addDetail = (idprod, nomprod, price) => {
  const priceLabel = Number.isInteger(price) ? price + ".00" : price;
  const containerDetails = document.querySelector(
    ".container__order__details__info"
  );
  containerDetails.innerHTML += `<div class="row d-flex align-items-center box-producto-one">
    <div class="col-1" onclick="deleteDetail(this)">
        <button class="btn-delete">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
    <input type="hidden" value="${idprod}" class="id_products">
    <input type="hidden" value="${price}">
    <div class="col-4">${nomprod}</div>
    <div class="col-3 d-flex justify-content-center align-items-center">
        <button class="btn btn-decrement me-3" onclick="quantityProd(this)">
            <i class="fa-solid fa-angle-left"></i>
        </button>
        <p class="count_products">1</p>
        <button class="btn btn-increment ms-3" onclick="quantityProd(this)">
            <i class="fa-solid fa-angle-right"></i>
        </button>
    </div>
    <div class="col-3">
        S/. ${priceLabel}
        </div>
        <div class="col-md-11 offset-md-1 d-flex mt-2 box-obs ">
        <label>
        Observacion:
        </label>
        <input type="text" class="obs_products">
        </div>
        </div>`;
};
const checkExistProduct = (idprod) => {
  const nodeIds = document.querySelectorAll(".id_products");
  let found = false;
  for (const nodeProducts of nodeIds) {
    if (nodeProducts.value == idprod) {
      const btnInc = nodeProducts.parentNode.querySelector(".btn-increment");
      quantityProd(btnInc);
      found = true;
      break;
    }
  }
  return found;
};

containerProducts.addEventListener("click", (e) => {
  if (e.target.classList == "add_product") {
    const btnAdd = e.target;
    const idprod = btnAdd.parentNode.parentNode.children[0].value;
    if (!checkExistProduct(idprod)) {
      const nomprod = btnAdd.parentNode.parentNode.children[3].textContent;
      const price = btnAdd.parentNode.parentNode.children[1].value;
      addDetail(idprod, nomprod, parseInt(price));
    }
  }
});

saveOrder.onclick = async () => {
  const idproducts = document.querySelectorAll(".id_products");
  const countproducts = document.querySelectorAll(".count_products");
  const obsproducts = document.querySelectorAll(".obs_products");
  let detail = {};
  let details = [];
  let order = {
    mod: typeOrder.value,
    mesas,
  };

  for (let index = 0; index < idproducts.length; index++) {
    console.log(idproducts[index].value);
    detail.id_prod = idproducts[index].value;
    detail.cantidad_det = countproducts[index].textContent;
    detail.descripcion_det = obsproducts[index].value;
    details.push(detail);
    detail = {};
  }
  order.detalle = details;

  try {
    const response = await fetch("/api/order", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      Swal.fire({
        title: "Error",
        text: "Vuelva a intentarlo",
        icon: "error",
        showConfirmButton: false,
        timer: 800,
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    Swal.fire({
      title: "Pedido Registrado",
      icon: "success",
      showConfirmButton: false,
      timer: 800,
    });
    socket.emit("confirmar-pedido", result);
  } catch (error) {
    console.log(error);
  }
};
