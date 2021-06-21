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


/**
 * Aqui vamos a ir transformando data para poder utilizarlo en las distintas peticiones 
 * Primero en data.info.count tenemos la cantidad, luego transformamos data a:
 * API/ID/ 
 * Luego nos metemos a la url donde esta la dimension que tenga ese personaje
 * y la sacamos entrando a ese link
 * */
fechData(API)
.then(data => {
    console.log(data.info.count);
    return fechData(`${API}${data.results[0].id}`);
})
.then(data => {
    console.log(data.name);
    return fechData(data.origin.url);
})
.then(data => {
    console.log(data.dimension);
})
.catch(err => {
    console.error(err);
});