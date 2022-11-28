const prodAdmin = document.getElementById("idAdmin")

const CreateCard = async (productos) => {
    const div = document.createElement("div")
    div.setAttribute("class", "card")
    div.setAttribute("style", "width: 18rem;")
    div.innerHTML += `<img src="${productos.image}" alt="">
                <div class="card-body">
                    <h5 class="card-title">${productos.description}</h5>
                    <p class="card-text">${productos.category}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${productos.lot}gr</li>
                    <li class="list-group-item">$${productos.price}</li>
                </ul>
                <div class="card-body-button">
                     <button class="btn-modify">Modificar </button>
                </div>
                <div class="card-body-delete">
                     <button class="btn-delete" onclick="deleteProd(${productos.id})"><i class="bi bi-trash">Eliminar Producto</i></button> <br>
                </div>`
    prodAdmin.appendChild(div)
};

const createNewProd = async (e) => {
    e.preventDefault()
    await createProducts(
        {
            id: e.target.id.value,
            image: e.target.image.value,
            description: e.target.description.value,
            category: e.target.category.value,
            lot: e.target.lot.value,
            price: e.target.price.value
        }
    )
    e.target.id.value = ""
    e.target.image.value = ""
    e.target.category.value = ""
    e.target.description.value = ""
    e.target.lot.value = ""
    e.target.price.value = ""
    await showProducts()
}

const showProducts = async () => {
    prodAdmin.innerHTML = ""
    let data = await getProducts()
    data.forEach(productos => {
        CreateCard(productos)

    });
}

const deleteProd = async (id) => {
    await deleteProducts(id)
    prodAdmin.innerHTML = ""
}

const btnGetProducts = document.querySelector("#getProducts")
btnGetProducts.addEventListener("click", showProducts)

const formCreateProducts = document.querySelector("#createProduct")
formCreateProducts.addEventListener("submit", createNewProd)

const compras = document.getElementById("idCompras")

const CreateCardBuy = async (ordenes) => {
    const div = document.createElement("div")
    div.setAttribute("class", "card")
    div.setAttribute("style", "width: 18rem;")
    div.innerHTML += `<img src="${ordenes.id}" alt="">
                <div class="card-body">
                    <h5 class="card-title">${ordenes.nombre}</h5>
                    <p class="card-text">${ordenes.direccion}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${ordenes.telefono}</li>
                    <li class="list-group-item">$${ordenes.valor}</li>
                </ul>
                <div class="card-body-button">
                     <button class="btn-modify">Modificar </button>
                </div>
                <div class="card-body-delete">
                     <button class="btn-delete" onclick="deleteProd(${ordenes.id})"><i class="bi bi-trash">Eliminar Orden</i></button> <br>
                </div>`
    compras.appendChild(div)
};

const showBuy = async () => {
    let data = await getOrders()
    data.forEach(ordenes => {
        CreateCardBuy(ordenes)
    });
}
const btnGetOrders = document.querySelector("#viewBuy")
btnGetOrders.addEventListener("click", showBuy)