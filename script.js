//odin scope instructions

// Step 1: Setup the project structure
// Step 2: Write the logic to get the computer choice
// Step 3: Write the logic to get the human choice
// Step 4: Declare the players score variables
// Step 5: Write the logic to play a single round

// target element buttons 
document.getElementById("promptPlayer").addEventListener("click", addOneRound);
document.getElementById("reset").addEventListener("click", resetOutcomes);
document.getElementById("addFiveRounds").addEventListener("click", addFiveRounds);


let computerChoice='';
let playerChoice='';
let playerWin = 0;
let computerWin = 0;
let drawOutcome = 0;
let roundsPlayed = 0;
let roundCredits = 1;

function addFiveRounds() {
        roundCredits=roundCredits+5;   
        console.log(`added 5 credits`);
        runGame();
}
function addOneRound() {
        roundCredits=roundCredits+1;   
        console.log(`added 1 credit`);
        runGame();
}
function cleanChoice(choice='') {
        // console.log(`cleanedChoice() original is "${choice}" result will be "${choice.toLowerCase()}"`);
        // console.log(`cleanedChoice()`);
        choice = choice.toLowerCase();
        return choice;
}
function isValidChoice(choice) {
    switch (choice) {
        case 'rock':
            // console.log("isValidChoice(): TRUE(rock)");
            return true;
        case 'paper':
            // console.log("isValidChoice(): TRUE(paper)");
            return true;
        case 'scissors':
            // console.log("isValidChoice(): TRUE(scissors)");
            return true;
        default:
            // console.log("isValidChoice(): FALSE");
            // alert("Invalid input detected, please check spelling of rock paper scissors")
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
    // console.log(`resetPlayerChoice()`);
    playerChoice='';
    return ;
}

//this could probably chain into eval
function promptPlayer() {
    resetPlayerChoice();
    let playerPrompt = prompt("Choose One:\n        rock paper scissors");    
    // console.log(`::initial prompt logged ${playerPrompt}`);
    let tempCleaned = cleanChoice(playerPrompt);
    if (isValidChoice(tempCleaned)) {
        playerChoice= tempCleaned;
        // console.log(`!!SUCCESS!! set playerChoice`);
        // console.log(`::playerChoice ${playerChoice} | computerChoice ${computerChoice}`);
        // console.log(`::playerWin ${playerWin} | computerWin ${computerWin} | drawOutcome = ${drawOutcome}`);
        console.log(`-- proceed to eval --`);
        return;
    }  
    else {
        console.log("*****FAILED validity check - REPROMPT*****");
        promptPlayer();
        // recursive reprompt if invalid 
    }
}


function evaluateRound(cChoice,pChoice) {
    // console.log(`pChoice ${pChoice} | cChoice ${cChoice}`);
    switch (true) {
        case (cChoice=='rock' && pChoice=='paper'):
        case (cChoice=='paper' && pChoice=='scissors'):
        case (cChoice=='scissors' && pChoice=='rock'):
            playerWin++;
            console.log(`Player Wins!!`);
            break;
        case (cChoice=='rock' && pChoice=='scissors'):
        case (cChoice=='paper' && pChoice=='rock'):
        case (cChoice=='scissors' && pChoice=='paper'):      
            computerWin++;
            console.log(`Computer Wins..`);    
            break;
        case (cChoice==pChoice):      
            drawOutcome++;
            console.log(`Draw`);
            break;
        default:
            console.log(`::ERROR:: something went wrong in evaluateRound()`);
            break;
    }
    // if(cChoice==pChoice){
    //     drawOutcome++;
    //     console.log(`Draw`);
    // }
    // if (cChoice=='rock' && pChoice=='paper' ||
    //     cChoice=='paper' && pChoice=='scissors' ||
    //     cChoice=='scissors' && pChoice=='rock'){
    //     playerWin++;
    //     console.log(`Player Wins`);
    // } 
    // if (cChoice=='rock' && pChoice=='scissors' ||
    //     cChoice=='paper' && pChoice=='rock' ||
    //     cChoice=='scissors' && pChoice=='paper'){
    //     computerWin++;
    //     console.log(`Computer Wins`);
    // } 
    roundsPlayed++;
    roundCredits--;
    checkOutcomeVariance();
    logRound(); //just a logging statement doesn't change any values
    return ;
}
//silent anti-cheat
function checkOutcomeVariance() {
    if(playerWin + computerWin + drawOutcome == roundsPlayed){
        // console.log(`no variance`);
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
    console.log(`::outcomes reset`);
}

function logRound() {
        console.log(`::Round Results::
            ROUNDS PLAYED: ${roundsPlayed}
            playerWin ${playerWin} | computerWin ${computerWin} | drawOutcome = ${drawOutcome} | credits = ${roundCredits}`);    
}
function checkCredits() {
    if (roundCredits==0) {
        console.log(`CREDITS = ${roundCredits}`);
        // console.log(`::Out of Credits::
        //     ROUNDS PLAYED: ${roundsPlayed}
        //     playerWin ${playerWin} | computerWin ${computerWin} | drawOutcome = ${drawOutcome} | credits = ${roundCredits}`);    
        return false;
    }
    else if (roundCredits>0) {
        console.log(`CREDITS = ${roundCredits}`);
        return true;
    }
    console.log(`::ERROR:: checkCredits() FAILED`); //THIS SHOULD NOT TRIGGER
    checkOutcomeVariance() //run anti-cheat
    return false;
}

//**  should continue as long as roundCredits > 0 **//
function newRound() {
    console.log(`hello new round. Credit: ${roundCredits}`);
}

function runGame() {
    if(!checkCredits()){
        return;
    }
    genComputerChoice();
    promptPlayer();
    evaluateRound(computerChoice,playerChoice); 
    runGame(); //recursive call to allow for multiple games
}

// GAME START
// genComputerChoice();
// promptPlayer();
// evaluateRound(computerChoice,playerChoice); 
runGame();

// resetOutcomes();
