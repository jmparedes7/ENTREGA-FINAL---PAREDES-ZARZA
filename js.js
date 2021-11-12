
function Articulo(id, nombre, precio, destacado, imagen) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.destacado = destacado;
  this.imagen = imagen;
}

function cargarDatos(productos, articulos) {
  productos.forEach((producto) => {
    var articulo = new Articulo(
      producto.id,
      producto.nombre,
      producto.precio,
      producto.destacado,
      producto.imagen
    );
    articulos.push(articulo);
    dibujarProductos(articulo);
  });
}



function dibujarProductos(articulo) {
  let html = `<div class="col-6 col-sm-4">
    <div class="card">
      <img src="${articulo.imagen}">
    
    <div class="description">
      <div id="card__p" class="product-name">
      ${articulo.nombre}
      </div>

      <div id="card__p" class="price">
      $${articulo.precio}
      </div>

      <button onclick="agregarCarrito(${articulo.id})" class="botonCarrito">Agregar al carrito</button>
     </div>
    </div>
  </div>`;
  $("#products").append(html);
}

let articulos = [];
$.ajax({
  url: "./json/data.json",
  dataType: "json",
  success: (response) => {
    debugger;
    cargarDatos(response, articulos);
  },
});


//CARRITO

const carritoContenedor = document.getElementById('carritoContenedor')
const precioTotal = document.getElementById('precioTotal')


let carrito = [];

const agregarCarrito = (itemID) => {

  const articuloEnCarrito = carrito.find((articulo) => articulo.id === itemID)
  
  if(articuloEnCarrito){
    articuloEnCarrito.cantidad++
  } else{
    const articulo = articulos.find( (art) => art.id === itemID )

    carrito.push({
      id: articulo.id,
      nombre: articulo.nombre,
      imagen: articulo.imagen,
      precio: articulo.precio,
      cantidad: 1
  })
  }

  console.log(carrito)
  sumaCarrito()

}



const sumaCarrito = () =>{
  carritoContenedor.innerHTML = ""

  carrito.forEach((articulo) => {
    const div = document.createElement('div')
    div.classList.add('carritoContenedor')

    div.innerHTML = ` <img src = "${articulo.imagen}"
                      <p>${articulo.nombre}</p><p> Precio $${articulo.precio}</p>
                      <p>cantidad: ${articulo.cantidad}
                      <button onclick="eliminarArticulo(${articulo.id})" class= "boton-eliminar"></button>`
                      
                     
                    
    
    carritoContenedor.appendChild(div)  
  })

  precioTotal.innerText = carrito.reduce((acc, art) => acc += art.precio * art.cantidad, 0)
}


//ELIMIAR

const eliminarArticulo = (itemID) => { 

  const articulo = carrito.find( (art) => art.id === itemID )

  articulo.cantidad--
  if(articulo.cantidad ===0){

    const index = carrito.indexOf((articulo) => articulo.id ===itemID)

    carrito.splice(index, 1)
  }


  sumaCarrito()

}




//MERCADO PAGO

const finalizarCompra = () => {

console.log(carrito)

const itemsMP = carrito.map ( (articulo) =>{
  return {
    title: articulo.nombre,
    description: "",
    picture_url: "",
    category_id: articulo.id,
    quantity: articulo.cantidad,
    currency_id: "ARS",
    unit_price: articulo.precio
  }
  
})

      fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          Authorization: "Bearer TEST-1819461060025440-111019-033e223a741a54e2423b259adfdc2173-133052974"
        },
        body: JSON.stringify ({
          items: itemsMP,
          back_urls:{
            success: window.location.href,
            failure: window.location.href
          }
          
        })

      })
        .then( res => res.json())
        .then(data => {
          console.log(data)


          window.location.replace(data.init_point)
        })
  }


