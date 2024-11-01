document.addEventListener("DOMContentLoaded", () => {
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

    botonFinalizar.addEventListener("click", (e) => {
        e.preventDefault();

        Swal.fire({
            title: '¿Estás seguro de realizar la compra?',
            text: "Verifica que todos los datos sean correctos",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            try {
                if (result.isConfirmed) {
                    const nombre = document.getElementById("nombre").value.trim();
                    const direccion = document.getElementById("direccion").value.trim();

                    if (!nombre || !direccion) {
                        throw new Error("Por favor, completa todos los campos obligatorios.");
                    }

                    Swal.fire(
                        'Compra realizada',
                        '¡La compra se ha realizado con éxito!',
                        'success'
                    );
                } else {
                    Swal.fire(
                        'Cancelado',
                        'No se ha podido realizar la compra.',
                        'error'
                    );
                }
            } catch (error) {
                Swal.fire(
                    'Error',
                    error.message,
                    'error'
                );
            } finally {
                document.getElementById("formularioCompra").reset();
                formTarjeta.style.display = "none";
                formPaypal.style.display = "none";
                formEfectivo.style.display = "none";
            }
        });
    });
});

