var productoArray = [];
var comentariosArray = [];
var productosArray = [];
var relacionadosArray = [];
var producto = [];

function infoProducto(id) {
  localStorage.setItem('informacion', id);
  window.location = 'product-info.html'
}

function showProducto(productoArray) {

  let htmlContentToAppend = "";
  for (let i = 0; i < productoArray.length; i++) {
    let producto = productoArray[i];


    htmlContentToAppend += `
        <div class="container justify-content-center">
        <div class="card">
          <h5 class="card-header">Producto:</h5>
          <div class="card-body">
            <h5 class="card-title">${producto.name}</h5>
            <small class="text-muted">${producto.soldCount} artículos vendidos</small>
            <p class="card-text">${producto.description}</p>
            <p class="mb-1">${producto.currency} ${producto.cost}</p>
            <a href="cart.html" class="btn btn-primary">Agregar al carrito</a><br><br>
      
            <div class="col-6">
              <div id="carouselExampleIndicators" class="carousel slide just" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="img/${producto.id}/1.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                    <img src="img/${producto.id}/2.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                    <img src="img/${producto.id}/3.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                    <img src="img/${producto.id}/4.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                    <img src="img/${producto.id}/5.jpg" class="d-block w-100" alt="...">
                  </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div><br><br>
      </div>
        `
  }

  document.getElementById("infoProduct").innerHTML = htmlContentToAppend;
}

function showRelatedProducts(relacionadosArray, arrayProducto) {

  let relatedProducts = "";
  relacionadosArray.forEach(function (indice) {

    relatedProducts += `
      <div class="card col-sm-6" style="width: 18rem;">
        <img src="img/${arrayProducto[indice].id}/${arrayProducto[indice].id}.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${arrayProducto[indice].name}</h5>
        <p class="card-text">${arrayProducto[indice].description}</p>
        <p class="mb-1">${arrayProducto[indice].currency} ${arrayProducto[indice].cost}</p>
        <a href="javascript:infoProducto(${arrayProducto[indice].id})" class="btn btn-primary">Ver más</a>
      </div>
      </div>
 `
  })

  document.getElementById("productosRelacionados").innerHTML = relatedProducts;
}


function showComentarios(comentariosArray) {

  let coments = "";
  for (let i = 0; i < comentariosArray.length; i++) {
    let comentario = comentariosArray[i];

    coments += `
        <div class="col-12">
        <div class="container justify-content-center">
        <ul class="list-unstyled">
          <li class="media">
            <div class="media-body">
              <h5 class="mt-0 mb-1">${comentario.user}</h5>
              <p>${comentario.description}</p>
              <p>Puntuación:${comentario.score}</p>
            </div>
            <small class="text-muted">${comentario.dateTime}</small>
          </li>
        </ul>
      </div><hr>
      </div>
  `
    document.getElementById("comentarios").innerHTML = coments;
  }


}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (result) {
    if (result.status === "ok") {
      productoArray = result.data;

      producto = productoArray.filter(e => e.id === parseInt(localStorage.getItem('informacion')));

      showProducto(producto);
    }
  })

  getJSONData(PRODUCTS_URL).then(function (result) {
    if (result.status === "ok") {
      productosArray = result.data

      showRelatedProducts(producto[0].relatedProducts, productosArray);
    }
  })

  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
    if (result.status === "ok") {
      comentariosArray = result.data

      showComentarios(comentariosArray);
    }
  })

});
