let order = [];
let clickedOrder = [];
let score = 0;

/*
0 - verder
1 - vermelho
2 - amarelo
3 - azul
*/ 

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const defeat = document.querySelector('.game-over');
const renderPoints = document.querySelector('.points');

//Cria ordem aleatória de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);

        lightColor(elementColor, Number(i) + 1);
    }
}

//Acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 350);
    setTimeout(() => {
        element.classList.remove('selected');
    },number - 100);

}

//Checa se os botões clicados são iguais aos da ordem do jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length){
        nextLevel();
    }
}

//Função parao clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);

}

//Função que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    }else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//Atualiza a pontuação
let points = (score) => {
    let pts = 0
   
    if(score <= 5) {
        pts = score * 5;
    }else if (score >= 6 && score <= 10) {
        pts = score * 10
    }else {
        pts = score * 20
    }

    renderPoints.innerHTML = `
    <h2>Nível: ${score}</h2>
    <h3>pontos: ${pts}</h3>`
}

//Função para proximo nível do jogo
let nextLevel = () => {
    score++;
    points(score);
    shuffleOrder();
}

//Função para game over
let gameOver = () => {
    //alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar novo jogo`);
    let pts = 0;
    if(score <= 5) {
        pts = score * 5;
    }else if (score >= 6 && score <= 10) {
        pts = score * 10
    }else {
        pts = score * 20
    }
    defeat.innerHTML = `
    <h2>Você perdeu no nível ${score}!</h2>
    <h3>Com ${pts} pontos</h3>
    <button onclick="playGame()">Restart</button>`;
    order = [];
    clickedOrder = [];
    green.classList.add('disabledbutton')
    blue.classList.add('disabledbutton')
    red.classList.add('disabledbutton')
    yellow.classList.add('disabledbutton')
}

//Função de inicio do jogo
let playGame = () => {
    score = 0;
    green.classList.remove('disabledbutton')
    blue.classList.remove('disabledbutton')
    red.classList.remove('disabledbutton')
    yellow.classList.remove('disabledbutton')
    defeat.innerHTML = ''
    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

