// Dados dos cursos - com mais variedade
const courses = [
    {
        id: 1,
        title: "Fundamentos de Redes de Computadores",
        author: "Prof. Ricardo Mendes",
        category: "Redes",
        lessons: 24,
        duration: 18,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        badges: ["Bestseller"],
        link: "#"
    },
    {
        id: 2,
        title: "Desenvolvimento Web Moderno",
        author: "Ana Silva",
        category: "Front-end",
        lessons: 36,
        duration: 28,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badges: ["Premium"],
        link: "#"
    },
    {
        id: 3,
        title: "JavaScript Avançado",
        author: "Carlos Oliveira",
        category: "JavaScript",
        lessons: 42,
        duration: 35,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badges: ["Premium", "Bestseller"],
        link: "#"
    },
    {
        id: 4,
        title: "Node.js e MongoDB",
        author: "Maria Santos",
        category: "Full Stack",
        lessons: 30,
        duration: 25,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badges: ["Bestseller"],
        link: "#"
    },
    {
        id: 5,
        title: "React do Zero ao Avançado",
        author: "João Pereira",
        category: "Front-end",
        lessons: 48,
        duration: 40,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badges: ["Premium"],
        link: "#"
    },
    {
        id: 6,
        title: "Python para Data Science",
        author: "Laura Costa",
        category: "Data Science",
        lessons: 32,
        duration: 26,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badges: [],
        link: "#"
    },
    {
        id: 7,
        title: "HTML5 e CSS3 Completo",
        author: "AcademiaTech",
        category: "Front-end",
        lessons: 35,
        duration: 28,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badges: ["Bestseller"],
        link: "#"
    },
    {
        id: 8,
        title: "Banco de Dados MySQL",
        author: "Prof. Roberto Alves",
        category: "Back-end",
        lessons: 28,
        duration: 22,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badges: [],
        link: "#"
    }
];

// Elementos DOM
const coursesGrid = document.getElementById('coursesGrid');
const searchInput = document.getElementById('searchInput');
const filterIcon = document.getElementById('filter-icon');
const categoryDropdown = document.getElementById('categoryDropdown');
const closeDropdown = document.getElementById('closeDropdown');
const clearFiltersBtn = document.getElementById('clearFilters');
const applyFiltersBtn = document.getElementById('applyFilters');
const categoryCheckboxes = document.querySelectorAll('.category-option input');

// Variáveis para armazenar filtros ativos
let activeFilters = {
    search: '',
    categories: []
};

// Função para renderizar os cursos
function renderCourses(coursesToRender) {
    if (!coursesGrid) return;
    
    coursesGrid.innerHTML = '';

    if (coursesToRender.length === 0) {
        coursesGrid.innerHTML = `
            <div class="no-courses">
                <i class="fas fa-search"></i>
                <h3>Nenhum curso encontrado</h3>
                <p>Tente ajustar seus filtros de busca ou categoria</p>
            </div>
        `;
        return;
    }

    coursesToRender.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';

        // Construir badges
        let badgesHTML = '';
        if (course.badges && course.badges.length > 0) {
            course.badges.forEach(badge => {
                const badgeClass = badge === "Premium" ? "premium" : "bestseller";
                badgesHTML += `<span class="badge ${badgeClass}">${badge}</span>`;
            });
        }

        courseCard.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
                <div class="course-badges">
                    ${badgesHTML}
                </div>
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <div class="course-author">
                    <i class="fas fa-user"></i>
                    <span>${course.author}</span>
                </div>
                <div class="course-details">
                    <div class="course-lessons">
                        <i class="fas fa-play-circle"></i>
                        <span>${course.lessons} aulas</span>
                    </div>
                    <div class="course-duration">
                        <i class="fas fa-clock"></i>
                        <span>${course.duration}h</span>
                    </div>
                </div>
                <!-- BOTÃO -->
                <a href="${course.link}" class="course-btn" target="_blank">
                    Acessar curso
                </a>
            </div>
        `;

        coursesGrid.appendChild(courseCard);
    });
}

// Função para filtrar cursos
function filterCourses() {
    const searchTerm = activeFilters.search.toLowerCase().trim();
    const selectedCategories = activeFilters.categories;

    const filteredCourses = courses.filter(course => {
        // Filtro por busca
        const matchesSearch = searchTerm === '' ||
            course.title.toLowerCase().includes(searchTerm) ||
            course.author.toLowerCase().includes(searchTerm) ||
            course.category.toLowerCase().includes(searchTerm);

        // Filtro por categoria
        const matchesCategory = selectedCategories.length === 0 ||
            selectedCategories.includes(course.category);

        return matchesSearch && matchesCategory;
    });

    renderCourses(filteredCourses);
}

// Função para atualizar filtros de categoria
function updateCategoryFilters() {
    activeFilters.categories = Array.from(categoryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    
    filterCourses();
}

// Função para limpar todos os filtros
function clearAllFilters() {
    // Limpar busca
    searchInput.value = '';
    activeFilters.search = '';
    
    // Limpar checkboxes
    categoryCheckboxes.forEach(checkbox => checkbox.checked = false);
    activeFilters.categories = [];
    
    // Fechar dropdown
    categoryDropdown.classList.remove('show');
    
    // Aplicar filtros
    filterCourses();
}

// Inicializar - renderizar todos os cursos
renderCourses(courses);

// Event Listeners
searchInput.addEventListener('input', (e) => {
    activeFilters.search = e.target.value;
    filterCourses();
});

// Abrir dropdown de filtros
filterIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    categoryDropdown.classList.toggle('show');
});

// Fechar dropdown
closeDropdown.addEventListener('click', () => {
    categoryDropdown.classList.remove('show');
});

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
    if (!filterIcon.contains(e.target) && !categoryDropdown.contains(e.target)) {
        categoryDropdown.classList.remove('show');
    }
});

// Atualizar filtros quando categorias forem alteradas
categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateCategoryFilters);
});

// Aplicar filtros (botão no dropdown)
applyFiltersBtn.addEventListener('click', () => {
    categoryDropdown.classList.remove('show');
    updateCategoryFilters();
});

// Limpar todos os filtros
clearFiltersBtn.addEventListener('click', clearAllFilters);

// Tecla ESC fecha o dropdown
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && categoryDropdown.classList.contains('show')) {
        categoryDropdown.classList.remove('show');
    }
});

// Focar no input quando clicar na área da busca
document.getElementById('poda').addEventListener('click', (e) => {
    if (e.target !== searchInput) {
        searchInput.focus();
    }
});