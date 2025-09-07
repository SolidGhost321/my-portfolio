document.addEventListener('DOMContentLoaded', () => {

    // --- Dark/Light Theme Toggle ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('.theme-icon');

    // 1. Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        updateIcon(savedTheme);
    }

    // 2. Handle button click
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            // Switch to light theme
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light-theme');
            updateIcon('light-theme');
        } else {
            // Switch to dark theme
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateIcon('dark-theme');
        }
    });

    // 3. Update the icon
    function updateIcon(theme) {
        if (theme === 'dark-theme') {
            themeIcon.textContent = '🌞'; // Sun icon for light theme
        } else {
            themeIcon.textContent = '🌙'; // Moon icon for dark theme
        }
    }


    // --- Scroll to Top Button ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // --- Form Validation (Contact Page) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Пожалуйста, заполните все поля!');
                event.preventDefault(); // Предотвращаем отправку, если поля пустые
                return false;
            }

            if (!validateEmail(email)) {
                alert('Пожалуйста, введите корректный email!');
                event.preventDefault(); // Предотвращаем отправку
                return false;
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }


    // --- Cost Calculator Functionality (Services Page) ---
    const pagesInput = document.getElementById('pages');
    const pagesValueSpan = document.getElementById('pagesValue');
    const adaptivityCheckbox = document.getElementById('adaptivity');
    const animationsCheckbox = document.getElementById('animations');
    const seoCheckbox = document.getElementById('seo');
    const calculateBtn = document.getElementById('calculateBtn');
    const totalPriceElement = document.getElementById('totalPrice');
    const priceDetailsElement = document.getElementById('priceDetails');

    if (pagesInput) { // Check if the elements exist on the current page
        const basePrice = 500;
        const pricePerExtraPage = 100;
        const adaptivityPrice = 200;
        const animationsPrice = 300;
        const seoPrice = 150;

        pagesInput.addEventListener('input', () => {
            pagesValueSpan.textContent = pagesInput.value;
        });

        calculateBtn.addEventListener('click', () => {
            let total = 0;
            let details = [];

            total += basePrice;
            details.push(`Базовая стоимость (1 стр.): ${basePrice} грн`);

            const pages = parseInt(pagesInput.value, 10);
            if (pages > 1) {
                const extraPagesPrice = (pages - 1) * pricePerExtraPage;
                total += extraPagesPrice;
                details.push(`+ ${extraPagesPrice} грн за ${pages - 1} доп. стр.`);
            }

            if (adaptivityCheckbox.checked) {
                total += adaptivityPrice;
                details.push(`+ ${adaptivityPrice} грн за адаптивность`);
            }

            if (animationsCheckbox.checked) {
                total += animationsPrice;
                details.push(`+ ${animationsPrice} грн за анимации`);
            }

            if (seoCheckbox.checked) {
                total += seoPrice;
                details.push(`+ ${seoPrice} грн за SEO-оптимизацию`);
            }

            totalPriceElement.textContent = `${total} грн`;
            priceDetailsElement.innerHTML = details.join('<br>');
        });
    }


    // --- ToDo List Functionality (Main Page) ---
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    if (taskInput) { // Check if the elements exist on the current page
        loadTasks();

        addTaskBtn.addEventListener('click', () => {
            addTask();
        });

        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        taskList.addEventListener('click', (e) => {
            if (e.target.classList.contains('task-text')) {
                e.target.closest('.todo-item').classList.toggle('completed');
                saveTasks();
            }

            if (e.target.classList.contains('delete-btn')) {
                e.target.closest('.todo-item').remove();
                saveTasks();
            }
        });

        function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                createTaskElement(taskText);
                taskInput.value = '';
                saveTasks();
            }
        }

        function createTaskElement(text, isCompleted = false) {
            const li = document.createElement('li');
            li.classList.add('todo-item');
            if (isCompleted) {
                li.classList.add('completed');
            }

            li.innerHTML = `
                <span class="task-text">${text}</span>
                <div class="todo-item-actions">
                    <button class="delete-btn">✖</button>
                </div>
            `;
            taskList.appendChild(li);
        }

        function saveTasks() {
            const tasks = [];
            document.querySelectorAll('.todo-item').forEach(item => {
                tasks.push({
                    text: item.querySelector('.task-text').textContent,
                    completed: item.classList.contains('completed')
                });
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks'));
            if (tasks) {
                tasks.forEach(task => {
                    createTaskElement(task.text, task.completed);
                });
            }
        }
    }
});