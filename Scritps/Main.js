const API_URL = "http://localhost:3000/productos"

const prod = document.getElementById("products")

let articulo;
let carrito = [];

let contador = document.getElementById("contadorCarrito");

function actual() {
    fecha = new Date(); //Actualizar fecha.
    hora = fecha.getHours(); //hora actual
    minuto = fecha.getMinutes(); //minuto actual
    segundo = fecha.getSeconds(); //segundo actual
    if (hora < 10) { //dos cifras para la hora
        hora = "0" + hora;
    }
    if (minuto < 10) { //dos cifras para el minuto
        minuto = "0" + minuto;
    }
    if (segundo < 10) { //dos cifras para el segundo
        segundo = "0" + segundo;
    }
    //ver en el recuadro del reloj:
    mireloj = hora + " : " + minuto + " : " + segundo;
    return mireloj;
}
function actualizar() { //función del temporizador
    mihora = actual(); //recoger hora actual
    mireloj = document.getElementById("reloj"); //buscar elemento reloj
    mireloj.innerHTML = "Expires in: " + mihora; //incluir hora en elemento
}
setInterval(actualizar, 1000); //iniciar temporizador




const traerProductos = async (_API_URL) => {
    const peticion = await fetch(_API_URL)
    const response = await peticion.json()
    try {
        if (response.length > 0) {
            prod.innerHTML = ``
            response.forEach(element => {
                const { id, image, category, description, lot, price } = element
                const div = document.createElement("div")
                div.setAttribute("class", "card")
                div.setAttribute("style", "width: 18rem;")
                div.innerHTML = `<img src="${image}" alt="">
                <div class="card-body">
                    <h5 class="card-title">${description}</h5>
                    <p class="card-text">${category}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${lot}gr</li>
                    <li class="list-group-item">$${price}</li>
                    <li class="list-group-item">Agregar a Favoritos <button onclick="addFavoritos(${id})">❤</button></li>
                </ul>
                <div class="card-body">
                    <button onclick="agregarAlCarrito(${id})" class="card-link">Añadir al Carrito</button> <br>
                    <button  class="card-link"><a  target="_blank" href="Carrito.html" </a>  Ver mi Carrito</button>
                </div>`
                prod.appendChild(div);
            });
        }
    } catch (error) {
        console.log(error)
    }
}
traerProductos(API_URL)

const URL_CATEGORY = "http://localhost:3000/productos?category="
const vegetables = document.getElementById("vegeta")
const Bevera = document.getElementById("Bev")
const Meat = document.getElementById("Meats")
const BreakF = document.getElementById("Breakfast")
const Froz = document.getElementById("Frozen")
const snk = document.getElementById("Snacks")
const grocer = document.getElementById("Grocery")
const wine = document.getElementById("Wines")

function filtrarVeg() {
    const vegetab = vegetables.value;
    traerProductos(URL_CATEGORY + vegetab)
}
function filtrarBev() {
    const Bev = Bevera.value;
    traerProductos(URL_CATEGORY + Bev)
}
function filtrarMeats() {
    const Meats = Meat.value;
    traerProductos(URL_CATEGORY + Meats)
}
function filtrarBreakfast() {
    const Breakfast = BreakF.value;
    traerProductos(URL_CATEGORY + Breakfast)
}

function filtrarFrozen() {
    const Frozen = Froz.value;
    traerProductos(URL_CATEGORY + Frozen)
}

function filtrarSnacks() {
    const Snacks = snk.value;
    traerProductos(URL_CATEGORY + Snacks)
}
function filtrarGrocery() {
    const Grocery = grocer.value;
    traerProductos(URL_CATEGORY + Grocery)
}

function filtrarWines() {
    const Wines = wine.value;
    traerProductos(URL_CATEGORY + Wines)
}

async function agregarAlCarrito(_param) {
    try {
        const res = await fetch(API_URL)
        console.log(res)
        const data = await res.json()
        let _id = data.find((element) => element.id === _param)
        carrito.push(_id)
        articulo = JSON.stringify(carrito);
        localStorage.setItem("Carrito", articulo);

    } catch (error) {
        console.log(error)
    }

    contador.innerText = carrito.length;
}

