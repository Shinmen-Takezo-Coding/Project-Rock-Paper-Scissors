function getComputerChoice () {
    
    let computerChoice = Math.floor(Math.random() * 3) + 1;
    
    if (computerChoice === 1) {
        computerChoice = "rock";
    } else if (computerChoice === 2) {
        computerChoice = "paper";
    } else {
        computerChoice = "scissors";
    }
    
    return computerChoice;

}

function getHumanChoice () {

   let humanChoice = prompt("Enter Rock, Paper, or Scissors:");
   return humanChoice;

}

const beats = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
};


function playGame () {

    function playRound (humanChoice, computerChoice) {
   
    humanChoice = humanChoice.trim().toLowerCase();

    if (humanChoice === computerChoice) {
        console.log("It's a tie!");
    } else if (beats[humanChoice] === computerChoice) {
        humanScore = humanScore + 1;
        console.log(`Human wins! ${humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)} beats ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}.`); 
    } else {
        computerScore = computerScore + 1;
        console.log(`Computer wins! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1)}.`);
    }

    }

    let humanScore = 0;
    let computerScore = 0;

    
    console.log(`--- Round 1 ---`);

    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();

    playRound(humanSelection, computerSelection);

    console.log(`Human: ${humanScore}`);
    console.log(`Computer: ${computerScore}`)


    let winner;

    if (humanScore > computerScore) {
    winner = "Human";
    } else if (computerScore > humanScore) {
    winner = "Computer";
    } else {
    winner = "It's a Tie!";
    }

    return winner;

}

const matchResult = playGame()
console.log(`Winner: ${matchResult}`);
