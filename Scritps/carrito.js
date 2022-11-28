let contenedor = document.getElementById("idCarrito")
let num = 0;
let numS = 0;
let carJson = JSON.parse(localStorage.getItem("Carrito"))
let valorOrden = 0;

function mostrarCarrito() {
    console.log(carJson)
    contenedor.innerHTML = ``
    carJson.forEach(element => {
        const { id, image, category, description, lot, price } = element
        const div = document.createElement("div")
        div.setAttribute("class", "card")
        div.innerHTML += `<div class="cards-carrito">
                <div id="cart-image">
                    <img src="${image}" alt="">
                </div>
                <div id="cart-desc">
                    <p>${description}</p>
                    <h5>${category}</h5>
                </div>
                <div id="cart-price">
                    <p>Price:</p>
                    <p>$${price}</p>
                </div>
                <div id="cart-calc">
                    <button class="numSub" onclick ="numSub(${price},${id})">-</button>
                    <input class="idNum${id}" type="text">
                    <button class="numAdd" onclick="numAdd(${price},${id})">+</button>
                </div>
                <div id="cart-total">
                    <p>Total</p>
                    <p id="totalPrice${id}"></p>
                </div>
                <div id="cart-delete">
                    <button class="btn btn-danger" onclick="deleteProd(${id})"><i class="bi bi-trash">Eliminar</i></button>
                    <button>Guardar</button>
                </div>
            </div>`
        contenedor.appendChild(div);

    });
}
mostrarCarrito()

function numAdd(_price, _id) {
    num = num + 1
    document.querySelector(`.idNum${_id}`).value = num
    let total = num * _price
    let _total = document.querySelector(`#totalPrice${_id}`)
    _total.innerText = total
    valorOrden = valorOrden + total
}

function numSub(_price, _id) {
    num = num - 1
    document.querySelector(`.idNum${_id}`).value = num
    let total = num * _price
    let _total = document.querySelector(`#totalPrice${_id}`)
    num < 0 ? num = 0 :
        _total.innerText = total
    valorOrden = valorOrden + total
}


function deleteProd(_param) {
    let myCart = JSON.parse(localStorage.getItem("Carrito"))
    let newCart = myCart.filter(element => element.id !== _param);
    let newCArtJson = JSON.stringify(newCart)
    localStorage.setItem("Carrito", newCArtJson)
    window.location.reload()
}

const createNewOrder = async (e) => {
    e.preventDefault()
    const nombre = document.querySelector("#nombre").value
    const direccion = document.querySelector("#direccion").value
    const telefono = document.querySelector("#telefono").value

    await createOrders(
        {
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            valor: valorOrden,
        }
    )
}

const formCreateData = document.querySelector("#createData")
formCreateData.addEventListener("submit", createNewOrder)

