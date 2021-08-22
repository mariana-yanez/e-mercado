//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("submit").addEventListener("click", function() {

        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletados = true;

        if (inputEmail.value === ""){
            camposCompletados = false;
        }

        if (inputPassword.value === ""){
            camposCompletados = false;
        }

        if (camposCompletados){

            window.location = "inicio.html";

        }else {
            alert("Debes ingresar los datos para continuar!")
        }
    })

});