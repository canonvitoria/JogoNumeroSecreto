// let title = document.querySelector('h1');
// title.innerHTML = 'Número Secreto';

// let paragraph = document.querySelector('p');
// paragraph.innerHTML = 'Escolha um número entre 1 e 10';

let listNumbers = [];
let numberLimit = 10
let secretNumber = generateNumber();
let attempts = 1;

function displayText(tag, text){
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.2})
}

function displayMensager() {
    displayText('h1', 'Número Secreto');
    displayText('p', 'Escolha um número entre 1 e 10');
}

displayMensager();

function checkKick(){
    let kick = document.querySelector('input').value;
    if (kick == secretNumber) {
        displayText('h1', 'Você acertou!');
        let numAttempts = attempts > 1 ? 'tentativas' : 'tentativa';
        let msgAttempts = `Você descobriu o número secreto com ${attempts} ${numAttempts}!`;
        displayText('p', msgAttempts);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (kick > secretNumber) {
            displayText('p', 'O número secreto é menor');
        } else {
            displayText('p', 'O número secreto é maior');
        } 
        //attempts = attempts + 1;
        attempts++;
        clearField()
    }
}

function generateNumber() {
    let chosenNumber = parseInt(Math.random() * numberLimit + 1);
    let quantityList = listNumbers.length;

    if (quantityList == numberLimit) {
        listNumbers = [];
    }

    if (listNumbers.includes(chosenNumber)) {
        return generateNumber();
    } else {
        listNumbers.push(chosenNumber)
        return chosenNumber;
    }
}

function clearField() {
    kick = document.querySelector('input');
    kick.value = '';
}

function restartGame() {
    secretNumber = generateNumber();
    clearField();
    attempts = 1;
    displayMensager();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}