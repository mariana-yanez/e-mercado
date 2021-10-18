var cartArticulos = [];
let subTotal;

function showCart(cartArticulos) {

  let articulo = "";
  for (let i = 0; i < cartArticulos.length; i++) {
    let cartProductos = cartArticulos[i];
    let subTotal = (cartProductos.count * cartProductos.unitCost)

    articulo += `
        <div class="list-group-item">
                <div class="row">
                    <div class="col-3">
                        <img src="${cartProductos.src}" class="img-thumbnail col-10">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${cartProductos.name}</h4>
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
                            <p class="font-weight-normal id="divisa${i}" text-right my-3">Subtotal: ${cartProductos.currency} </p>
                          </div>
                          <div class="col-2">
                            <p class="form-control" id="sub${i}" name="subTotales" type="text">${subTotal}</p>
                          </div>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
            </a>
   `
  }

  document.getElementById("cartProductos").innerHTML = articulo;
}

function precioTotal() {
  let total = 0;
  let subs = document.getElementsByName("subTotales");

  for (let i = 0; i < subs.length; i++) {
    total += parseInt(subs[i].innerHTML);
  }
  document.getElementById("importeTotal").innerHTML = "Importe Total " + total;


};

//function precioTotal() {
//
//  let totalUyu = 0;
//  let totalUsd = 0;
//  let subs = document.getElementsByName("subTotales");
//  let divisa = document.getElementById(`divisa${i}`);
//
//  for (let i = 0; i < subs.length; i++) {
//
//    if (divisa[i] != "UYU") {
//      totalUyu += parseInt(subs[i].innerHTML * 40);
//      totalUsd += parseInt(subs[i].innerHTML);
//    } else {
//      totalUyu += parseInt(subs[i].innerHTML);
//      totalUsd += parseInt(subs[i].innerHTML / 40);
//    }
//
//
//  }
//  document.getElementById("importeTotalUyu").innerHTML = "Importe Total UYU: " + totalUyu;
//  document.getElementById("importeTotalUsd").innerHTML = "Importe Total USD: " + totalUsd;
//};


function mostrarsubTotal(precio, i) {

  let cant = parseInt(document.getElementById(`contador${i}`).value);

  subTotal = (cant * precio);
  document.getElementById(`sub${i}`).innerHTML = subTotal;
  precioTotal();
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  getJSONData(CART_INFO_URL).then(function (result) {
    if (result.status === "ok") {
      cartArticulos = result.data

      showCart(cartArticulos.articles);
      precioTotal();
    }
  })

});
