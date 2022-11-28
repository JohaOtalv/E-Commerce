let fav;
let favorites = []


async function addFavoritos(_param) {
    try {
        const res = await fetch(API_URL)
        console.log(res)
        const data = await res.json()
        let _id = data.find((element) => element.id === _param)
        favorites.push(_id)
        fav = JSON.stringify(favorites);
        localStorage.setItem("Favoritos", fav);
        mostrarFavoritos()
    } catch (error) {
        console.log(error)
    }
}

let cont = document.getElementById("unId")

function mostrarFavoritos() {

    let favJson = JSON.parse(localStorage.getItem("Favoritos"))
    cont.innerHTML = ``
    favJson.forEach(element => {
        console.log(element)
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
                    <li class="list-group-item">Eliminar de Favoritos <button onclick="deleteFav(${id})">X</button></li>
                </ul>
                <div class="card-body">
                    <button onclick="agregarAlCarrito(${id})" class="card-link">Añadir al Carrito</button> <br>
                    <button onclick="mostrarCarrito(${id})"class="card-link">Ver mi Carrito</button>
                </div>`
        cont.appendChild(div);
    });

}



function deleteFav(_param) {
    let myFavorites = JSON.parse(localStorage.getItem("Favoritos"))
    let newFavorites = myFavorites.filter(element => element.id !== _param);
    let newFavoritesJson = JSON.stringify(newFavorites)
    localStorage.setItem("Favoritos", newFavoritesJson)
    mostrarFavoritos()
}


