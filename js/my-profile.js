//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("guardarName").addEventListener("click", function () {

        let nombres = document.getElementById("nombres");
       // let apellidos = document.getElementById("apellidos").value;

        localStorage.setItem("NyA", JSON.stringify({nombres: nombres.value}))
        window.location = "my-profile.html";

    })

    let nombre_apellidos = localStorage.getItem("NyA");
    let names = document.getElementById("names");

    if (nombre_apellidos){
        nombre_apellidos = JSON.parse(nombre_apellidos);
        names.innerText = names.innerText + nombre_apellidos.nombres;
    }

    if (document.getElementById("salir")) {
        document.getElementById("salir").addEventListener("click", function(){
          localStorage.removeItem("NyA");
        })
    
        }

    document.getElementById("guardarFecha").addEventListener("click", function () {
       
        let fecha = document.getElementById("nacimiento");
    
        localStorage.setItem("Fecha", JSON.stringify({date: fecha.value}))
        window.location = "my-profile.html";
    
        })

        let fecha_nacimiento = localStorage.getItem("Fecha");
        let nacimiento = document.getElementById("fecha");
    
        if (fecha_nacimiento){
            fecha_nacimiento = JSON.parse(fecha_nacimiento);
            nacimiento.innerText = nacimiento.innerText + fecha_nacimiento.date;
        }
    
        if (document.getElementById("salir")) {
            document.getElementById("salir").addEventListener("click", function(){
              localStorage.removeItem("Fecha");
            })
        
            }

    document.getElementById("guardarEmail").addEventListener("click", function () {    
            
        let email = document.getElementById("email");

        localStorage.setItem("User", JSON.stringify({email: email.value}))
        window.location = "my-profile.html";

        })

        let user = localStorage.getItem("User");
        let info_user = document.getElementById("correo")

        if (user) {
          user = JSON.parse(user);
          info_user.innerText = info_user.innerText + user.email;
        }

        if (document.getElementById("salir")) {
            document.getElementById("salir").addEventListener("click", function(){
              localStorage.removeItem("User");
            })
        
        }

   

    document.getElementById("guardarContacto").addEventListener("click", function () {
       
        let phone = document.getElementById("telefono");
    
        localStorage.setItem("Telefono", JSON.stringify({telefono: phone.value}))
        window.location = "my-profile.html";
    
        })

        let contacto = localStorage.getItem("Telefono");
        let tlf = document.getElementById("contacto");
    
        if (contacto){
            contacto = JSON.parse(contacto);
            tlf.innerText = tlf.innerText + contacto.telefono;
        }
    
        if (document.getElementById("salir")) {
            document.getElementById("salir").addEventListener("click", function(){
              localStorage.removeItem("Telefono");
            })
        
            }
        

});