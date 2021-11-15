var cartArticulos = [];
let total
let costoEnvioPorcent
let costoDeEnvio = 0;

function showCart(cartArticulos) {

  let articulo = "";
  for (let i = 0; i < cartArticulos.length; i++) {
    let cartProductos = cartArticulos[i];

    if (cartProductos.currency === "USD") {
      subTotal = cartProductos.count * cartProductos.unitCost * 40
    } else {
      subTotal = cartProductos.count * cartProductos.unitCost
    }

    articulo += `
        <div class="list-group-item">
                <div class="row">
                    <div class="col-3">
                        <img src="${cartProductos.src}" class="img-thumbnail col-10">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="font-weight-bold"">${cartProductos.name}</h4>
                            <small class="text-muted"><a href="#">Eliminar producto</a></small>
                        </div>
                        <div class="">
                          <div class="row container">
                          <p class="mb-1" id="costo${i}">Precio unitario: ${cartProductos.currency} ${cartProductos.unitCost}</p>
                            <div class="col">
                              <p class="font-weight-normal text-right my-3">Cant.</p>
                            </div>
                            <div class="col-2">
                              <input class="form-control" id="contador${i}" type="number" min="1" value="${cartProductos.count}" onchange="mostrarsubTotal(${cartProductos.unitCost}, ${i})">
                            </div>
                          </div>
                          <div class="row container">
                          <div class="col">
                            <p class="font-weight-normal text-right my-3" id="divisa${i}">Subtotal UYU</p>
                          </div>
                          <div class="col-2">
                            <p class="form-control" id="sub${i}" name="subTotales" type="text">${subTotal}</p>
                          </div>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
   `
  }

  document.getElementById("cartProductos").innerHTML = articulo;
}

function precioTotal() {

  total = 0;
  subs = document.getElementsByName("subTotales");

  for (let i = 0; i < subs.length; i++) {
    total += parseInt(subs[i].innerHTML);
  }

  document.getElementById("importeTotal").innerHTML = "Importe total UYU " + (total + costoDeEnvio);

};


function mostrarsubTotal(precio, i) {

  let cant = parseInt(document.getElementById(`contador${i}`).value);
  let divisa = cartArticulos[i].currency;

  if (divisa == "USD") {
    subTotal = precio * cant * 40
  } else {
    subTotal = precio * cant
  }

  document.getElementById(`sub${i}`).innerHTML = subTotal;
  precioTotal()

};

function validacion() {

let calle = document.getElementById("calle");
let numero = document.getElementById("numero");
let esquina = document.getElementById("esquina");
let pais = document.getElementById("pais");
let departamento = document.getElementById("departamento");
let radio = document.getElementById("radio");
document.getElementById("feedback").innerHTML = "";
let infoMissing = false;
let msg = "";

        //Quito las clases que marcan como inválidos
        calle.classList.remove('is-invalid');
        numero.classList.remove('is-invalid');
        esquina.classList.remove('is-invalid');
        pais.classList.remove('is-invalid');
        departamento.classList.remove('is-invalid');
        radio.classList.remove('is-invalid');

        //Se realizan los controles necesarios,
        //En este caso se controla que se haya ingresado el nombre y categoría.
        //Consulto por el nombre del producto
        if (calle.value === "")
        {
            calle.classList.add('is-invalid');
            infoMissing = true;
        }
        
        //Consulto por la categoría del producto
        if (numero.value === "")
        {
            numero.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por el costo
        if (esquina.value <=0)
        {
            esquina.classList.add('is-invalid');
            infoMissing = true;
        }

        if (pais.value <=0)
        {
            pais.classList.add('is-invalid');
            infoMissing = true;
        }

        if (departamento.value <=0)
        {
            departamento.classList.add('is-invalid');
            infoMissing = true;
        }

        if(!infoMissing)
        { return infoMissing

        }


// let flag = true;
// let msg = "";
//
// let elementosFuera = document.getElementsByClassName("formuOut");
// // let afuera = document.getElementsByClassName("formuIn");
// document.getElementById("feedback").innerHTML = "";
//
// //Solo 1 vacío fuera:
// let cuentoFuera = 0;
// for (let i = 0; i < elementosFuera.length; i++) {
//   const element = elementosFuera[i];
//   if (element.value == "") {
//     cuentoFuera += 1;
//   }
// }
//
// if (cuentoFuera > 1) {
//   flag = false;
//   msg += "-Por favor complete todos los datos. <br>"
// }
//
// document.getElementById("feedback").innerHTML = msg;
// return flag;
//
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(CART_INFO_URL).then(function (result) {
    if (result.status === "ok") {
      cartArticulos = result.data.articles

      showCart(cartArticulos);
      precioTotal();
    }


    document.getElementById("premium").addEventListener('change', function () {
      costoEnvioPorcent = 0.15;

      costoDeEnvio = Math.round((total * costoEnvioPorcent));

      document.getElementById("costoEnvio").innerHTML = "Costo de Envío " + costoDeEnvio;

      precioTotal();

    });



    document.getElementById("express").addEventListener('change', function () {

      costoEnvioPorcent = 0.07

      costoDeEnvio = Math.round((total * costoEnvioPorcent))

      document.getElementById("costoEnvio").innerHTML = "Costo de Envío " + costoDeEnvio

      precioTotal();
    });

    document.getElementById("standard").addEventListener('change', function () {

      costoEnvioPorcent = 0.05;

      costoDeEnvio = Math.round((total * costoEnvioPorcent));

      document.getElementById("costoEnvio").innerHTML = "Costo de Envío " + costoDeEnvio;

      precioTotal();

    });
  })

  let form = document.getElementById("myForm");
  form.addEventListener('submit', function (event) {
    if (!validacion()) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      document.getElementById("feedback").innerHTML = "";

    }
  })

});
