//EVENTOS

document.getElementById("nombre").addEventListener("blur", validarNombre);
document.getElementById("edad").addEventListener("blur", validarEdad);
document.getElementById("email").addEventListener("blur", validarEmail);

//VALIDACION NOMBRE
function validarNombre() {
  const nombre = document.getElementById("nombre").value;
  if (nombre.length > 0) {
    document.getElementById("nombre").style.backgroundColor = "lightgreen";
  } else {
    document.getElementById("nombre").style.backgroundColor = "lightcoral";
  }
}

//VALIDACION EDAD
function validarEdad() {
  const edad = document.getElementById("edad").value;
  if (edad.length > 0 && edad > 0) {
    document.getElementById("edad").style.backgroundColor = "lightgreen";
  } else {
    document.getElementById("edad").style.backgroundColor = "lightcoral";
  }
}

//VALIDACION EMAIL
function validarEmail() {
  const email = document.getElementById("email").value;
  if (email.length > 0) {
    document.getElementById("email").style.backgroundColor = "lightgreen";
  } else {
    document.getElementById("email").style.backgroundColor = "lightcoral";
  }
}

//DATOS
function datosIngresados(_e) {
    function Persona(nombre, edad, email) {
      this.nombre = nombre;
      this.edad = edad;
      this.email = email;
    }
  
    var nombreIngresado = document.getElementById("nombre").value;
    var edadIngresada = document.getElementById("edad").value;
    var emailIngresado = document.getElementById("email").value;
  
    nuevaPersona = new Persona(nombreIngresado, edadIngresada, emailIngresado);
    console.log(nuevaPersona);
    datosIngresados();
  
    alert(`Hola ${nombreIngresado} :)`);
    alert(
      "Gracias por suscribirte a nuestro newsletter. En breve vas a recibir todas las novedades!!!"
    );
  
    document.getElementById(
      "titulo"
    ).innerHTML = `Muchas gracias ${nombreIngresado} :)`;
  }