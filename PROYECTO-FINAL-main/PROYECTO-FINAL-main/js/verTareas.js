function read() {
  idUsuario = JSON.parse(localStorage.getItem('user')).id;
  fetch(`http://localhost:8092/api/v1/tarea/usuario/${idUsuario}`, {
  })
    .then(response => response.json())
    .then(data => {
      const datosEstudioUrg = organizarCategoriaPrioridad(data, "Estudio", "Urgente")
      const datosEstudioImp = organizarCategoriaPrioridad(data, "Estudio", "Importante")
      const datosEstudioSec = organizarCategoriaPrioridad(data, "Estudio", "Secundario")
      const datosEventosUrg = organizarCategoriaPrioridad(data, "Eventos", "Urgente")
      const datosEventosImp = organizarCategoriaPrioridad(data, "Eventos", "Importante")
      const datosEventosSec = organizarCategoriaPrioridad(data, "Eventos", "Secundario")
      const datosFinanzasUrg = organizarCategoriaPrioridad(data, "Finanzas", "Urgente")
      const datosFinanzasImp = organizarCategoriaPrioridad(data, "Finanzas", "Importante")
      const datosFinanzasSec = organizarCategoriaPrioridad(data, "Finanzas", "Secundario")
      const datosNotas_rapidasUrg = organizarCategoriaPrioridad(data, "Notas_rapidas", "Urgente")
      const datosNotas_rapidasImp = organizarCategoriaPrioridad(data, "Notas_rapidas", "Importante")
      const datosNotas_rapidasSec = organizarCategoriaPrioridad(data, "Notas_rapidas", "Secundario")
      const datosPersonalUrg = organizarCategoriaPrioridad(data, "Personal", "Urgente")
      const datosPersonalImp = organizarCategoriaPrioridad(data, "Personal", "Importante")
      const datosPersonalSec = organizarCategoriaPrioridad(data, "Personal", "Secundario")
      const datosTrabajoUrg = organizarCategoriaPrioridad(data, "Trabajo", "Urgente")
      const datosTrabajoImp = organizarCategoriaPrioridad(data, "Trabajo", "Importante")
      const datosTrabajoSec = organizarCategoriaPrioridad(data, "Trabajo", "Secundario")

      const cantidadEstudio = datosEstudioUrg.length + datosEstudioImp.length + datosEstudioSec.length
      const cantidadEventos = datosEventosUrg.length + datosEventosImp.length + datosEventosSec.length
      const cantidadFinanzas = datosFinanzasUrg.length + datosFinanzasImp.length + datosFinanzasSec.length
      const cantidadNotas = datosNotas_rapidasUrg.length + datosNotas_rapidasImp.length + datosNotas_rapidasSec.length
      const cantidadPersonal = datosPersonalUrg.length + datosPersonalImp.length + datosPersonalSec.length
      const cantidadTrabajo = datosTrabajoUrg.length + datosTrabajoImp.length + datosTrabajoSec.length

      cantidadEstudio > 0 ? badge_estudio.innerHTML = cantidadEstudio : ''
      cantidadEventos > 0 ? badge_eventos.innerHTML = cantidadEventos : ''
      cantidadFinanzas > 0 ? badge_finanzas.innerHTML = cantidadFinanzas : ''
      cantidadNotas > 0 ? badge_notas.innerHTML = cantidadNotas : ''
      cantidadPersonal > 0 ? badge_personal.innerHTML = cantidadPersonal : ''
      cantidadTrabajo > 0 ? badge_trabajo.innerHTML = cantidadTrabajo : ''

      mostrarTareas(datosEstudioUrg, "listaTareaEstudioUrgentes")
      mostrarTareas(datosEstudioImp, "listaTareaEstudioImportantes")
      mostrarTareas(datosEstudioSec, "listaTareaEstudioSecundarios")
      mostrarTareas(datosEventosUrg, "listaTareaEventosUrgentes")
      mostrarTareas(datosEventosImp, "listaTareaEventosImportantes")
      mostrarTareas(datosEventosSec, "listaTareaEventosSecundarios")
      mostrarTareas(datosFinanzasUrg, "listaTareaFinanzasUrgentes")
      mostrarTareas(datosFinanzasImp, "listaTareaFinanzasImportantes")
      mostrarTareas(datosFinanzasSec, "listaTareaFinanzasSecundarios")
      mostrarTareas(datosNotas_rapidasUrg, "listaTareaNotasUrgentes")
      mostrarTareas(datosNotas_rapidasImp, "listaTareaNotasImportantes")
      mostrarTareas(datosNotas_rapidasSec, "listaTareaNotasSecundarios")
      mostrarTareas(datosPersonalUrg, "listaTareaPersonalUrgentes")
      mostrarTareas(datosPersonalImp, "listaTareaPersonalImportantes")
      mostrarTareas(datosPersonalSec, "listaTareaPersonalSecundarios")
      mostrarTareas(datosTrabajoUrg, "listaTareaTrabajoUrgentes")
      mostrarTareas(datosTrabajoImp, "listaTareaTrabajoImportantes")
      mostrarTareas(datosTrabajoSec, "listaTareaTrabajoSecundarios")
    })
}

