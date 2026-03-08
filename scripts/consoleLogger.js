document.addEventListener('DOMContentLoaded', function() {
    console.log('Console logger script loaded');
    
    // Слушаем кастомное событие formValid
    document.addEventListener('formValid', function(event) {
        // Получаем данные формы
        const data = event.detail;
        
        // Очищаем консоль для наглядности
        console.clear();
        
        // Создаём стилизованный вывод
        console.log('%c📬 Новая отправка формы | ComicStar', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
        console.log('%c' + '═'.repeat(50), 'color: #888;');
        
        // Выводим данные с иконками
        console.log('%c👤 ФИО:', 'font-weight: bold; color: #333;', data.fullname);
        console.log('%c📞 Телефон:', 'font-weight: bold; color: #333;', data.phone);
        console.log('%c📧 Email:', 'font-weight: bold; color: #333;', data.email);
        console.log('%c📋 Тема:', 'font-weight: bold; color: #333;', data.topic);
        console.log('%c💬 Сообщение:', 'font-weight: bold; color: #333;', data.message);
        
        console.log('%c' + '─'.repeat(50), 'color: #888;');
        
        // Время отправки
        console.log('%c⏰ Время отправки:', 'font-weight: bold; color: #333;', data.timestamp);
        
        // Выводим объект целиком для просмотра
        console.log('%c📦 Полный объект данных:', 'font-weight: bold; color: #333;');
        console.table({
            'ФИО': data.fullname,
            'Телефон': data.phone,
            'Email': data.email,
            'Тема': data.topic,
            'Сообщение': data.message,
            'Время': data.timestamp
        });
        
        // Подводим итог
        const messageLength = data.message.length;
        console.log('%c📊 Статистика:', 'font-weight: bold; color: #333;');
        console.log(`   Длина сообщения: ${messageLength} символов`);
        console.log(`   Количество слов в сообщении: ${data.message.split(/\s+/).filter(w => w).length}`);
        
        console.log('%c' + '═'.repeat(50), 'color: #888;');
        console.log('%c✅ Данные успешно залогированы', 'color: #4caf50;');
    });
    
    // Дополнительно: логируем когда пользователь начинает заполнять форму
    const form = document.getElementById('contactForm');
    if (form) {
        let startTime = null;
        
        form.addEventListener('focusin', function() {
            if (!startTime) {
                startTime = new Date();
            }
        });
        
        // Логируем если пользователь пытается отправить форму с ошибками
        form.addEventListener('submit', function(event) {
            // Этот обработчик сработает ДО валидации
            console.log('%c🔍 Попытка отправки формы', 'color: #f39c12;');
        });
    }
});