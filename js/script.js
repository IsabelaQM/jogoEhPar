// Variáveis para controlar o jogo
let timer;
let isPaused = true;
let evenPairs = 0;
let totalPairs = 0;
let errors = 0;
let selectedDifficulty = 0; // Adicione esta variável

// Função para atualizar o temporizador
function updateTimer(timeInSeconds) {
    const timerElement = document.getElementById('timer');
    let seconds = timeInSeconds % 60;
    let minutes = Math.floor(timeInSeconds / 60);
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Função para sortear números e atualizar a interface
function generateRandomNumber() {
    if (!isPaused) {
        const numberElement = document.getElementById('randomNumber');
        const randomValue = Math.floor(Math.random() * 100) + 1;
        numberElement.style.color = '#333';

        numberElement.textContent = randomValue;

        // Remove o event listener anterior para evitar múltiplos cliques
        numberElement.removeEventListener('click', handleNumberClick);

        // Verifica a resposta ao clicar
        numberElement.addEventListener('click', handleNumberClick);
    }
}

function handleNumberClick() {
    numberElement = document.getElementById('randomNumber');
    randomValue = parseInt(numberElement.textContent);

    if (randomValue % 2 === 0) {
        numberElement.style.color = 'green'; // Verde se for par
        evenPairs++;
    } else {
        numberElement.style.color = 'red'; // Vermelho se for ímpar -> erro
        errors++;
    }

    totalPairs++;

    evenPairsElement = document.getElementById('evenPairs');
    evenPairsElement.textContent = evenPairs;

    evenPercentage = ((evenPairs / totalPairs) * 100).toFixed(2);
    evenPercentageElement = document.getElementById('evenPercentage');
    evenPercentageElement.textContent = `${evenPercentage}%`;

    errorsElement = document.getElementById('errors');
    errorsElement.textContent = errors;

    totalPairsElement = document.getElementById('totalPairs');
    totalPairsElement.textContent = totalPairs;
}

// Função para iniciar o jogo
function startGame() {
    if (selectedDifficulty === 0) {
        alert("Selecione um nível antes de iniciar o jogo.");
        return;
    }

    isPaused = false;
    remainingTime = selectedDifficulty;
    startButton = document.getElementById('startBtn');
    pauseButton = document.getElementById('pauseBtn');
    stopButton = document.getElementById('stopBtn');

    startButton.disabled = true;
    pauseButton.disabled = false;
    stopButton.disabled = false;

    updateTimer(remainingTime);

    timer = setInterval(function () {
        remainingTime--;
        if (remainingTime === 0) {
            pauseGame();
            // const numberElement = document.getElementById('randomNumber');
            numberElement.textContent = '-';
            // remove o 
            numberElement.removeEventListener('click', handleNumberClick);
        }
        updateTimer(remainingTime);
        generateRandomNumber();
    }, getNumberGenerationSpeedByDifficulty());
}

function getNumberGenerationSpeedByDifficulty() {
    if (selectedDifficulty === 105) return 1000;
    else if (selectedDifficulty === 75) return 500;
    else if (selectedDifficulty === 30) return 250;
}

// Função para pausar o jogo
function pauseGame() {
    isPaused = true;
    clearInterval(timer);
    const startButton = document.getElementById('startBtn');
    const pauseButton = document.getElementById('pauseBtn');
    startButton.disabled = false;
    pauseButton.disabled = true;
}

// Função para parar o jogo
function stopGame() {
    isPaused = true;
    clearInterval(timer);
    document.getElementById('difficultySelect').value = "0";
    selectedDifficulty = 0;

    const startButton = document.getElementById('startBtn');
    const pauseButton = document.getElementById('pauseBtn');
    const stopButton = document.getElementById('stopBtn');

    startButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;

    const timerElement = document.getElementById('timer');
    timerElement.textContent = '00:00';

    const numberElement = document.getElementById('randomNumber');
    numberElement.textContent = '-';
    numberElement.style.color = '#333';

    evenPairs = 0;
    totalPairs = 0;
    errors = 0;

    const evenPairsElement = document.getElementById('evenPairs');
    evenPairsElement.textContent = evenPairs;

    const evenPercentageElement = document.getElementById('evenPercentage');
    evenPercentageElement.textContent = '0%';

    const errorsElement = document.getElementById('errors');
    errorsElement.textContent = errors;

    const totalPairsElement = document.getElementById('totalPairs');
    totalPairsElement.textContent = totalPairs;
}

// Adicione o código para atualizar o temporizador com base na dificuldade selecionada
const difficultySelect = document.getElementById('difficultySelect');
difficultySelect.addEventListener('change', function () {
    selectedDifficulty = parseInt(difficultySelect.value, 10);
    updateTimer(selectedDifficulty);
});

// Adicione event listeners para os botões Iniciar, Pausar e Parar
document.getElementById('startBtn').addEventListener('click', () => {
    startGame();
});

document.getElementById('pauseBtn').addEventListener('click', pauseGame);
document.getElementById('stopBtn').addEventListener('click', stopGame);

// Inicializar o jogo com todos os valores zerados
stopGame();
