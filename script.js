// БАЗОВЫЙ СКРИПТ ДЛЯ ВСЕХ СТРАНИЦ

// 1. Управление мобильным меню
function initMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    const body = document.body;

    // Проверяем, есть ли мобильное меню на странице
    if (!burgerMenu || !mobileMenu) {
        console.log('Мобильное меню не найдено на этой странице');
        return;
    }

    // Открытие/закрытие меню
    function toggleMenu() {
        burgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        if (mobileMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
            body.style.paddingRight = '0';
            console.log('📱 Мобильное меню открыто');
        } else {
            body.style.overflow = '';
            body.style.paddingRight = '';
            console.log('📱 Мобильное меню закрыто');
        }
    }

    // Закрытие меню при клике на ссылку
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
            body.style.paddingRight = '';
            console.log('🔗 Меню закрыто по клику на ссылку');
        });
    });

    // Закрытие меню при клике на крестик
    if (closeMenu) {
        closeMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Закрытие меню при клике вне меню
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            toggleMenu();
        }
    });

    // Закрытие меню по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Обработчик для бургер-меню
    burgerMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Анимация при открытии меню
    mobileMenu.addEventListener('transitionend', () => {
        if (mobileMenu.classList.contains('active')) {
            // Активируем анимацию появления ссылок
            document.querySelectorAll('.mobile-nav-links li').forEach((li, index) => {
                li.style.animation = `slideUp 0.5s forwards ${index * 0.1 + 0.1}s`;
            });
        }
    });

    console.log('✅ Мобильное меню инициализировано');
}

// 2. Фикс десктопного меню для мобильных (если нет мобильного меню)
function fixDesktopNavForMobile() {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger-menu');

    if (navLinks && burger && !document.querySelector('.mobile-menu')) {
        // Старая функция для совместимости
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');

            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Закрываем меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Закрываем меню при клике вне его
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !burger.contains(e.target)) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// 3. Валидация формы контактов
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Форма находится в разработке. Пожалуйста, используйте прямые контакты.');
        });
    }
}

// 4. Принудительные мобильные фиксы
function forceMobileFix() {
    if (window.innerWidth <= 768) {
        console.log('🔧 Применяем принудительные фиксы для мобильных');

        // А. Убираем все абсолютные позиции
        document.querySelectorAll('*').forEach(el => {
            if (getComputedStyle(el).position === 'absolute') {
                el.style.position = 'relative';
                el.style.top = 'auto';
                el.style.left = 'auto';
                el.style.right = 'auto';
                el.style.bottom = 'auto';
            }
        });

        // Б. Фиксируем все изображения
        document.querySelectorAll('img').forEach(img => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        });

        // В. Фиксируем текст
        document.querySelectorAll('p, h1, h2, h3, h4, span').forEach(text => {
            text.style.wordBreak = 'break-word';
            text.style.overflowWrap = 'break-word';
            text.style.hyphens = 'auto';
            text.style.maxWidth = '100%';
        });

        // Г. Фиксируем CTA блок на about.html
        const aboutCTAs = document.querySelectorAll('.about-cta, .cta-buttons');
        aboutCTAs.forEach(cta => {
            cta.style.width = '100%';
            cta.style.maxWidth = '100%';
            cta.style.boxSizing = 'border-box';
            cta.style.overflow = 'hidden';
        });

        // Д. Убираем горизонтальный скролл
        document.body.style.overflowX = 'hidden';
        document.documentElement.style.overflowX = 'hidden';
    }
}

// 5. Плавное появление элементов при скролле
function initScrollAnimations() {
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
}

// 6. Анимация плавающих кругов
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

// 7. Плавные переходы между страницами
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

// 8. Фикс для фото на мобильных
function fixMobilePhoto() {
    const photo = document.querySelector('.profile-photo');
    if (photo && window.innerWidth <= 768) {
        // Сохраняем соотношение 3:4
        photo.style.width = '100%';
        photo.style.maxWidth = '300px';
        photo.style.height = 'auto';
        photo.style.aspectRatio = '3/4';
        photo.style.objectFit = 'cover';
        photo.style.margin = '0 auto';
        photo.style.display = 'block';
    }
}

