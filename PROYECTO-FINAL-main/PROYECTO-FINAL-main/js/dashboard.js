function createNote() {
  const title = document.getElementById('note-title').value
  const contenido = document.getElementById('note-text').value
  const color = document.getElementById('note-color').value
  const fechaCreacion = new Date();
  const fechaRecordatorio = document.getElementById('note-datetime').value
  const categoria = document.getElementById('categoria').value
  const input_etiqueta = document.getElementsByName('etiqueta')
  const usuarioId = JSON.parse(localStorage.getItem('user')).id;
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
    "titulo": title,
    "contenido": contenido,
    "color": color,
    "fechaRecordatorio": fechaRecordatorio,
    "fechaCreacion": fechaCreacion,
    "etiqueta": etiqueta,
    "categoria": categoria,
    "usuario": {
      id: usuarioId
    }
  });


  fetch("http://localhost:8092/api/v1/tarea", {
    method: "POST",
    body: bodyContent,
    headers: headersList
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      Swal.fire({
        title: "Excelente!",
        text: "Tarea creada!",
        icon: "success",
        timerProgressBar: true,
      }).then(() => {
        location.reload();
        limpiarCampos()
      });

    })
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

function limpiarCampos() {
  document.getElementById('note-title').value = ''
  document.getElementById('note-text').value = ''
  document.getElementById('note-color').value = '#000000'
  document.getElementById('note-datetime').value = ''
  document.getElementById('categoria').value = '0'
  var opcionesRadio = document.getElementsByName("etiqueta");
  for (var i = 0; i < opcionesRadio.length; i++) {
    opcionesRadio[i].checked = false;
  }
}

validarSession()
usuarioDatos()

function crear() {
  const tareaDTO = {
    titulo: "Título de la tarea",
    contenido: "Contenido de la tarea",
    etiqueta: "Urgente",
    categoria: "Trabajo",
    color: "#ff0000",
    fechaCreacion: "2023-11-16T05:43:42.641",
    fechaRecordatorio: "2023-11-22T00:44:00",
    usuario: {
      id: 1
    }
  };

  fetch('http://localhost:8092/api/v1/tarea', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tareaDTO),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

