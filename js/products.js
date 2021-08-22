var productosArray = [];

function showProductos(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < productosArray.length; i++){
        let producto = productosArray[i];

        htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + producto.imgSrc + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ producto.name +`</h4>
                            <small class="text-muted">` + producto.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + producto.description + `</p>
                        <p class="mb-1">` + producto.currency +" "+ producto.cost + `</p>
                    </div>
                </div>
            </a>
            `
    }
    document.getElementById("productos").innerHTML = htmlContentToAppend
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function(result){
        if (result.status === "ok"){
            productosArray = result.data;

            showProductos(productosArray);

        }else{ //aca enseñamos al usuruario con una alerta el error en caso que se haya producido alguno
            //pensar como mejorar la forma de mostrar este error
            alert(result.data);
        }
    })
});