// 9. Фикс для CTA текста на мобильных
function fixMobileText() {
    if (window.innerWidth <= 768) {
        const ctaBlocks = document.querySelectorAll('.about-cta, .text-block');
        ctaBlocks.forEach(block => {
            const texts = block.querySelectorAll('p, h3');
            texts.forEach(text => {
                text.style.wordBreak = 'break-word';
                text.style.overflowWrap = 'break-word';
                text.style.hyphens = 'auto';
                text.style.maxWidth = '100%';
            });
        });
    }
}

// 10. Анимация при скролле (фикс наложения)
function initScrollFix() {
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        // Если скроллим вниз - проверяем наложение
        if (st > lastScrollTop) {
            const elements = document.querySelectorAll('.text-block, .about-cta, .skills-block');
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                // Если элемент близко к верху
                if (rect.top < 100) {
                    el.style.position = 'relative';
                    el.style.zIndex = '1';
                    el.style.marginTop = '10px';
                }
            });
        }

        lastScrollTop = st <= 0 ? 0 : st;
    }, false);
}

// 11. Дебаг информация
function showDebugInfo() {
    console.log('📱 Мобильный режим:', window.innerWidth <= 768);
    console.log('🔍 Проблемы с шириной:');

    if (window.innerWidth <= 768) {
        document.querySelectorAll('*').forEach(el => {
            if (el.scrollWidth > el.clientWidth + 10) {
                console.log('   -', el.tagName, el.className, 'шире на', el.scrollWidth - el.clientWidth + 'px');
            }
        });
    }
}

// 12. Основная инициализация
function init() {
    console.log('🚀 Инициализация сайта...');

    // Инициализируем мобильное меню (новое)
    initMobileMenu();

    // Фикс для старого меню (для совместимости)
    fixDesktopNavForMobile();

    // Инициализируем другие функции
    initContactForm();
    initScrollAnimations();
    initFloatingCircles();
    initPageTransitions();
    initScrollFix();

    // Применяем мобильные фиксы
    forceMobileFix();
    fixMobilePhoto();
    fixMobileText();

    // Показываем дебаг информацию
    showDebugInfo();

    // Анимация для плавающих элементов
    const floatingElements = document.querySelector('.floating-elements');
    if (floatingElements) {
        floatingElements.style.opacity = '1';
    }

    console.log('✨ Сайт успешно инициализирован');
}

// 13. Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', init);

// 14. Дополнительные фиксы после полной загрузки
window.addEventListener('load', function() {
    document.body.classList.add('page-fully-loaded');

    // Повторно применяем фиксы
    forceMobileFix();
    fixMobilePhoto();
    fixMobileText();

    // Проверяем, нужен ли рефреш для мобильных
    if (window.innerWidth <= 768 && document.body.scrollWidth > window.innerWidth) {
        console.log('⚠️ Обнаружены проблемы с шириной, применяем дополнительные фиксы');
        document.body.style.zoom = '0.99'; // Легкий зум для фикса
    }
});

// 15. Реагируем на изменение размера окна
window.addEventListener('resize', function() {
    forceMobileFix();
    fixMobilePhoto();
    fixMobileText();

    // Закрываем мобильное меню при переходе на десктоп
    if (window.innerWidth > 768) {
        const mobileMenu = document.querySelector('.mobile-menu');
        const burgerMenu = document.querySelector('.burger-menu');

        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            burgerMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }
    }
});

// 16. Глобальная функция для отладки
window.debugPage = function() {
    console.log('🔧 Отладка страницы:');
    console.log('Ширина окна:', window.innerWidth);
    console.log('Высота окна:', window.innerHeight);
    console.log('Ширина body:', document.body.scrollWidth);
    console.log('Навигация:', document.querySelector('nav'));
    console.log('Мобильное меню:', document.querySelector('.mobile-menu'));
    console.log('Бургер меню:', document.querySelector('.burger-menu'));
};
