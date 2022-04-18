//EDITAR UN EMPLEADO
let formulario = document.getElementById("formulario");
let params = new URLSearchParams(location.search);
let legajo = params.get("legajo");

// DAME UN EMPLEADO
const obtener = async () => {
  await fetch("http://localhost:3000/empleados/" + legajo)
    .then((res) => res.json())
    .then((data) => {
      formInfo(data);
    });
};
// SET FORMULARIO
const formInfo = (datos) => {
  for (let dato of datos) {
    document.getElementById("legajo").disabled = true;
    document.getElementById("legajo").value = dato.legajo;
    document.getElementById("apellido").value = dato.apellido;
    document.getElementById("nombre").value = dato.nombre;
    document.getElementById("dni").value = dato.dni;
    document.getElementById("sector").value = dato.sector;
    document.getElementById("fecha").value = new Date(dato.fecha_ingreso)
      .toISOString()
      .split("T")[0];
    document.forms.formulario.activo.value = dato.activo;
  }
};

obtener();


formulario.addEventListener("submit", async (e) => { //la funcion async devuelve un elemento promise, el await espera la resolución de promise
  e.preventDefault();
  let datos = new FormData(formulario);
  let formData = {
    legajo: datos.get("legajo"),
    apellido: datos.get("apellido"),
    nombre: datos.get("nombre"),
    dni: datos.get("dni"),
    sector: datos.get("sector"),
    fecha_ingreso: datos.get("fecha"),
    activo: datos.get("activo"),
    
  };

  await fetch("http://localhost:3000/actualizarEmpleado/"+legajo, {  
    method: "PUT",
    body: JSON.stringify(formData),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  window.location.href = "http://localhost:3000/";
});