var productosArray = [];
var precio_min = undefined;
var precio_max = undefined;
var buscar;

function infoProducto(id) {
    localStorage.setItem('informacion', id);
    window.location = 'product-info.html'
}
    

function showProductos(productosArray) {

    let htmlContentToAppend = "";
    for (let i = 0; i < productosArray.length; i++) {
        let producto = productosArray[i];

        if (buscar == undefined || producto.name.toLowerCase().indexOf(buscar) != -1) {

            if (((precio_min == undefined) || (precio_min != undefined && parseInt(producto.cost) >= precio_min)) &&
                ((precio_max == undefined) || (precio_max != undefined && parseInt(producto.cost) <= precio_max))) {

                htmlContentToAppend += `
                <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="${producto.imgSrc}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${producto.name}</h4>
                            <small class="text-muted">${producto.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${producto.description}</p>
                        <p class="mb-1">${producto.currency} ${producto.cost}</p>
                        <button id="info_product" class="btn btn-primary" onclick="infoProducto(${producto.id})">Información</button>
                    </div>
                </div>
                </div>
            `
            }
        }
        document.getElementById("productos").innerHTML = htmlContentToAppend; 
    }    
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (result) {
        if (result.status === "ok") {
            productosArray = result.data;

            showProductos(productosArray);

        } else { //aca enseñamos al usuruario con una alerta el error en caso que se haya producido alguno
            //pensar como mejorar la forma de mostrar este error
            alert(result.data);
        }
    })

    document.getElementById("buscador").addEventListener('input', function () {

        buscar = document.getElementById("buscador").value.toLowerCase();

        showProductos(productosArray);
    })

    document.getElementById("filtrar").addEventListener('click', function () {

        precio_min = document.getElementById("precio-min").value;
        precio_max = document.getElementById("precio-max").value;

        if ((precio_min != undefined) && (precio_min != "") && (parseInt(precio_min)) >= 0) {
            precio_min = parseInt(precio_min);
        }
        else {
            precio_min = undefined;
        }

        if ((precio_max != undefined) && (precio_max != "") && (parseInt(precio_max)) >= 0) {
            precio_max = parseInt(precio_max);
        }
        else {
            precio_max = undefined;
        }

        showProductos(productosArray);

    });

    document.getElementById("borrar").addEventListener('click', function () {
        document.getElementById("precio-min").value = "";
        document.getElementById("precio-max").value = "";

        precio_min = undefined;
        precio_max = undefined;

        showProductos(productosArray);
    });

    document.getElementById("mayor-relevancia").addEventListener('click', function () {

        productosArray.sort((producto1, producto2) => {

            return (producto1.soldCount > producto2.soldCount) ? - 1 : (producto1.soldCount == producto2.soldCount) ? 0 : 1

        })
        showProductos(productosArray);

    });

    document.getElementById("precio-ascendente").addEventListener('click', function () {

        productosArray.sort((producto1, producto2) => {

            return (producto1.cost < producto2.cost) ? - 1 : (producto1.cost == producto2.cost) ? 0 : 1

        })
        showProductos(productosArray);

    });

    document.getElementById("precio-descendente").addEventListener('click', function () {

        productosArray.reverse((producto1, producto2) => {

            return (producto1.cost < producto2.cost) ? - 1 : (producto1.cost == producto2.cost) ? 0 : 1

        })
        showProductos(productosArray);

    });

});


