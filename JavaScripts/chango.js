
let containerCarro = document.getElementById("seccion-carro");
let totalContainer = document.getElementById("total");

let cartStorage = JSON.parse(localStorage.getItem("productosCarro")) || [];
function calcularTotal(carroItems) {
    return carroItems.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
}
function renderCarrito(carroItems) {
    containerCarro.innerHTML = "";
    carroItems.forEach(producto => {
        const card = document.createElement("div");
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <img src="${producto.imagen}" class="producto-imagen">
            <p>Cantidad: ${producto.cantidad}</p>
            <button class="btn-increase" data-id="${producto.id}">+</button>
            <button class="btn-decrease" data-id="${producto.id}">-</button>
            <button class="btn-remove" data-id="${producto.id}">Eliminar</button>
        `;
        containerCarro.appendChild(card);
    });
    addCartButtonEvents();
    updateTotal(carroItems); 
}

function updateTotal(carroItems) {
    const total = calcularTotal(carroItems);
    totalContainer.innerHTML = `<h3>Total: $${total}</h3>`;
}

function addCartButtonEvents() {
    document.querySelectorAll(".btn-increase").forEach(button => {
        button.onclick = (e) => {
            const productId = e.target.dataset.id;
            const producto = cartStorage.find(p => p.id == productId);
            producto.cantidad++;
            localStorage.setItem("productosCarro", JSON.stringify(cartStorage));
            renderCarrito(cartStorage);
        };
    });

    document.querySelectorAll(".btn-decrease").forEach(button => {
        button.onclick = (e) => {
            const productId = e.target.dataset.id;
            const producto = cartStorage.find(p => p.id == productId);
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                cartStorage = cartStorage.filter(p => p.id != productId);
            }
            localStorage.setItem("productosCarro", JSON.stringify(cartStorage));
            renderCarrito(cartStorage);
        };
    });

    document.querySelectorAll(".btn-remove").forEach(button => {
        button.onclick = (e) => {
            const productId = e.target.dataset.id;
            cartStorage = cartStorage.filter(p => p.id != productId);
            localStorage.setItem("productosCarro", JSON.stringify(cartStorage));
            renderCarrito(cartStorage);
        };
    });
}
document.getElementById("vaciar-carrito").onclick = () => {
    cartStorage = [];
    localStorage.removeItem("productosCarro");
    renderCarrito(cartStorage);
    updateTotal([]);
};

renderCarrito(cartStorage);




