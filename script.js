//odin scope instructions

// Step 1: Setup the project structure
// Step 2: Write the logic to get the computer choice
// Step 3: Write the logic to get the human choice
// Step 4: Declare the players score variables
// Step 5: Write the logic to play a single round

// target element buttons 
// addEventListener('click',#promptPlayer) 
// addEventListener('click',#reset) 

let computerChoice='';
let playerChoice='';
let playerWin = 0;
let computerWin = 0;
let drawOutcome = 0;
let roundsPlayed = 0;
let roundCredits = 1;

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
            console.log("isValidChoice(): FALSE");
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
            console.log("genComputerChoice(): rock");
            computerChoice='rock';
            break; 
        case 2:
            console.log("genComputerChoice(): paper");
            computerChoice='paper';
            break;
        case 3:
            console.log("genComputerChoice(): scissors");
            computerChoice='scissors';
            break;
        default:
            console.log("genComputerChoice(): Error set to ''");
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
    console.log(`::initial prompt logged ${playerPrompt}`);
    let tempCleaned = cleanChoice(playerPrompt);
    if (isValidChoice(tempCleaned)) {
        playerChoice= tempCleaned;
        // console.log(`!!SUCCESS!! set playerChoice`);
        console.log(`::playerChoice ${playerChoice} | computerChoice ${computerChoice}`);
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
    if(cChoice==pChoice){
        drawOutcome++;
        roundsPlayed++;
        console.log(`Draw`);
        checkOutcomeVariance(playerWin,computerWin,drawOutcome,roundsPlayed);
        endRound();
        return;
    }
    if (cChoice=='rock' && pChoice=='paper' ||
        cChoice=='paper' && pChoice=='scissors' ||
        cChoice=='scissors' && pChoice=='rock')
        {
        playerWin++;
        roundsPlayed++;
        console.log(`Player Wins`);
        checkOutcomeVariance(playerWin,computerWin,drawOutcome,roundsPlayed);
        endRound();
        return; 
    } 
    if (cChoice=='rock' && pChoice=='scissors' ||
        cChoice=='paper' && pChoice=='rock' ||
        cChoice=='scissors' && pChoice=='paper')
        {
        computerWin++;
        roundsPlayed++;
        console.log(`Computer Wins`);
        checkOutcomeVariance();
        endRound();
        return;
    } 
    // console.log(`::end of single game function ***THIS SHOULD NOT RUN`);   //CATCH
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
    console.log(`outcomes reset`);
}

function endRound() {
    if (roundCredits==0) {
        return
    }
    if (roundCredits>0) {
        roundCredits--;  //leaving decrement here lets errors occur on new rounds without changing current structure
        console.log(`::END GAME::
            ROUNDS PLAYED: ${roundsPlayed}
            playerWin ${playerWin} | computerWin ${computerWin} | drawOutcome = ${drawOutcome} | credits = ${roundCredits}`);    
        newRound();
    }

}

//**  should continue as long as roundCredits > 0 **//
function newRound() {
    console.log(`hello new round. Credit: ${roundCredits}`);
}
// GAME START
genComputerChoice();
promptPlayer();
evaluateRound(computerChoice,playerChoice); 

// resetOutcomes();
