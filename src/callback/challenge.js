/* 
Estamos ejecutando en terminal por node
Como estamos trabajando sobre node es necesario descargar una dependecia
la cual nos ayude a realizar peticiones al servidor
Instalar dependencia: $ npm i xmlhttprequest --save

el (--save) significa que es una dependecia de desarrollo
*/

let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';


//Esta función le da vida a las llamadas de las API
function fechData(url_api,callback) {
    let xhttp  = new XMLHttpRequest();
    xhttp.open('GET',url_api,true); 
    /*Aqui le estoy diciendo que quiero hacer una petición a esa url de tipo GET
    o sea que quiero traer los valores que se encuentren ahí y el true significa
    que lo queremos con asincronismo (No es necesario poner true el ya viene por defecto)
    o sea puede ser: xhttp.open('GET',url_api);
    */
    xhttp.onreadystatechange = function (event) {
        /*
        Aqui vamos a hacer una validación para ver si ejecutamos el callback
        el  xhttp.onreadystatechange puede regresarme 5 estados, pero el que necesitamos
        es el estado 4 que es donde ya se ha completado la conexión
        */
       if(xhttp.readyState === 4){
           //Ahora debemos verificar el estatus de la pagina web (200 es que todo esta bien)
        if(xhttp.status === 200){
            /**
             * Los callback dentro de node estamos programados para recibir los siguientes parametros:
             * callback(Error, Resultado Exitoso)
             */
            callback(null, JSON.parse(xhttp.responseText));
            /**
             * Aqui debemos hacer un parse a JSON ya que esta petición me regresa todo en formato texto
             * Como no tengo un mensaje o  función de error le puedo mandar null xd
             */
        }
        else{
            const error = new Error('Error ' + url_api);
            callback(error, null); //Aqui null porque no puedo mandar un resultado que nunca llegó
        }
       }
    }
    xhttp.send();
}


/**Hacer la petición a la API */
fechData(API, function (error1, data1) {
    /*
    Data 1  = API = 'https://rickandmortyapi.com/api/character/';
    */
    if (error1) {
        return console.error(error1);
    }
    fechData(API + data1.results[0].id, function (error2, data2) {
        /*
        ID = primer id que este en el arreglo results
        Data 2 = 'https://rickandmortyapi.com/api/character/ ID /
        */
        if (error2) {
            return console.error(error2);
        }
        fechData(data2.origin.url, function (error3, data3) {
            /*
            DATA 3 = 'https://rickandmortyapi.com/api/character/1 
            dentro de ese id hay una clase llamada origin que tiene
            un valor llamado url en donde esta la dimensión del personaje
            y ahí la extraemos
            */
            if (error3) {
                return console.error(error3);
            }
            console.log(data1.info.count);
            console.log("Información:\n" + "Nombre: "+data2.name + "\nEstado: "+ data2.status + "\nGenero: "+ data2.gender);
            console.log("Dimensión: "+data3.dimension);
            
        })
    })
})