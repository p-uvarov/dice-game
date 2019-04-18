/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, currentScore, winScore, activePlayer, isPlaying;
var previousDice1, previousDice2;

newGame();

document.querySelector(".btn-roll").addEventListener("click", function () {
    if(isPlaying) {
        var dice1 = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);

        console.log(dice1, dice2, previousDice1, previousDice2);

        if (dice1 === 6 && dice2 === 6 && previousDice1 === 6 && previousDice2 === 6) {
            score[activePlayer] = 0;
            document.getElementById("score-" + activePlayer).textContent = 0;
            changePlayer();
        }
        else if (dice1 !== 1 && dice2 !== 1) {
            currentScore += dice1 + dice2;
            document.getElementById("current-" + activePlayer).textContent = currentScore;
            document.querySelector(".dice1").src = "dice-" + dice1 + ".png";
            document.querySelector(".dice1").style.display = "block";
            document.querySelector(".dice2").src = "dice-" + dice2 + ".png";
            document.querySelector(".dice2").style.display = "block";
            previousDice1 = dice1;
            previousDice2 = dice2;
        } else {
            changePlayer();
        }
    }
});

document.querySelector(".btn-open-rules").addEventListener("click", function() {
    document.querySelector(".game-rules").style.display = "block";
});

document.querySelector(".btn-close-rules").addEventListener("click", function() {
    document.querySelector(".game-rules").style.display = "none";
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    if (isPlaying) {
        score[activePlayer] += currentScore;
        document.getElementById("score-" + activePlayer).textContent = score[activePlayer];
        if (score[activePlayer] >= winScore) {
            document.getElementById("name-" + activePlayer).textContent = "Winner";
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".dice1").style.display = "none";
            document.querySelector(".dice2").style.display = "none";
            isPlaying = false;
        }
        else {
            changePlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", newGame);

function changePlayer() {
    currentScore = 0;
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
    previousDice1 = 0;
    previousDice2 = 0;
}

function newGame() {
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;
    
    var inputScore = document.getElementById("winScore").value;

    if (inputScore) {
        winScore = inputScore;
    }
    else {
        winScore = 100;
        document.getElementById("winScore").value = 100;
    }
    
    previousDice1 = 0;
    previousDice2 = 0;

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    document.querySelector(".dice1").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
    document.querySelector(".player-0-panel").classList.add("active");
}
