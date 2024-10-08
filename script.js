let counter = 0;
const maxClicks = 1000;
const originalImage = 'dino-button.png'; // Исходное изображение
const altImage = 'dino-alt.png'; // Альтернативное изображение

// Загружаем прогресс из LocalStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedCounter = localStorage.getItem('counter'); // Получаем значение счётчика из LocalStorage
    if (savedCounter) {
        counter = parseInt(savedCounter, 10); // Преобразуем строку в число
        document.getElementById('counter').textContent = counter; // Обновляем отображение счётчика
        updateProgressBar(); // Обновляем прогресс-бар в соответствии с сохранённым значением
    }
});

const clickButton = document.getElementById('clickButton');
const dinoImage = 			document.getElementById('dinoImage');

// Событие при удерживании кнопки
clickButton.addEventListener('pointerdown', () => {
    if (counter < maxClicks) {
        counter++;
        document.getElementById('counter').textContent = counter;
        localStorage.setItem('counter', counter); // Сохраняем текущее значение счётчика в LocalStorage

        // Меняем изображение на альтернативное при нажатии
        dinoImage.src = altImage;

        // Анимация увеличения счетчика
        document.getElementById('counter').style.animation = 'none';
        setTimeout(() => {
            document.getElementById('counter').style.animation = 'counterAnimation 0.1s ease';
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
        clickButton.disabled = true;
        clickButton.style.cursor = 'not-allowed';
        clickButton.classList.add('disabled'); // Добавляем класс для анимации кнопки
        document.body.classList.add('rainbow-bg'); // Анимация радужного фона
        alert('Достигнут лимит кликов!');
    }
});

// Событие при отпускании кнопки
clickButton.addEventListener('pointerup', () => {
    // Возвращаем исходное изображение при отпускании кнопки
    dinoImage.src = originalImage;
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


// Добавляем обработчик нажатия на кнопку сброса
document.getElementById('resetButton').addEventListener('click', resetProgress);

// Функция для сброса прогресса
function resetProgress() {
    localStorage.removeItem('counter'); // Удаляем сохранённый прогресс
    counter = 0; // Сбрасываем счётчик
    document.getElementById('counter').textContent = counter; // Обновляем отображение счётчика
    updateProgressBar(); // Обновляем прогресс-бар
    document.getElementById('clickButton').disabled = false; // Снова активируем кнопку
    document.getElementById('clickButton').style.cursor = 'pointer'; // Восстанавливаем курсор
    document.getElementById('clickButton').classList.remove('disabled'); // Убираем класс анимации
    document.body.classList.remove('rainbow-bg'); // Убираем радужный фон
}

// Отключаем контекстное меню (правый клик) на изображении
document.getElementById('dinoImage').addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Отключаем стандартное поведение (правый клик)
});

// Отключаем возможность перетаскивания изображения
document.getElementById('dinoImage').addEventListener('dragstart', (e) => {
    e.preventDefault(); // Отключаем перетаскивание
});

// Отключение копирования текста с кнопок
document.getElementById('resetButton').addEventListener('pointerdown', (e) => {
    e.preventDefault(); // Отключение стандартного поведения (выделение текста)
});

document.getElementById('clickButton').addEventListener('pointerdown', (e) => {
    e.preventDefault(); // Отключение стандартного поведения
});

// Отключение копирования текста с кнопок
document.getElementById('resetButton').addEventListener('copy', (e) => {
    e.preventDefault(); // Отключение действия "копировать"
});

document.getElementById('clickButton').addEventListener('copy', (e) => {
    e.preventDefault(); // Отключение действия "копировать"
});

// Отключаем контекстное меню (правый клик) на изображении
document.getElementById('dinoImage').addEventListener('contextmenu', (e) => {
    e.preventDefault(); // Отключаем стандартное поведение (правый клик)
});

// Отключаем возможность перетаскивания изображения
document.getElementById('dinoImage').addEventListener('dragstart', (e) => {
    e.preventDefault(); // Отключаем перетаскивание
});