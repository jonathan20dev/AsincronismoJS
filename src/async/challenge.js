const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';


//Esta función le da vida a las llamadas de las API
const fechData = (url_api) => {
    return new Promise((resolve, reject) => {
        const xhttp  = new XMLHttpRequest();
        xhttp.open('GET',url_api,true);
        xhttp.onreadystatechange = (()=> {
            
        if(xhttp.readyState === 4){
            //Ahora debemos verificar el estatus de la pagina web (200 es que todo esta bien)
            (xhttp.status === 200)    
            /**
             * (xhttp.status === 200) sigue siendo una condición solo que sin un if antes
             * aqui el ? significa que si se cumplió la condición y 
             * los : son si no se cumple la condición
             */
                ? resolve(JSON.parse(xhttp.responseText))
                : reject (new Error('Error ' + url_api))
        }
    });
        xhttp.send();
    });
}

const anotherFunction = async (url_API) =>{
    try{
        //Aqui vamos a traer la cantidad de personajes que hay
        const data = await fechData(url_API) 
        //aqui es para traer el nombre
        const character = await fechData(`${url_API}${data.results[0].id}`);
        //Aqui es para traer la dimension
        const origin = await fechData(character.origin.url);
        //imprimir
        console.log(data.info.count);
        console.log(character.name);
        console.log(origin.dimension);
    }catch (error){
        console.error(error);
    }
}

console.log('before');
anotherFunction(API);
console.log('after');