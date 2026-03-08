document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Функция для отображения ошибки (адаптировано под нашу вёрстку)
    function showError(input, message) {
        // Добавляем класс ошибки
        input.classList.add('error');
        
        // Проверяем, есть ли уже сообщение об ошибке
        const parent = input.closest('.form-group');
        let errorElement = parent.querySelector('.error-message');
        
        if (!errorElement) {
            // Создаём новое сообщение об ошибке
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
            
            // Вставляем после поля ввода
            const inputWrapper = input.closest('.input-wrapper') || input.parentNode;
            inputWrapper.parentNode.insertBefore(errorElement, inputWrapper.nextSibling);
        } else {
            // Обновляем существующее сообщение
            errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        }
    }

    // Функция для удаления ошибки
    function removeError(input) {
        input.classList.remove('error');
        const parent = input.closest('.form-group');
        const errorElement = parent.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Функция для проверки ФИО (минимум 2 слова)
    function validateFullname(value) {
        if (!value) return 'Введите фамилию и имя';
        
        const words = value.trim().split(/\s+/).filter(word => word.length > 0);
        if (words.length < 2) {
            return 'Введите минимум фамилию и имя';
        }
        
        // Проверка, что слова состоят только из букв
        const namePattern = /^[а-яА-ЯёЁa-zA-Z\-]+$/;
        for (let word of words) {
            if (!namePattern.test(word)) {
                return 'Используйте только буквы и дефис';
            }
        }
        
        return '';
    }

    // Функция для проверки телефона (10 цифр)
    function validatePhone(value) {
        if (!value) return 'Введите номер телефона';
        
        // Удаляем все нецифровые символы
        const digits = value.replace(/\D/g, '');
        
        if (digits.length < 10) {
            return 'Введите 10 цифр номера';
        }
        
        if (digits.length > 11) {
            return 'Слишком много цифр';
        }
        
        return '';
    }

    // Функция для проверки email
    function validateEmail(value) {
        if (!value) return 'Введите email';
        
        // Базовая проверка email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            return 'Введите корректный email (пример: name@domain.ru)';
        }
        
        return '';
    }

    // Функция для проверки темы
    function validateTopic(value) {
        if (!value) return 'Выберите тему сообщения';
        return '';
    }

    // Функция для проверки сообщения
    function validateMessage(value) {
        if (!value) return 'Введите сообщение';
        
        const trimmed = value.trim();
        if (trimmed.length < 10) {
            return 'Сообщение должно содержать минимум 10 символов';
        }
        
        if (trimmed.length > 500) {
            return 'Сообщение не должно превышать 500 символов';
        }
        
        return '';
    }

    // Функция для проверки согласия
    function validateAgreement(checkbox) {
        if (!checkbox.checked) {
            return 'Необходимо согласие на обработку данных';
        }
        return '';
    }

    // Обработчик отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Получаем значения полей
        const fullname = document.getElementById('fullname');
        const phone = document.getElementById('phone');
        const email = document.getElementById('email');
        const topic = document.getElementById('topic');
        const message = document.getElementById('message');
        const agreement = document.getElementById('agreement');
        
        // Удаляем предыдущие ошибки
        [fullname, phone, email, topic, message].forEach(removeError);
        
        // Валидация
        let isValid = true;
        
        const fullnameError = validateFullname(fullname.value);
        if (fullnameError) {
            showError(fullname, fullnameError);
            isValid = false;
        }
        
        const phoneError = validatePhone(phone.value);
        if (phoneError) {
            showError(phone, phoneError);
            isValid = false;
        }
        
        const emailError = validateEmail(email.value);
        if (emailError) {
            showError(email, emailError);
            isValid = false;
        }
        
        const topicError = validateTopic(topic.value);
        if (topicError) {
            showError(topic, topicError);
            isValid = false;
        }
        
        const messageError = validateMessage(message.value);
        if (messageError) {
            showError(message, messageError);
            isValid = false;
        }
        
        const agreementError = validateAgreement(agreement);
        if (agreementError) {
            // Для чекбокса создаём отдельное сообщение
            const parent = agreement.closest('.checkbox-group');
            let errorElement = parent.querySelector('.error-message');
            
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${agreementError}`;
                parent.appendChild(errorElement);
            }
            isValid = false;
        }
        
        // Если всё корректно
        if (isValid) {
            // Собираем данные формы
            const formData = {
                fullname: fullname.value.trim(),
                phone: phone.value.trim(),
                email: email.value.trim(),
                topic: topic.options[topic.selectedIndex].text,
                message: message.value.trim(),
                timestamp: new Date().toLocaleString('ru-RU')
            };
            
            // Создаём кастомное событие для логгера
            const event = new CustomEvent('formValid', { 
                detail: formData 
            });
            document.dispatchEvent(event);
            
            // Показываем сообщение об успехе
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.add('show');
            
            // Прокручиваем к сообщению
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Сбрасываем форму через 2 секунды
            setTimeout(() => {
                form.reset();
                successMessage.classList.remove('show');
            }, 3000);
        }
    });

    // Удаление ошибок при вводе
    const inputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            removeError(this);
            
            // Если это чекбокс, удаляем ошибку у родителя
            if (this.type === 'checkbox') {
                const parent = this.closest('.checkbox-group');
                const errorElement = parent.querySelector('.error-message');
                if (errorElement) {
                    errorElement.remove();
                }
            }
        });
        
        // Также удаляем ошибку при изменении (для select)
        input.addEventListener('change', function() {
            removeError(this);
        });
    });

    // Обработчик кнопки сброса
    document.getElementById('resetBtn')?.addEventListener('click', function() {
        // Удаляем все ошибки
        document.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach(el => {
            el.remove();
        });
        
        // Прячем сообщение об успехе
        document.getElementById('successMessage').classList.remove('show');
    });

    console.log('Validation script loaded and initialized');
});