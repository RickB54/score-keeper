const playerColors = ["red", "blue", "green", "purple", "orange", "gray", "yellow", "brown"];
const scoreboard = document.getElementById("scoreboard");
const numPlayersInput = document.getElementById("num-players");
const playerNamesDiv = document.getElementById("player-names");
const applySettingsBtn = document.getElementById("apply-settings");

function createPlayerInputs(num) {
    playerNamesDiv.innerHTML = "";
    for (let i = 0; i < num; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Player ${i + 1} Name`;
        input.id = `player-${i}`;
        playerNamesDiv.appendChild(input);
        playerNamesDiv.appendChild(document.createElement("br"));
    }
}

function createPlayerCard(name, index) {
    const card = document.createElement("div");
    card.classList.add("player-card");
    card.style.backgroundColor = playerColors[index];
    card.innerHTML = `
        <h3>${name}</h3>
        <span id="score-${index}">0</span>
        <div>
            <button onclick="updateScore(${index}, -1)">-</button>
            <button onclick="updateScore(${index}, 1)">+</button>
        </div>
    `;
    return card;
}

function updateScore(index, change) {
    const scoreElement = document.getElementById(`score-${index}`);
    let score = parseInt(scoreElement.textContent) + change;
    scoreElement.textContent = score;
}

function applySettings() {
    const numPlayers = parseInt(numPlayersInput.value);
    const playerNames = [];
    for (let i = 0; i < numPlayers; i++) {
        const nameInput = document.getElementById(`player-${i}`);
        playerNames.push(nameInput.value || `Player ${i + 1}`);
    }
    initGame(playerNames);
    document.getElementById("settings-modal").style.display = "none";
}

function initGame(playerNames) {
    scoreboard.innerHTML = "";
    scoreboard.style.flexDirection = "column";
    playerNames.forEach((name, index) => {
        scoreboard.appendChild(createPlayerCard(name, index));
    });
}

numPlayersInput.addEventListener("change", () => createPlayerInputs(numPlayersInput.value));
applySettingsBtn.addEventListener("click", applySettings);

document.getElementById("settings-btn").addEventListener("click", () => {
    document.getElementById("settings-modal").style.display = "flex";
});

document.querySelector(".close-btn").addEventListener("click", () => {
    document.getElementById("settings-modal").style.display = "none";
});

createPlayerInputs(2);
initGame(["Player 1", "Player 2"]);
