// Score variables //

let humanScore = 0;
let computerScore = 0;
const playAgainBtn = document.querySelector("#play-again-btn");

// icons //

const icons = {
    rock: "✊",
    paper: "📄",
    scissors: "✂️"
};

// Computer choice function //

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

// playRound function //

function playRound(humanChoice, computerChoice) {
    
    const h = humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1);
    const c = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);

    if (humanChoice === computerChoice) {
        return `It's a tie! Both chose ${h}`;
    }

    if (
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock') ||
        (humanChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return `You win! ${h} beats ${c}`;
    } else {
        return `You lose! ${c} beats ${h}`;
    }
}

// updateScore function //

function updateScore(result, hChoice, cChoice) {
// 1. Logic Update
    if (result.includes("win")) humanScore++;
    if (result.includes("lose")) computerScore++;

    // 2. The "Last Round" UI Update (Must happen before the exit)
    updateScoreboard();
    updateCards(hChoice, cChoice);
    
    const finalResult = document.querySelector("#final-result");
    finalResult.textContent = "Round Result: " + result;

    // 3. The Series Check
    if (humanScore === 5 || computerScore === 5) {
        endGame(); // This will OVERWRITE the text with "SERIES OVER"
        return true; 
    }
    return false;
}

// Update UI functions //

function updateCards(human, computer) {
    const playerIcon = document.querySelector("#player-selection-icon");
    const playerText = document.querySelector("#player-selection-text");
    const computerIcon = document.querySelector("#computer-selection-icon");
    const computerText = document.querySelector("#computer-selection-text");

    // 1. Icons: Use emoji from object or fallback to the "?" itself
    playerIcon.textContent = icons[human] || human;
    computerIcon.textContent = icons[computer] || computer;

    // 2. Text: Check for the "?" to return to the original "Waiting" state
    if (human === "?") {
        playerText.textContent = "Waiting...";
        computerText.textContent = "Waiting for you...";
    } else {
        // Only capitalize if it's an actual move (rock, paper, scissors)
        playerText.textContent = human.charAt(0).toUpperCase() + human.slice(1);
        computerText.textContent = computer.charAt(0).toUpperCase() + computer.slice(1);
    }
}

// updateScoreBoard function //

function updateScoreboard() {
    const scoreDisplay = document.querySelector("#current-score");
    
    scoreDisplay.textContent = `Player: ${humanScore} | Computer: ${computerScore}`;
}

// endGame function //

function endGame() {
    // 1. Show the "Play Again" button
    
    playAgainBtn.style.display = "block";

    // 2. Disable all choice buttons (The Lockdown)
    const choiceBtns = document.querySelectorAll(".choice-btn");
    choiceBtns.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.5"; // Visual cue the game is over
        btn.style.cursor = "not-allowed";
    });

    // 3. Final Victory/Defeat Message
    const finalResult = document.querySelector("#final-result");
    finalResult.textContent = humanScore === 5 ? "🏆 SERIES OVER: YOU WIN!" : "💻 SERIES OVER: AI WINS!";
}

// resetGame function //

function resetGame() {
    // 1. Reset the Logic (The "Survival" Data)
    humanScore = 0;
    computerScore = 0;

    // 2. Reset the Scoreboard UI
    updateScoreboard(); // Reuses your existing function to show 0 - 0

    // 3. Reset the Text & Icons
    const finalResult = document.querySelector("#final-result");
    finalResult.textContent = "First to 5 wins the series!";
    updateCards("?", "?"); // Reuses your card update logic

    // 4. Re-enable the Choice Buttons
    const choiceBtns = document.querySelectorAll(".choice-btn");
    choiceBtns.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    });

    // 5. Make the Play Again button vanish
    playAgainBtn.style.display = "none";
}

// Buttons and Game Round Event handler //

const rockBtn = document.querySelector("#rock");
const paperBtn = document.querySelector("#paper");
const scissorsBtn = document.querySelector("#scissors");
const btnContainer = document.querySelector("#button-container");

btnContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains('choice-btn')) {

        const humanChoice = e.target.id;

        const computerChoice = getComputerChoice();

        const roundResult = playRound(humanChoice, computerChoice);

        const isGameOver = updateScore(roundResult, humanChoice, computerChoice); 

        if (isGameOver) return;
    }

});

// Play again button event handler //

playAgainBtn.addEventListener("click", resetGame);