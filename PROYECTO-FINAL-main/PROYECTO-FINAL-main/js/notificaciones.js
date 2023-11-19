function readNotificaciones() {
    fetch("http://localhost:8092/api/v1/tarea", {
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                programarNotificacion(new Date(element.fechaRecordatorio).getTime(), element.titulo, element.id);
            });
        })
}


function programarNotificacion(fechaProgramada, nombreTarea, id) {
    // Obtener la fecha y hora actual
    const ahora = new Date().getTime();

    // Calcular el tiempo restante hasta la fecha programada
    const tiempoRestante = fechaProgramada - ahora;

    // Verificar si la fecha programada ya ha pasado
    if (tiempoRestante <= 0) {
        console.log('La fecha programada ya ha pasado.');
        eliminarNotaAntigua(id)
        return;
    }

    // Programar la notificación después del tiempo restante
    setTimeout(function () {
        // Verificar si las notificaciones son compatibles con el navegador
        if ('Notification' in window) {
            // Solicitar permiso para mostrar notificaciones
            Notification.requestPermission().then(function (permiso) {
                if (permiso === 'granted') {
                    // Crear y mostrar la notificación
                    const notificacion = new Notification('Recordatorio', {
                        body: nombreTarea,
                    });
                } else {
                    console.log('Permiso denegado para mostrar notificaciones.');
                }
            });
        } else {
            console.log('Las notificaciones no son compatibles con este navegador.');
        }
    }, tiempoRestante);
}


// const fechaProgramadaN = new Date('2023-11-14 19:01:50.000000').getTime();
// programarNotificacion(fechaProgramadaN);

readNotificaciones()

function eliminarNotaAntigua(id) {
    fetch(`http://localhost:8092/api/v1/tarea/${id}`, {
        method: "DELETE"
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })

}

function searchNotes() {
    idUsuario = JSON.parse(localStorage.getItem('user')).id;
    valor = document.getElementById("search-input").value
    fetch(`http://localhost:8092/api/v1/tarea/buscar?keyword=${valor}&userId=${idUsuario}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}
