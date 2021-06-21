const somethingWillHappen = () =>{
    /**
     * Esta manera de escribir código es de Ecma6
     */

    return new Promise((resolve, reject) =>{
    /**
     * Nuestra promesa recibe dos parametros, el primero se ejecuta
     * si todo salio correctamente y el segundo si falla.
     * También estamos utilizando arroy function.
     */

    if(true)//Si esto pasa se resuelve la promesa
    {
        resolve('heey!');
    }
    else{
        reject('oops!');
    }

    });
};

somethingWillHappen() //Al utilizar promesas hay que poner then y catch cuando llamamos la función
.then(response => console.log(response))
.catch(err => console.error(err));

const somethingWillHappen2 = () =>{

    return new Promise((resolve, reject) => {

        if (true) {
            setTimeout(()=>{
                resolve('Súper');
            }, 2000)
        }
        else{
            let error = new Error("oops!");
            reject(err);
        }

    });

};

somethingWillHappen2()
.then(response => console.log(response))
.catch(err => console.error(err));

/**
 * La manera de correr varias promesas al mismo tiempo
 */

Promise.all([somethingWillHappen(),somethingWillHappen2()])
.then(response => console.log("Arreglo de resultados: "+response))
.catch(err => console.error(err));