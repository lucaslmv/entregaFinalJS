const productos = [

    {
        id: 1 ,
        nombre: "Lámpara de lava",
        precio: 18000,
        imagen: "../Imagenes/lampara de lava.webp"
    },

    {
        id: 2 ,
        nombre: "Lámpara globo de filamento led", 
        precio: 6900,
        imagen: "../Imagenes/Lámpara globo de filamento led.png",
    },
    
    {
        id: 3 ,
        nombre: "Lámpara globo de filamento incandescente de carbono",
        precio: 5900,
        imagen: "../Imagenes/Lámpara globo de filamento incandescente de carbono.jpg",
    },
    
    {
        id: 4 ,
        nombre: "Velador de madera",
        precio: 10000,
        imagen: "../Imagenes/Velador de madera.webp"
    },
    
    {
        id: 5 ,
        nombre: "Velador gancho",
        precio: 15000,
        imagen:"../Imagenes/Velador gancho.webp"
    },
    
    {
        id: 6 ,
        nombre: "Velador Pixar",
        precio: 25000,
        imagen: "../Imagenes/Velador Pixar.webp"
    },
    
    {
        id: 7 ,
        nombre: "Velador Estudiantes",
        precio: 17000,
        imagen: "../Imagenes/Velador Estudiantes.webp"
    },
    
    {
        id: 8 ,
        nombre: "Lámpara fria 8w",
        precio: 1500,
        imagen:"../Imagenes/Lámpara fria 8w.webp"
    },

    {
        id: 9 ,
        nombre: "Lámpara cálida 8w",
        precio: 1200,
        imagen:"../Imagenes/Lámpara cálida 8w.jpg"
    },
]

let productosCarro = [];

let container = document.getElementById("contenedor-productos")

function renderProductos(productosArray) {
    container.innerHTML = "";
    productosArray.forEach(producto => {
        const card = document.createElement("div");
        card.className = "producto-card";
        card.innerHTML = `
        <h3> ${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <img src="${producto.imagen}" class="producto-imagen">
        <p>Cantidad: <span id="cantidad-${producto.id}">1</span></p>
        <button class="btn-increase" data-id="${producto.id}">+</button>
        <button class="btn-decrease" data-id="${producto.id}">-</button>
        <button class="productoAgregar" id="${producto.id}">Agregar al carrito</button>
        `;
        container.appendChild(card);
        
    });

    addCartButtonEvents();
    addToCartButton();
}

renderProductos(productos);

function addToCartButton() {
    let añadirBoton = document.querySelectorAll(".productoAgregar");
    añadirBoton.forEach(button => {
        button.onclick = (e) => {
            const productId = parseInt(e.currentTarget.id);
            const productoSeleccionado = productos.find(producto => producto.id === productId);

            if (!productoSeleccionado) {
                return;
            }

            const productoEnCarro = productosCarro.find(producto => producto.id === productoSeleccionado.id);
            if (productoEnCarro) {
                productoEnCarro.cantidad++;
            } else {
                productosCarro.push({ ...productoSeleccionado, cantidad: 1 });
            }

            localStorage.setItem("productosCarro", JSON.stringify(productosCarro));
        }
    });
}

function addCartButtonEvents() {
    document.querySelectorAll(".btn-increase").forEach(button => {
        button.onclick = (e) => {
            const productId = e.target.dataset.id;
            let cantidadElement = document.getElementById(`cantidad-${productId}`);
            let cantidad = parseInt(cantidadElement.innerText);
            cantidad++;
            cantidadElement.innerText = cantidad;
        }
     });
 
     document.querySelectorAll(".btn-decrease").forEach(button => {
         button.onclick = (e) => {
             const productId = e.target.dataset.id;
             let cantidadElement = document.getElementById(`cantidad-${productId}`);
             let cantidad = parseInt(cantidadElement.innerText);
             if (cantidad > 1) {
                 cantidad--;
                 cantidadElement.innerText = cantidad;
             }
         };
     });
 }





