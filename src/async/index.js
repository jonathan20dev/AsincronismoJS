const doSomethingAsync = () => {
    return new Promise((resolve, reject) => {
        (true) 
         ? setTimeout(() => resolve('Do Something async'),1000)
         : reject(new Error('Test Error'))
    });
}

const doSomething = async () => {
    const something = await doSomethingAsync();
    console.log(something);
}

console.log('Before');
doSomething();
console.log('After');

const anotherAsync = async () => {
    const something = await doSomethingAsync();
    console.log("Segundo: " +something)
}

console.log('Before 1');
anotherAsync();
console.log('After 1');

