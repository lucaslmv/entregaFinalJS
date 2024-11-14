const metodoPago = document.getElementById("metodoPago");
const formTarjeta = document.getElementById("formTarjeta");
const formPaypal = document.getElementById("formPaypal");
const formEfectivo = document.getElementById("formEfectivo");
const botonFinalizar = document.getElementById("botonFinalizarCompra");

metodoPago.addEventListener("change", (e) => {
    formTarjeta.style.display = "none";
    formPaypal.style.display = "none";
    formEfectivo.style.display = "none";

    switch (e.target.value) {
        case "tarjeta":
            formTarjeta.style.display = "block";
            break;
        case "paypal":
            formPaypal.style.display = "block";
            break;
        case "efectivo":
            formEfectivo.style.display = "block";
            break;
    }
});

botonFinalizar.addEventListener("click", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

    if (!nombre || !direccion) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos obligatorios.'
        });
        return;
    }

    const cartItems = JSON.parse(localStorage.getItem("productosCarro"));
    if (!cartItems.length) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tu carrito está vacío.'
        });
        return;
    }

    let resumen = `Nombre: ${nombre}<br>Dirección: ${direccion}<br><br>Tu compra:<br>`;
    cartItems.forEach(item => {
        resumen += `${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precio * item.cantidad}<br>`;
    });
    resumen += `Total: $${cartItems.reduce((total, item) => total + item.precio * item.cantidad, 0)}`;

    Swal.fire({
        title: '¿Confirmar compra?',
        html: resumen,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Compra realizada',
                html: resumen,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                localStorage.removeItem("productosCarro");
                window.location.href = '../index.html'; 
            });
        } else {
            Swal.fire(
                'Cancelado',
                'Tu compra ha sido cancelada',
                'error'
            );
        }
    });
});