function mostrarTareas(data, ubicacion) {
  let tareas = ''
  data.forEach(element => {
    tareas += `
        <div class="col">
          <div class="card my-2" style="background-color:${element.color}">
            <div class="card-body">
              <div class="row">
                <div class="col-6">
                  <img src="imagenes/motivacion1.jpg" class="card-img-top w-100">
                </div>
                <div class="col-6">
                  <h5 class="card-title"><strong>Título: </strong>${element.titulo}</h5>
                  <p class="card-text"><strong>Descripción: </strong>${element.contenido}</p>
                  <p class="card-text"><strong>Fecha recordatorio:<br> </strong>${formatoFecha(element.fechaRecordatorio)}</p>                 
                </div>
              </div>
              <div class="row mt-3">                
                <div class="col-6">
                  <a onclick='cargarDatos(${JSON.stringify(element)})' class="btn btn-light" data-bs-toggle="modal" data-bs-target="#tareaModal"><i class="fa-solid fa-pen-to-square"></i> Editar</a>
                </div>
                <div class="col-6">
                  <a onclick="eliminar(${element.id})" class="btn btn-light"><i class="fa-solid fa-trash"></i>Eliminar</a>
                </div> 
              </div>              
            </div>
          </div>
        </div>`
  });
  document.getElementById(ubicacion).innerHTML = tareas
}

function organizarCategoriaPrioridad(data, valorCategoria, valorEtiqueta) {
  const organizar = data.reduce((acc, item) => {
    if (item.categoria === valorCategoria && item.etiqueta === valorEtiqueta) {
      acc.push(item);
    }
    return acc;
  }, [])
  return organizar
}

function usuarioDatos() {
  let usuario = JSON.parse(localStorage.getItem("user"))
  infoUsuario.innerHTML = usuario.nombre
}

function logout() {
  localStorage.removeItem("user")
}

function validarSession() {
  if (localStorage.getItem("user") == null) {
    window.location.href = "login.html";
  }
}

function formatoFecha(fechaISO) {
  const fecha = new Date(fechaISO);

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes().toString().padStart(2, '0');
  const segundos = fecha.getSeconds().toString().padStart(2, '0');
  const ampm = horas >= 12 ? 'Pm' : 'Am';

  const fechaFormateada = `${dia}-${mes}-${anio} ${horas % 12 || 12}:${minutos}:${segundos} ${ampm}`;

  return fechaFormateada
}

var id = 0
function cargarDatos(data) {
  console.log(data);
  document.getElementById("note-title-mod").value = data.titulo
  document.getElementById("note-text-mod").value = data.contenido
  document.getElementById("note-color-mod").value = data.color
  document.getElementById("note-datetime-mod").value = data.fechaRecordatorio
  document.getElementById("categoria-mod").value = data.categoria
  document.getElementById(`${data.etiqueta}`).checked = true
  this.id = data.id
}

function modificar() {
  const title = document.getElementById('note-title-mod').value
  const contenido = document.getElementById('note-text-mod').value
  const color = document.getElementById('note-color-mod').value
  const fechaRecordatorio = document.getElementById('note-datetime-mod').value
  const categoria = document.getElementById('categoria-mod').value
  const input_etiqueta = document.getElementsByName('etiqueta-mod')
  let etiqueta

  input_etiqueta.forEach(element => {
    if (element.checked)
      etiqueta = element.value
  });

  if (!title || !contenido) {
    alert('Por favor, ingresa un título y contenido para la nota.');
    return;
  }

  // Registrar
  let headersList = {
    "Accept": "*/*",
    'Content-Type': 'application/json',
  }

  let bodyContent = JSON.stringify({
    "id": this.id,
    "titulo": title,
    "contenido": contenido,
    "color": color,
    "fechaRecordatorio": fechaRecordatorio,
    "fechaCreacion": new Date(),
    "etiqueta": etiqueta,
    "categoria": categoria
  });


  fetch(`http://localhost:8092/api/v1/tarea`, {
    method: "POST",
    body: bodyContent,
    headers: headersList
  })
    .then(response => response.json())
    .then(data => {
      read()
      Swal.fire({
        title: "Excelente!",
        text: "Tarea modificada!",
        icon: "success",
        timerProgressBar: true,
      }).then(() => {
        location.reload();
        limpiarCampos()
      });
    })
}
function eliminar(id) {
  Swal.fire({
    title: "Eliminar?",
    text: "Vas a borrar una tarea!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Eliminar!"
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:8092/api/v1/tarea/${id}`, {
        method: "DELETE"
      })
        .then(response => response.text())
        .then(data => {
          read()
          Swal.fire({
            title: "Eliminado!",
            text: "La tarea ha sido eliminada.",
            icon: "success"
          });
        })
    }
  })

};

function limpiarCampos() {
  document.getElementById('note-title-mod').value = ''
  document.getElementById('note-text-mod').value = ''
  document.getElementById('note-color-mod').value = '#000000'
  document.getElementById('note-datetime-mod').value = ''
  document.getElementById('categoria-mod').value = '0'
  var opcionesRadio = document.getElementsByName("etiqueta-mod");
  for (var i = 0; i < opcionesRadio.length; i++) {
    opcionesRadio[i].checked = false;
  }
}


validarSession()
read()
usuarioDatos()

