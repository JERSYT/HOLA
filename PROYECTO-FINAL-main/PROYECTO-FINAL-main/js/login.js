document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Validate the form fields
  var username = document.getElementById('username').value.trim();
  var password = document.getElementById('password').value.trim();

  if (username === '' || password === '') {
    alert('Por favor, complete todos los campos.');
    return;
  }

  // If all fields are filled, you can proceed with form submission
  // Replace this with your form submission logic, e.g., making an AJAX request

  let headersList = {
    "Accept": "*/*",
    'Content-Type': 'application/json',
  }

  let bodyContent = JSON.stringify({
    "correo": username,
    "password": password
  });


  fetch("http://localhost:8092/api/v1/usuario/login", {
    method: "POST",
    body: bodyContent,
    headers: headersList
  })
    .then(response => response.json())
    .then(data => {
      if (parseInt(data.status) === 200) {
        let usuario = {
          id: data.usuario.id,
          nombre: data.usuario.nombre,
          correo: data.usuario.correo
        }
        localStorage.setItem("user", JSON.stringify(usuario));

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: `Bienvenido ${data.usuario.nombre} <br> ${data.message}`
        }).then(() => {
          window.location.href = "dashboard.html";
        });
      } else if (parseInt(data.status) === 500) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: data.message
        });
      }
    })
});