function sum(num1, num2) {
    return num1 + num2;
}

function calc(num1, num2, callback) {
    return callback(num1, num2);
}

//console.log(calc(8,8,sum));

function date(callback) {
    let date = new Date;
    console.log("Fecha Actual: "+ date); //La fecha actual
    setTimeout(function () {
        callback(date);
    },3000)
}

function printDate(dateNow) {
    console.log("Fecha Luego de 3 seg: "+dateNow);
}

console.log(date(printDate));