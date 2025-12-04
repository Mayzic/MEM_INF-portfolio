// ===========================================
// Упрощенное портфолио с фильтрацией
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const categoryCards = document.querySelectorAll('.category-card');

    // ===========================================
    // 1. Фильтрация проектов
    // ===========================================
    function filterProjects(category) {
        // Обновляем активную кнопку
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === category) {
                btn.classList.add('active');
            }
        });

        // Показываем/скрываем проекты
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Обработчики для кнопок фильтрации
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-filter');
            filterProjects(category);
        });
    });

    // ===========================================
    // 2. Навигация по категориям
    // ===========================================
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');

            // Фильтруем проекты
            filterProjects(category);

            // Плавно скроллим к проектам
            const projectsSection = document.querySelector('.all-projects-section');
            if (projectsSection) {
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===========================================
    // 3. Анимация появления проектов
    // ===========================================
    function animateProjectsOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Наблюдаем за всеми проектами
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            projectObserver.observe(card);
        });
    }

    // ===========================================
    // 4. Инициализация
    // ===========================================
    function initializePortfolio() {
        // Анимация проектов
        animateProjectsOnScroll();

        // Анимация статистики
        animateStats();

        console.log('🎨 Портфолио успешно загружено');
    }

    // Анимация статистики
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');

        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            stat.textContent = '0';

            const increment = () => {
                const current = parseInt(stat.textContent);
                const target = parseInt(finalValue.replace('+', ''));

                if (current < target) {
                    stat.textContent = current + 1;
                    setTimeout(increment, 50);
                } else if (finalValue.includes('+')) {
                    stat.textContent = target + '+';
                }
            };

            setTimeout(increment, 500);
        });
    }

    // Запуск инициализации
    setTimeout(initializePortfolio, 100);
});
