// Валидация формы контактов (упрощенная версия)
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Форма находится в разработке. Пожалуйста, используйте прямые контакты.');
    });
}

// Плавное появление элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Наблюдаем за всеми проектами и секциями
document.querySelectorAll('.project-item, .section-title, .quick-card, .tech-category, .career-card').forEach(el => {
    observer.observe(el);
});

// Анимация плавающих кругов
function initFloatingCircles() {
    const circles = document.querySelectorAll('.floating-circle');

    circles.forEach(circle => {
        // Анимация плавающего движения
        const animateFloat = () => {
            const randomX = Math.random() * 20 - 10; // -10px to +10px
            const randomY = Math.random() * 20 - 10;

            circle.style.transform = `translate(${randomX}px, ${randomY}px)`;

            setTimeout(animateFloat, 3000 + Math.random() * 2000);
        };

        // Запуск анимации с задержкой
        const delay = circle.style.getPropertyValue('--delay') || '0s';
        setTimeout(animateFloat, parseFloat(delay) * 1000);
    });
}

// Плавные переходы между страницами
function initPageTransitions() {
    // Добавляем класс для плавного появления
    document.body.classList.add('page-loaded');

    // Анимация навигации
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Для внутренних ссылок
            if (this.getAttribute('href').startsWith('#')) return;

            // Добавляем эффект перехода
            document.body.classList.add('page-exiting');

            // Для ссылок на другие страницы
            setTimeout(() => {
                window.location.href = this.href;
            }, 300);
        });
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initFloatingCircles();
    initPageTransitions();

    // Анимация для плавающих элементов
    const floatingElements = document.querySelector('.floating-elements');
    if (floatingElements) {
        floatingElements.style.opacity = '1';
    }

    console.log('✨ Сайт успешно загружен');
});

// Обработка загрузки страницы
window.addEventListener('load', function() {
    document.body.classList.add('page-fully-loaded');
});
