let productos = ["mesa", "silla", "lampara", "libro"];
ingresoDeUsuario();
mostrarProductos();
function ingresoDeUsuario() {
  let usuario = prompt("Ingrese su nombre");
  console.log("Bienvenido " + usuario + " a nuestra tienda");
}
function mostrarProductos() {
  console.log("Estos son los productos disponibles:");
  for (let i = 0; i < productos.length; i++) {
    console.log(i+ " - " + productos[i]);
}
seleccionDeProducto();
}

function seleccionDeProducto() {
let elijaProducto = prompt("Elija el producto que desea comprar");

let indiceDeProducto = parseInt(elijaProducto);
validarCompra(indiceDeProducto);

}

function validarCompra(indice) {
if (indice >= 0 && indice < productos.length) {
    alert("su compra de " + productos[indice] + " se ha completado con exito");
}
else {
    alert("El producto seleccionado no existe");
}
}