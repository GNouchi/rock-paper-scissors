//odin scope instructions

// Step 1: Setup the project structure
// Step 2: Write the logic to get the computer choice
// Step 3: Write the logic to get the human choice
// Step 4: Declare the players score variables
// Step 5: Write the logic to play a single round

// target element buttons 
document.getElementById("addOneCredit").addEventListener("click", addOneRound);
document.getElementById("reset").addEventListener("click", resetOutcomes);
document.getElementById("addFiveCredits").addEventListener("click", addFiveCredits);


let computerChoice='';
let playerChoice='';
let playerWin = 0;
let computerWin = 0;
let drawOutcome = 0;
let roundsPlayed = 0;
let roundCredits = 1;
let winner = '';

function addFiveCredits() {
        roundCredits=roundCredits+5;   
        if (roundsPlayed > 0) {updateResults();}
        // console.log(`+5 credits | Credits: ${roundCredits}`);
}
function addOneRound() {
        roundCredits=roundCredits+1;   
        if (roundsPlayed > 0) {updateResults();}
        // console.log(`+1 credit | Credits: ${roundCredits}`);
}

function isValidChoice(choice) {
    switch (choice) {
        case 'rock':
            return true;
        case 'paper':
            return true;
        case 'scissors':
            return true;
        default:
            return false;
    }
}
function generateRand(number) {
    let temp = Math.ceil(Math.random()*number);
    return temp;
}
function genComputerChoice() {
    switch (generateRand(3)) {
        case 1:
            console.log("Computer chose: rock");
            computerChoice='rock';
            break; 
        case 2:
            console.log("Computer chose: paper");
            computerChoice='paper';
            break;
        case 3:
            console.log("Computer chose: scissors");
            computerChoice='scissors';
            break;
        default:
            console.log("Computer chose: Error set to ''");
            computerChoice='';
    }
}
function resetPlayerChoice() {
    // console.log(`--Resetting player choice--`);
    return playerChoice='';
}

// main logic
function evaluateRound(cChoice,pChoice) {
    switch (true) {
        case (cChoice=='rock' && pChoice=='paper'):
        case (cChoice=='paper' && pChoice=='scissors'):
        case (cChoice=='scissors' && pChoice=='rock'):
            playerWin++;
            // console.log(`Player Wins!!`);
            break;
        case (cChoice=='rock' && pChoice=='scissors'):
        case (cChoice=='paper' && pChoice=='rock'):
        case (cChoice=='scissors' && pChoice=='paper'):      
            computerWin++;
            // console.log(`Computer Wins..`);    
            break;
        case (cChoice==pChoice):      
            drawOutcome++;
            // console.log(`Draw`);
            break;
        default:
            console.log(`::ERROR:: something went wrong in evaluateRound()`);
            break;
    }
    roundsPlayed++;
    roundCredits--;
    checkOutcomeVariance();
    checkForWinner();
    updateResults(); 
    return ;
}
//silent anti-cheat
function checkOutcomeVariance() {
    if(playerWin + computerWin + drawOutcome == roundsPlayed){
        return;
    }
    else {
        console.log(`reset needed`);
        resetOutcomes();
    }
    return;
}
//reset everything to base case
function resetOutcomes() {
    playerWin=0;
    computerWin=0;
    drawOutcome=0;
    roundsPlayed=0;
    playerChoice='';
    computerChoice='';
    roundCredits=0;
    winner = '';
    console.log(`::outcomes reset`);
}


function getPct(stat) {
    return Math.floor(stat/roundsPlayed*100)    
}
function updateResults() {
const resultsPara = document.querySelector("#results-para");
const credits = document.querySelector("#credits")
resultsPara.textContent = '';

let currentCredits = `Played: ${roundsPlayed}  |  CREDITS = ${roundCredits}`;
    credits.textContent = currentCredits;
let playerResult = document.createElement('p');
    playerResult.textContent = `Player Win (${getPct(playerWin)}%): ${playerWin}`;
    playerResult.setAttribute('class', 'resultPara');
let computerResult = document.createElement('p');
    computerResult.textContent = `Computer Win (${getPct(computerWin)}%): ${computerWin}`;
    computerResult.setAttribute('class', 'resultPara');
let drawResult = document.createElement('p');
    drawResult.textContent = `Draw (${getPct(drawOutcome)}%): ${drawOutcome}`;
    drawResult.setAttribute('class', 'resultPara');
if (winner!=='') {
let winnerResult = document.createElement('h5')
    winnerResult.textContent = `First to 5 wins was ${winner} but you can keep playing!`
    resultsPara.appendChild(winnerResult);
    }
    resultsPara.appendChild(playerResult);
    resultsPara.appendChild(computerResult);
    resultsPara.appendChild(drawResult);
}

function checkForWinner() {
    if (winner != '') { return ;}
    if (computerWin > 4 ) { winner = 'Computer'; }
    if (playerWin > 4 ) { winner = 'player'; }            
    return
}

function checkCredits() {
    if (roundCredits==0) {
        console.log(`CREDITS = ${roundCredits}`);
         return false;
    }
    else if (roundCredits>0) {
        console.log(`CREDITS = ${roundCredits}`);
        return true;
    }
    console.log(`::ERROR:: checkCredits() FAILED`); //THIS SHOULD NOT TRIGGER
    checkOutcomeVariance() ;
    return false;
}
function runGame() {
    if(!checkCredits()){
        return;
    }
    genComputerChoice();
    evaluateRound(computerChoice,playerChoice);
    resetPlayerChoice(); 
    // runGame(); //this runs all games until credits out
}




const rockButton  = document.querySelector("#rock");
const paperButton  = document.querySelector("#paper");
const scissorsButton  = document.querySelector("#scissors");

const choices = document.querySelector(".choices");

choices.addEventListener("click", (e)=>{
    let target = e.target;
    // console.log(target);
    switch (target.id) {
        case 'rock':
            playerChoice = 'rock'    
            // console.log(playerChoice);  
            runGame();  
            break;
        case 'paper':
            playerChoice = 'paper'    
            runGame();  
            break;
        case 'scissors':
            playerChoice = 'scissors'    
            runGame();  
            break;                            
        default:
            // console.log("unexpected happened");
            break;
    }    
})

