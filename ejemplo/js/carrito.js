  let cartContainer = document.getElementById("cart-section");
  let cartStorage = localStorage.getItem("cartProducts");
  cartStorage = JSON.parse(cartStorage);
function renderCarrito(cartItems) {
  cartItems.forEach((producto) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="producto-card">
        <img src="${producto.img}" alt="${producto.nombre}" class="producto-imagen">
        <div class="producto-info">
            <h3>${producto.nombre}</h3>
            <h4>Precio: $${producto.precio}</h4>
            <h4>Marca: ${producto.marca}</h4>
            <h6>${producto.descripcion}</h6>
            <p><strong>Cantidad:</strong> ${producto.cantidad}</p>

        </div>
    </div>`;
    cartContainer.appendChild(card);
  });
}

renderCarrito(cartStorage);