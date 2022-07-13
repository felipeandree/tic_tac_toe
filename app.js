/*

Vamos Criar uma variavel do elemento do status para poder acessar com mais facilidade*/

const statusDisplay = document.querySelector('.game--status');

/*Agora vamos declarar as variaveis do jogo*/

let gameActive = true;

//variavel do jogador atual
const players = {
    1: "X",
    2: "O",
  };
let currentPlayer = players[1];

// Aqui vamos salvar o estado atual do jogo

let gameState = ["", "", "", "", "", "", "", "", ""];

// Aqui vamos declarar algumas mensagens a serem exibidas durante o jogo

const winningMessage = () => `O Jogador ${currentPlayer} Ganhou!`;
const drawMessage = () => `O Jogo empatou`;
const currentPlayerTurn = () => `É a vez de ${currentPlayer}`;

// Mensagem inicial para saber quem inicia o jogo

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleCellPlayed(clickedCell, clickedCellIndex){
    /*Vamos atualizar o estado de jogo para refletir a jogada e atualizar a UI*/

gameState[clickedCellIndex] = currentPlayer;
clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChange(){
    //usamos o operador ternario para definir um novo jogador. 
    currentPlayer = currentPlayer === players[1] ? players[2] : players[1];
    statusDisplay.innerHTML = currentPlayerTurn();

}
function handleResultValidation (){
    let roundWon = false;
    for (let i = 0; i <= 7; i++){
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === ''|| b === '' || c === '') {
            continue;
        }
        if (a === b && b ===c ){
            roundWon = true;
            break
        }
    }
    
    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    /*Agora vamos verificar se existem celulas vazias*/
    let roundDraw = !gameState.includes("");
    if(roundDraw){
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

function handleCellClick(clikedCellEvent){
    //vamos salvar o clique em uma variavel para facilitar
    const clickedCell = clikedCellEvent.target;
    /*aqui vamos buscar a informação em nossa "data-cell-index" da celula escolhida. Para obter a informação utilizamos um .getAttribute que nos retorna uma string por isso utilizamos o parseInt para transformar em Number.*/
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

    // Agora vamos verificar se a jogada foi efetuada ou o jogo foi pausado.

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    //se tudo estiver em ordem seguimos com o jogo

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();


}
function handleRestartGame(){
    gameActive = true;
    currentPlayer = players[1];
    gameState = [ "", "", "", "", "", "", "", "", ""]
    statusDisplay.innerHTML= currentPlayerTurn();
    document.querySelectorAll('.cell')
    .forEach(cell => cell.innerHTML = "");
}

/* Em fim incluimos os event listeners nas celulas e no botão de reiniciar. board*/

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);


