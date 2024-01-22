
let numeroSecreto = 0;
let intentos = 0;
let pastNumbersList = [];
let maxSecretNumbers = 10;

function startingConditions() {
    asignarTextoElemento('p',`Indica un número del 1 al ${maxSecretNumbers}`);
    asignarTextoElemento('h1','Juego del número secreto!');
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`You found it! You got it in ${intentos} ${(intentos === 1) ? 'try' : 'tries'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p',`Sorry, try again. The secret number is lower than ${numeroDeUsuario}`);
        } else {
            asignarTextoElemento('p',`Sorry, try again. The secret number is greater than ${numeroDeUsuario}`);
            }
        intentos++;
        cleanBox();
        }    
    return;
}

function cleanBox() {
    document.querySelector('#valorUsuario').value = '';
    return;
} 

function generarNumeroSecreto() {
    let generatedNumber = Math.floor(Math.random()*maxSecretNumbers)+1;
    if (pastNumbersList.length == maxSecretNumbers) {
        asignarTextoElemento('p','All possible numbers were already used');
    } else {   
        if (pastNumbersList.includes(generatedNumber)) {
            return generarNumeroSecreto();
        } else {
            pastNumbersList.push(generatedNumber);
            return generatedNumber;
        }
    }    
}

function resetGame() {
    cleanBox();
    startingConditions();
    document.querySelector('#reiniciar').setAttribute('disabled','true');

}

startingConditions();