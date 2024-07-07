//odin scope instructions

// Step 1: Setup the project structure
// Step 2: Write the logic to get the computer choice
// Step 3: Write the logic to get the human choice
// Step 4: Declare the players score variables
// Step 5: Write the logic to play a single round

let computerChoice='';
let playerChoice='scissors';
let playerWin=0;
let computerWin=0;

function cleanChoice(choice) {
    console.log(`ran cleanedChoice() original is "${choice}" result will be "${choice.toLowerCase()}"`);
    choice = choice.toLowerCase();
    return choice;
}
function isValidChoice(choice) {
    // force cleaned input
    choice= cleanChoice(choice);
    switch (choice) {
        case 'rock':
            console.log("ran isValidChoice outcome: rock");
            true;
            break; 
        case 'paper':
            console.log("ran isValidChoice outcome: paper");
            true;
            break;
        case 'scissors':
            console.log("ran isValidChoice outcome: scissors");
            true;
            break;
        default:
            console.log("default");
            false;
    }
}
function generateRand(number) {
    let temp = Math.ceil(Math.random()*number);
    // console.log(`ran generateRand() temp is ${temp}`);    
    return temp;
}

function genComputerChoice() {
    switch (generateRand(3)) {
        case 1:
            console.log("genComputerChoice outcome: rock");
            computerChoice='rock';
            break; 
        case 2:
            console.log("genComputerChoice outcome: paper");
            computerChoice='paper';
            break;
        case 3:
            console.log("genComputerChoice outcome: scissors");
            computerChoice='scissors';
            break;
        default:
            console.log("genComputerChoice outcome: default");
            computerChoice='';
    }
}
genComputerChoice();
// isValidChoice(computerChoice); //this should not run on computerChoice normally
// isValidChoice(playerChoice);