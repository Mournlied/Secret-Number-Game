
let secretNumber = 0; //Var for the secret number
let tries = 0; //var for the number of tries until finding the correct number
let pastNumbersList = []; //This list will include the previously generated secret numbers
let maxSecretNumbers = 10; //This will prevent the app to try generating more secret numbers after the 10th

//This function sets the app to its starting conditions.
function startingConditions() {
    assignTextElement('p',`Input a number from 1 to ${maxSecretNumbers}`);
    assignTextElement('h1','Find the secret number!');
    secretNumber = generateSecretNumber();
    tries = 1;
    //console.log(secretNumber); Used for testing. Enable if necessary.
}

//This function is used to change the text displayed on screen.
function assignTextElement(element, text) {
    let elementHTML = document.querySelector(element);
    elementHTML.innerHTML = text;
    return;
}

//This function compares the secret and user numbers and change the text on screen according to the results.
function checkTry() {
    let userNumber = parseInt(document.getElementById('userValue').value); //parseInt to make sure the user number is not a string
    
    if (userNumber === secretNumber) {
        assignTextElement('p',`You found it! You got it in ${intentos} ${(intentos === 1) ? 'try' : 'tries'}`); //Success message. Fixed the wording problem for singular or multiple tries.
        document.getElementById('reset').removeAttribute('disabled'); //Enable the reset button only after winning the current game.
    } else {
        if (userNumber > secretNumber) { //Failure message + a hint.
            assignTextElement('p',`Sorry, try again. The secret number is lower than ${userNumber}`);
        } else {
            assignTextElement('p',`Sorry, try again. The secret number is greater than ${userNumber}`);
            }
        tries++; //Increase the number of tries to be displayed after winning.
        clearBox();
        }    
    return;
}

//Just a QoL function so the user doesn't need to manually clear the text box.
function clearBox() {
    document.querySelector('#userValue').value = '';
    return;
} 

//This function generate and returns a unique secret number.
function generateSecretNumber() {
    let generatedNumber = Math.floor(Math.random()*maxSecretNumbers)+1;
    if (pastNumbersList.length == maxSecretNumbers) { //This makes sure the app can't try generating new numbers after already using all 10 numbers.
        assignTextElement('p','All possible numbers were already used'); //True end message.
    } else {   
        if (pastNumbersList.includes(generatedNumber)) { 
            return generateSecretNumber(); //If the generated number was already used the function tries again.
        } else {
            pastNumbersList.push(generatedNumber);
            return generatedNumber; //If the generated number wasn't already used the function returns the new secret number.
        }
    }    
}

//This function resets the game to be played again.
function resetGame() {
    clearBox();
    startingConditions();
    document.querySelector('#reset').setAttribute('disabled','true'); //This dissable the new game button until the user wins again.

}

//Just to start the app.
startingConditions();
