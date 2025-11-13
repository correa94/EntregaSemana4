const productos = [
  {
    id: 1,
    img: "../img/img mancuerna.jpg",
    nombre: "Mancuernas Ajustables",
    precio: 25000,
    categoria: "Pesas",
    marca: "PowerFit",
    descripcion:
      "Mancuernas ajustables de 2.5 a 24 kg con sistema de cambio rápido.",
  },
  {
    id: 2,
    img: "../img/bici gym.jpg",
    nombre: "Bicicleta Estática",
    precio: 85000,
    categoria: "Cardio",
    marca: "NordicTrack",
    descripcion:
      "Bicicleta con pantalla digital y resistencia magnética ajustable.",
  },
  {
    id: 3,
    img: "../img/colchoneta yoga.jpg",
    nombre: "Colchoneta de Yoga",
    precio: 7000,
    categoria: "Yoga",
    marca: "Adidas",
    descripcion: "Colchoneta antideslizante de 6 mm ideal para yoga o pilates.",
  },
  {
    id: 4,
    img: "../img/banco de pesas.avif",
    nombre: "Banco de Pesas",
    precio: 30000,
    categoria: "Musculación",
    marca: "BodyStrong",
    descripcion:
      "Banco reclinable de acero reforzado para entrenamiento con mancuernas o barra.",
  },
  {
    id: 5,
    img: "../img/cinta de correr.avif",
    nombre: "Cinta de Correr",
    precio: 180000,
    categoria: "Cardio",
    marca: "ProForm",
    descripcion:
      "Cinta eléctrica con 12 programas automáticos y monitor de frecuencia cardíaca.",
  },
  {
    id: 6,
    img: "../img/bandas elasticas.webp",
    nombre: "Set de Bandas Elásticas",
    precio: 9000,
    categoria: "Entrenamiento Funcional",
    marca: "Reebok",
    descripcion:
      "Set de 5 bandas de diferentes resistencias con asas y bolsa de transporte.",
  },
  {
    id: 7,
    img:"../img/barra olimpica.jpg",
    nombre: "Barra Olímpica",
    precio: 45000,
    categoria: "Pesas",
    marca: "IronMax",
    descripcion:
      "Barra de acero cromado de 20 kg, ideal para powerlifting y crossfit.",
  },
];
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
            <p><strong>Cantidad:</strong> ${producto.cantidad}</p>
                    <button class="productoAgregar" id="${producto.id}">Agregar</button>

        </div>
    </div>`;
    productsContainer.appendChild(card);
  });
  agregarAlCarrito();
}

renderProductos(productos);

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

      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

      console.log("Carrito actualizado:", cartProducts);
    };
  });
}
