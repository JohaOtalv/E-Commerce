const API_URL = "http://localhost:3000"

const API_PATHS = {
    "productos": "/productos",
    "ordenes": "/ordenes"
}
const handleError = (error) => {
    console.log(error)
}

const httpGET = async (path) => {
    try {
        console.log("peticion GET");
        console.log("Base api: " + API_URL);
        console.log("Ruta api: " + path);
        let response = await fetch(API_URL + path)
        let data = await response.json()
        return data
    } catch (error) {
        handleError(error)
    }
}
const httpPOST = async (path, newData) => {
    try {
        console.log("peticion POST");
        console.log("Base api: " + API_URL);
        console.log("Ruta api: " + path);

        let response = await fetch(
            API_URL + path,
            {
                method: "POST",
                body: JSON.stringify(newData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        let data = await response.json()
        return data
    } catch (error) {
        handleError(error)
    }
}

const httpPATCH = async (path, newProp, id) => {
    try {
        console.log("peticion PATCH");
        console.log("Base api: " + API_URL);
        console.log("Ruta api: " + path);

        let response = await fetch(
            API_URL + path + `/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify(newProp),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        let data = await response.json()
        return data

    } catch (error) {
        handleError(error)
    }
}

const httpDELETE = async (path, id) => {
    try {
        console.log("peticion DELETE");
        console.log("Base api: " + API_URL);
        console.log("Ruta api: " + path);

        let response = await fetch(
            `${API_URL}${path}/${id}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        let data = await response.json()
        return data

    } catch (error) {
        handleError(error)
    }
}

const getProducts = async () => await httpGET(API_PATHS.productos)
const createProducts = async (newProduct) => await httpPOST(API_PATHS.productos, newProduct)
const editProducts = async (id, newProp) => await httpPATCH(API_PATHS.productos, newProp, id)
const deleteProducts = async (id) => await httpDELETE(API_PATHS.productos, id)


const getOrders = async () => await httpGET(API_PATHS.ordenes)
const createOrders = async (newOrder) => await httpPOST(API_PATHS.ordenes, newOrder)
const editOrders = async (id, newProp) => await httpPATCH(API_PATHS.ordenes, newProp, id)
const deleteOrders = async (id) => await httpDELETE(API_PATHS.ordenes, id)