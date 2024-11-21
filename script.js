let counter = 0;
const maxClicks = 1000;
const originalImage = 'dino-button.png'; // Исходное изображение
const altImage = 'dino-alt.png'; // Альтернативное изображение
const cloudStorage = window.telegram.webApp.CloudStorage;
// Загружаем прогресс из CloudStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const savedCounter = CloudStorage.getItem('counter'); // Получаем значение счётчика из CloudStorage
    if (savedCounter) {
        counter = parseInt(savedCounter, 10); // Преобразуем строку в число
        document.getElementById('counter').textContent = counter; // Обновляем отображение счётчика
        updateProgressBar(); // Обновляем прогресс-бар в соответствии с сохранённым значением
    } 
    
    // Проверка на существование альтернативного изображения в CloudStorage
    const savedImage = CloudStorage.getItem('altImage');
    if (savedImage) {
        document.getElementById('dinoImage').src = savedImage; // Загружаем сохраненное изображение, если оно есть
    }
});

const clickButton = document.getElementById('clickButton');
const dinoImage = document.getElementById('dinoImage');

// Событие при удерживании кнопки
clickButton.addEventListener('pointerdown', () => {
    if (counter < maxClicks) {
        counter++;
        document.getElementById('counter').textContent = counter;
        
        // Используем debounce для сохранения данных
        debounceSaveProgress();
        
        // Меняем изображение на альтернативное при нажатии
        dinoImage.src = altImage;
        CloudStorage.setItem('altImage', altImage); // Сохраняем новое изображение в CloudStorage
        
        // Анимация увеличения счетчика
        document.getElementById('counter').style.animation = 'none';
        setTimeout(() => {
            document.getElementById('counter').style.animation = 'counterAnimation 0.1s ease';
        }, 0);
        
        // Изменение фона страницы при каждом клике
        //   document.body.style.background = getRandomColor();
        
        // Обновление прогресс-бара
        updateProgressBar();
        
        // Проигрывание звука клика (проверка на наличие элемента)
        const clickSound = document.getElementById('clickSound');
        if (clickSound && clickSound.play) {
            clickSound.play();
        }
        
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
function updeateProgressBar() {
    const progressBarFill = document.getElementById('progressBarFill');
    const progressPercentage = (counter / maxClicks) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
}

// Обработчик нажатия на кнопку сброса
document.getElementById('resetButton').addEventListener('click', resetProgress);

// Функция для сброса прогресса
function resetProgress() {
    CloudStorage.removeItem('counter'); // Удаляем сохранённый прогресс
    CloudStorage.removeItem('altImage'); // Удаляем сохранённое изображение
    counter = 0; // Сбрасываем счётчик
    document.getElementById('counter').textContent = counter; // Обновляем отображение счётчика
    updateProgressBar(); // Обновляем прогресс-бар
    document.getElementById('clickButton').disabled = false; // Снова активируем кнопку
    document.getElementById('clickButton').style.cursor = 'pointer'; // Восстанавливаем курсор
    document.getElementById('clickButton').classList.remove('disabled'); // Убираем класс анимации
    document.body.classList.remove('rainbow-bg'); // Убираем радужный фон
    dinoImage.src = originalImage; // Возвращаем исходное изображение динозавра
}

// Отключение контекстного меню, копирования и перетаскивания
document.querySelectorAll('#dinoImage, #clickButton, #resetButton').forEach(element => {
    element.addEventListener('contextmenu', (e) => e.preventDefault()); // Отключаем контекстное меню (правый клик)
    element.addEventListener('dragstart', (e) => e.preventDefault()); // Отключаем перетаскивание
    element.addEventListener('copy', (e) => e.preventDefault()); // Отключаем копирование текста
});

// Функция debounce для оптимизации сохранений в CloudStorage
function debounce(func, delay) {
    let timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
}

// Дебаунс-функция для сохранения прогресса
const debounceSaveProgress = debounce(() => {
    CloudStorage.setItem('counter', counter); // Сохраняем прогресс с задержкой
}, 500);
document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('appContent');
    const logoutButton = document.getElementById('logoutButton');
    
    // Проверка, если Telegram Web App доступен
    if (window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Инициализируем Telegram Web App
        tg.ready();
        
        // Получаем информацию о пользователе из Telegram
        const user = tg.initDataUnsafe?.user;
        
        if (user) {
            // Если информация о пользователе есть, показываем контент
            showAppContent(user);
        } else {
            alert('Ошибка авторизации через Telegram.');
        }
    } else {
        alert('Telegram Web App не поддерживается в этом браузере.');
    }
    
    // Функция для показа основного контента с данными о пользователе
    function showAppContent(user) {
        const userInfo = document.createElement('div');
        userInfo.innerHTML = `Welcome, ${user.first_name}! <br> Your username: ${user.username}`;
        userInfo.style.textAlign = 'center';
        document.body.insertBefore(userInfo, appContent);
        
        appContent.style.display = 'block';
        logoutButton.style.display = 'block';
    }
    
    // Обработчик нажатия на кнопку выхода (если требуется)
    logoutButton.addEventListener('click', () => {
        Telegram.WebApp.close(); // Закрываем WebApp, если это необходимо
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const appContent = document.getElementById('appContent');
    const logoutButton = document.getElementById('logoutButton');
    
    // Проверка, если Telegram Web App доступен
    if (window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Инициализируем Telegram Web App
        tg.ready();
        
        // Получаем информацию о пользователе из Telegram
        const user = tg.initDataUnsafe?.user;
        
        if (user) {
            // Если информация о пользователе есть, показываем контент
            showAppContent(user);
        } else {
            alert('Ошибка авторизации через Telegram.');
        }
    } else {
        alert('Telegram Web App не поддерживается в этом браузере.');
    }
    
    // Функция для показа основного контента с данными о пользователе
    function showAppContent(user) {
        const userInfo = document.createElement('div');
        userInfo.classList.add('user-info'); // Добавляем класс для стилизации
        
        // Профильное фото (если доступно)
        const userPhotoUrl = user.photo_url ? user.photo_url : 'default-profile.png'; // Если фото нет, используется изображение по умолчанию
        const userPhoto = `<img src="${userPhotoUrl}" alt="Profile Photo" class="profile-photo">`;
        
        // Имя пользователя и логин
        const userName = `<h2>${user.first_name}</h2>`;
        const userUsername = user.username ? `<p>@${user.username}</p>` : '';
        
        // Добавляем информацию в блок
        userInfo.innerHTML = `
        <div class="profile">
        ${userPhoto}
        ${userName}
        ${userUsername}
        </div>
        `;
        
        // Вставляем блок перед основным контентом
        document.body.insertBefore(userInfo, appContent);
        
        // Показываем основной контент
        appContent.style.display = 'block';
        logoutButton.style.display = 'block';
    }
    
    // Обработчик нажатия на кнопку выхода
    logoutButton.addEventListener('click', () => {
        Telegram.WebApp.close(); // Закрываем WebApp
    });
});



window.addEventListener('load', () => {
  const input = document.getElementById('input');
  const info = document.getElementById('info');
  const set = document.getElementById('set');
  const get = document.getElementById('get');
  const del = document.getElementById('del');

  

  const key = 'key'; // исправлено имя переменной

  // Save key: value
  set.addEventListener('click', () => {
    if (input.value.length > 0) {
      cloudStorage.setItem(key, input.value, (error, result) => {
        info.innerHTML = !error && result
          ? '<span class="green">Saved</span>'
          : `<span class="red">${error}</span>`;
      });
    } else {
      info.innerHTML = '<span class="red">Пусто</span>';
    }
  });

  // Read key: value
  get.addEventListener('click', () => {
    cloudStorage.getItem(key, (error, data) => { // исправлено имя метода
      info.innerHTML = !error && data
        ? `<span class="blue">${data}</span>`
        : `<span class="red">${error}</span>`;
    });
  });

  // Delete key: value
  del.addEventListener('click', () => {
    cloudStorage.removeItem(key, (error, result) => { // исправлено имя метода
      info.innerHTML = !error && result
        ? '<span class="orange">Deleted</span>'
        : `<span class="red">${error}</span>`;
    });
  });
});