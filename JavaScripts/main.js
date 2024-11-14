let productosCarro = JSON.parse(localStorage.getItem("productosCarro")) || [];
let productos = [];

let container = document.getElementById("contenedor-productos");

async function fetchProductos() {
    try {
        const response = await fetch('./JavaScripts/productos.json');
        if (!response.ok) throw new Error("Error en la carga de productos");
        
        productos = await response.json();
        renderProductos(productos);
    } catch (error) {
        console.error("Hubo un error al cargar los productos:", error);
    }
}

fetchProductos();

function renderProductos(productosArray) {
    container.innerHTML = "";
    productosArray.forEach(producto => {
        producto.cantidad = 1;
        const card = document.createElement("div");
        card.className = "producto-card";
        card.innerHTML = `
            <h3> ${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <img src="${producto.imagen}" class="producto-imagen">
            <p>Cantidad: <span id="cantidad-${producto.id}">${producto.cantidad}</span></p>
            <button class="btn-increase" data-id="${producto.id}">+</button>
            <button class="btn-decrease" data-id="${producto.id}">-</button>
            <button class="productoAgregar" id="${producto.id}">Agregar al carrito</button>
        `;
        container.appendChild(card);
    });

    addCartButtonEvents();
    addToCartButton();
}

function addToCartButton() {
    let añadirBoton = document.querySelectorAll(".productoAgregar");
    añadirBoton.forEach(button => {
        button.onclick = (e) => {
            const productId = parseInt(e.currentTarget.id);
            const productoSeleccionado = productos.find(producto => producto.id === productId);

            if (!productoSeleccionado) return;

            const productoEnCarro = productosCarro.find(producto => producto.id === productoSeleccionado.id);
            if (productoEnCarro) {
                productoEnCarro.cantidad += productoSeleccionado.cantidad;
            } else {
                productosCarro.push({ ...productoSeleccionado });
            }

            localStorage.setItem("productosCarro", JSON.stringify(productosCarro));

            Swal.fire({
                icon: 'success',
                title: 'Producto añadido',
                text: `Añadiste ${productoSeleccionado.cantidad} x ${productoSeleccionado.nombre} al carrito`,
                timer: 1500,
                showConfirmButton: false
            });

            productoSeleccionado.cantidad = 1;
            document.getElementById(`cantidad-${productoSeleccionado.id}`).innerText = productoSeleccionado.cantidad;
        };
    });
}

function addCartButtonEvents() {
    document.querySelectorAll(".btn-increase").forEach(button => {
        button.onclick = (e) => {
            const productId = e.target.dataset.id;
            const producto = productos.find(p => p.id == productId);
            producto.cantidad++;
            document.getElementById(`cantidad-${productId}`).innerText = producto.cantidad;
        };
    });

    document.querySelectorAll(".btn-decrease").forEach(button => {
        button.onclick = (e) => {
            const productId = e.target.dataset.id;
            const producto = productos.find(p => p.id == productId);
            if (producto.cantidad > 1) {
                producto.cantidad--;
                document.getElementById(`cantidad-${productId}`).innerText = producto.cantidad;
            }
        };
    });
}





