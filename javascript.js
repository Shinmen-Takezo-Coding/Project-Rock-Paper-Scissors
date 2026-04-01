/* -------------------------------------------------------------------------- */
/* 1. SELECTORS                                */
/* -------------------------------------------------------------------------- */
const playerSelectionListener = document.querySelector(".selection-dock");
const roundDisplay            = document.querySelector("#current-round");
const humanChoiceDisplay      = document.querySelector("#human-choice-display");
const computerChoiceDisplay   = document.querySelector("#cpu-choice-display");
const roundResultText         = document.querySelector("#round-result-text");
const nextRoundBtn            = document.querySelector("#next-round-btn");
const playerScoreDisplay      = document.querySelector("#player-score");
const cpuScoreDisplay         = document.querySelector("#cpu-score");

/* -------------------------------------------------------------------------- */
/* 2. DATA & CONSTANTS                            */
/* -------------------------------------------------------------------------- */
const gameState = {
    playerChoice: '',
    computerChoice: '',
    roundNumber: 1,
    playerScore: 0,
    computerScore: 0,
    maxWins: 5,
    outcome: null,
    isGameOver: false
};

const choices = { 1: "Rock", 2: "Paper", 3: "Scissors" };

const beats = {
    "Rock": "Scissors",
    "Paper": "Rock",
    "Scissors": "Paper"
};

const choiceIcons = {
    "Rock": "✊",
    "Paper": "✋",
    "Scissors": "✌️"
};

const resultMessages = {
    "win": "Victory! You smashed the CPU!",
    "lose": "Defeat! The CPU outsmarted you.",
    "tie": "It's a Draw! Great minds think alike."
};

/* -------------------------------------------------------------------------- */
/* 3. THE CONDUCTOR & EVENTS                          */
/* -------------------------------------------------------------------------- */

// Listener triggers the Conductor
playerSelectionListener.addEventListener("click", (event) => {
    // This finds the button even if they click the span inside it
    const btn = event.target.closest(".choice-btn");
    
    if (btn) {
        const selectionId = Number(btn.dataset.choice);
        handlePlayerTurn(selectionId);
    }
});

// The Conductor: Manages the sequence of a turn
function handlePlayerTurn(selectionId) {
    disableSelectionButtons();
    
    gameState.playerChoice = choices[selectionId];
    updateHumanUI();

    // The Suspense Phase
    setTimeout(() => {
        getComputerChoice(); 
        playRound(gameState.playerChoice, gameState.computerChoice);

        // The Reveal Phase
        updateComputerUI();
        updateScoreUI();
        updateRoundWinnerUI();
        
        nextRoundBtn.style.display = 'block';
    }, 1500); 
}

// Resets the board for the next round
function resetRound() {
    gameState.roundNumber++;
    gameState.playerChoice = null;
    gameState.computerChoice = null;
    gameState.outcome = null;

    updateRoundUI();
    updateHumanUI();    
    updateComputerUI(); 
    updateRoundWinnerUI(); 
    updateScoreUI();

    enableSelectionButtons();      
    nextRoundBtn.style.display = 'none'; 
}

/* -------------------------------------------------------------------------- */
/* 4. GAME LOGIC                               */
/* -------------------------------------------------------------------------- */

function getComputerChoice() {
    const computerSelection = Math.floor(Math.random() * 3) + 1;
    gameState.computerChoice = choices[computerSelection];
}

function playRound(humanChoice, computerChoice) {
    let result;

    if (humanChoice === computerChoice) {
        result = "tie";
    } else if (beats[humanChoice] === computerChoice) {
        result = "win";
        gameState.playerScore++;
    } else {
        result = "lose";
        gameState.computerScore++;
    }

    gameState.outcome = result;
    return result;
}

/* -------------------------------------------------------------------------- */
/* 5. UI WORKERS                               */
/* -------------------------------------------------------------------------- */

function updateHumanUI() {
    const choiceName = gameState.playerChoice;
    humanChoiceDisplay.textContent = choiceIcons[choiceName] || "❓";
}

function updateComputerUI() {
    const choiceName = gameState.computerChoice;
    computerChoiceDisplay.textContent = choiceIcons[choiceName] || "❓";
}

function updateRoundWinnerUI() {
    const roundResult = gameState.outcome;
    roundResultText.textContent = resultMessages[roundResult] || "Waiting for your move...";
}

function updateRoundUI() {
    roundDisplay.textContent = `${gameState.roundNumber}`;
}

function updateScoreUI() {
    playerScoreDisplay.textContent = gameState.playerScore;
    cpuScoreDisplay.textContent = gameState.computerScore;
}

/* -------------------------------------------------------------------------- */
/* 6. UTILITIES                               */
/* -------------------------------------------------------------------------- */

function disableSelectionButtons() {
    playerSelectionListener.querySelectorAll('button').forEach(btn => btn.disabled = true);
}

function enableSelectionButtons() {
    playerSelectionListener.querySelectorAll('button').forEach(btn => btn.disabled = false);
}

nextRoundBtn.addEventListener("click", resetRound);