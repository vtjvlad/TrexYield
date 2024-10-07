let counter = 0;
const maxClicks = 1000;

document.getElementById('clickButton').addEventListener('pointerdown', () => {
    if (counter < maxClicks) {
        counter++;
        const counterElement = document.getElementById('counter');
        counterElement.textContent = counter;

        // Анимация увеличения счетчика
        counterElement.style.animation = 'none';
        setTimeout(() => {
            counterElement.style.animation = 'counterAnimation 0.1s ease';
        }, 0);

        // Изменение фона страницы при каждом клике
        document.body.style.background = getRandomColor();

        // Обновление прогресс-бара
        updateProgressBar();

        // Проигрывание звука клика
        const clickSound = document.getElementById('clickSound');
        clickSound.play();

        // Показ всплывающего сообщения
        showPopupMessage(`TapTaps: ${counter}`);
    }

    if (counter >= maxClicks) {
        document.getElementById('clickButton').disabled = true;
        document.getElementById('clickButton').style.cursor = 'not-allowed';
        document.getElementById('clickButton').classList.add('disabled'); // Добавляем класс для анимации кнопки

        // Анимация радужного фона
        document.body.classList.add('rainbow-bg');

        alert('Достигнут лимит кликов!');
    }
});

// Функция для получения случайного цвета
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Функция для обновления прогресс-бара
function updateProgressBar() {
    const progressBarFill = document.getElementById('progressBarFill');
    const progressPercentage = (counter / maxClicks) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
}

// Функция для показа всплывающего сообщения
function showPopupMessage(message) {
    const popup = document.getElementById('popupMessage');
    popup.textContent = message;
    popup.style.opacity = 1;
    setTimeout(() => {
        popup.style.opacity = 0;
    }, 1000);
}