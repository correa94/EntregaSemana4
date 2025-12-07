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
            <p><strong>Cantidad:</strong> <button onclick ="restarCantidad(${producto.id})"> - </button> ${producto.cantidad} <button onclick ="sumarCantidad(${producto.id})"> + </button></p>


        </div>
    </div>`;
    
    cartContainer.appendChild(card);
  });
}

renderCarrito(cartStorage);
function calcularTotal () {
  let totalDiv = document.getElementById("totales");
let totalAmount = 0;
let cartStorage = JSON.parse(localStorage.getItem("cartProducts")) || [];
cartStorage.forEach((producto) => {
  totalAmount += producto.precio * producto.cantidad;
});
totalDiv.innerHTML = `<h3>Total a pagar: $${totalAmount}</h3>`;
}
calcularTotal();

function sumarCantidad(productoId) {
  let cartStorage = JSON.parse(localStorage.getItem("cartProducts"));
  const producto = cartStorage.find((prod) => prod.id === productoId);
  producto.cantidad += 1;
  localStorage.setItem("cartProducts", JSON.stringify(cartStorage));
  cartContainer.innerHTML = "";
  renderCarrito(cartStorage);
  calcularTotal();
  Toastify({
  text: "Sumaste un producto",
  close: true,
  duration: 3000,
  gravity: "top",
  position: "right",
}).showToast();
}

function restarCantidad(productoId) {
  let cartStorage = JSON.parse(localStorage.getItem("cartProducts"));
  const producto = cartStorage.find((prod) => prod.id === productoId);
  if (producto.cantidad > 1) {
    producto.cantidad -= 1;
  } else {
    cartStorage = cartStorage.filter((prod) => prod.id !== productoId);
  }
  localStorage.setItem("cartProducts", JSON.stringify(cartStorage));
  cartContainer.innerHTML = "";
  renderCarrito(cartStorage);
  calcularTotal();
  Toastify({
  text: "Restaste un producto",
  close: true,
  duration: 3000,
  gravity: "top",
  position: "right",
  style: {
    background: "red",
  },
}).showToast();
}

function completarCompra(){
  Swal.fire({
    title: '¡Compra realizada con exito!',
    text: "Gracias por su compra.",
    icon: 'success',
    confirmButtonText: 'Cerrar'
  }).then(() => {
    localStorage.removeItem("cartProducts");
    cartContainer.innerHTML = "";
    calcularTotal();
  });
}

