let productos = [];
fetch("./data/productos.json")
  .then((response) => response.json())
  .then((data) => {
    renderProductos(data);
    productos = data;
  });

let cartProducts = [];
let productsContainer = document.getElementById("products-container");

function renderProductos(productsArray) {
  productsArray.forEach((producto) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="producto-card">
        <img src="${producto.img}" alt="${producto.nombre}" class="producto-imagen">
        <div class="producto-info">
            <h3>${producto.nombre}</h3>
            <h4>Precio: $${producto.precio}</h4>
            <h4>Marca: ${producto.marca}</h4>
            <h6>${producto.descripcion}</h6>
                    <button class="productoAgregar" id="${producto.id}">Agregar</button>

        </div>
    </div>`;
    productsContainer.appendChild(card);
  });
  agregarAlCarrito();
}

function agregarAlCarrito() {
  const addButton = document.querySelectorAll(".productoAgregar");

  addButton.forEach((button) => {
    button.onclick = (e) => {
      const productId = e.currentTarget.id;
      const selectedProduct = productos.find(
        (producto) => producto.id == productId
      );

      let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

      const existingProduct = cartProducts.find(
        (prod) => prod.id == selectedProduct.id
      );

      if (existingProduct) {
        existingProduct.cantidad = (existingProduct.cantidad || 1) + 1;
      } else {
        selectedProduct.cantidad = 1;
        cartProducts.push(selectedProduct);
      }
      Toastify({
        text: "Sumaste " + selectedProduct.nombre + " al carrito",
        close: true,
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();

      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    };
  });
}
