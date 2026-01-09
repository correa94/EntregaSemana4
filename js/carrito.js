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
function calcularTotal() {
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

function completarCompra() {
  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const telefonoInput = document.getElementById("telefono");
  const metodoPagoSelect = document.getElementById("metodo-pago");
  const metodoPago = metodoPagoSelect.options[metodoPagoSelect.selectedIndex].text;
  if (
    !nombreInput.value ||
    !emailInput.value ||
    !telefonoInput.value ||
    !metodoPagoSelect.value
  ) {
    Swal.fire({
      title: "Error",
      text: "Por favor complete todos los campos.",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
    return;
  }

  if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
    Swal.fire({
      title: "Error",
      text: "Por favor ingrese un correo electrónico válido.",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
    return;
  }
Swal.fire({
    title: "Resumen de la compra",
    icon: "info",
    html: `
      <div style="text-align:left; font-size:14px; line-height:1.6">
        <p><strong>Nombre:</strong> ${nombre.value}</p>
        <p><strong>Email:</strong> ${email.value}</p>
        <p><strong>Teléfono:</strong> ${telefono.value}</p>
        <p><strong>Método de pago:</strong> ${metodoPago}</p>
        <hr>
        <p style="font-size:13px; color:#666">
          Verifique que los datos sean correctos antes de continuar.
        </p>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Confirmar compra",
    cancelButtonText: "Cancelar",
    focusConfirm: false
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Compra realizada",
        text: "Gracias por su compra."
      });

      } else if (result.isDismissed) {
    Swal.fire({
      icon: "error",
      title: "Compra cancelada",
      text: "La compra fue cancelada",
      confirmButtonText: "Aceptar"

    });
      localStorage.removeItem("cartProducts");
    cartContainer.innerHTML = "";
    const formulario = document.getElementById("formulario-compra");
    formulario.innerHTML = "";
    calcularTotal();
    }
  });
  
}
let botonCompra = document.getElementById("boton-compra");
function mostrarFormulario() {
  botonCompra.remove();
  let formulario = document.getElementById("formulario-compra");
  formulario.innerHTML = `
    <h3>Complete sus datos para finalizar la compra:</h3>
    <input type="text" id="nombre" placeholder="Nombre completo" required>
    <input type="email" id="email" placeholder="Correo electrónico" required>
    <input type="number" id="telefono" placeholder="Número de teléfono" required>
    <select id="metodo-pago" required>
      <option value="" disabled selected>Seleccione método de pago</option>
      <option value="tarjeta">Tarjeta de crédito/débito</option>
      <option value="mercado-pago">Mercado Pago</option>
      </select>
    <button id="finalizar-compra">Finalizar compra</button>
  `;
}

botonCompra.onclick = mostrarFormulario;

const form = document.getElementById("formulario-compra");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  completarCompra();
});
