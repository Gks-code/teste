// Dados dos cursos - não estão diretamente no HTML
const courses = [
    {
        id: 1,
        title: "HTML e CSS",
        author: "AcademiaTech",
        category: "Front-end",
        lessons: 30,
        duration: 20,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badges: [],
        link: "https://t.me/c/2606208161/1796"
    },
    {
        id: 2,
        title: "JavaScript",
        author: "AcademiaTech",
        category: "Front-end",
        lessons: 40,
        duration: 35,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badges: [],
        link: "https://t.me/c/2606208161/2746"
    },
    {
        id: 3,
        title: "The Complete JavaScript Course (Legendado)",
        author: "AcademiaTech",
        category: "JavaScript",
        lessons: 60,
        duration: 45,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badges: ["Premium"],
        link: "https://t.me/c/2606208161/16824"
    },
    {
        id: 4,
        title: "JavaScript e TypeScript do Básico",
        author: "AcademiaTech",
        category: "JavaScript",
        lessons: 55,
        duration: 42,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badges: [],
        link: "https://t.me/c/2606208161/19538"
    },
    {
        id: 5,
        title: "JavaScript Funcional e Reativo - Cod3r",
        author: "Cod3r",
        category: "JavaScript",
        lessons: 48,
        duration: 38,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badges: ["Bestseller"],
        link: "https://t.me/c/2606208161/20148"
    },
    {
        id: 6,
        title: "Formação Full Stack JavaScript",
        author: "AcademiaTech",
        category: "Full Stack",
        lessons: 80,
        duration: 70,
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        badges: ["Premium"],
        link: "https://t.me/c/2606208161/20215"
    }
];

// Elementos DOM - ATENÇÃO: Verifique se esses elementos existem no index.html
const coursesGrid = document.getElementById('coursesGrid');
const searchInput = document.getElementById('searchInput');
const categoryBtn = document.getElementById('categoryBtn');
const categoryDropdown = document.getElementById('categoryDropdown');
const clearFiltersBtn = document.getElementById('clearFilters');
const categoryCheckboxes = document.querySelectorAll('.category-option input');

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

// Função para filtrar cursos (SIMPLIFICADA para index.html)
function filterCourses() {
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    const filteredCourses = courses.filter(course => {
        // Filtro por busca
        return searchTerm === '' ||
            course.title.toLowerCase().includes(searchTerm) ||
            course.author.toLowerCase().includes(searchTerm) ||
            course.category.toLowerCase().includes(searchTerm);
    });

    renderCourses(filteredCourses);
}

// Inicializar - renderizar todos os cursos
renderCourses(courses);

// Event Listeners (apenas se os elementos existirem)
if (searchInput) {
    searchInput.addEventListener('input', filterCourses);
}

if (categoryBtn && categoryDropdown) {
    categoryBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        categoryDropdown.classList.toggle('show');
    });
}

// Fechar dropdown ao clicar fora
if (categoryDropdown) {
    document.addEventListener('click', (e) => {
        if (categoryBtn && !categoryBtn.contains(e.target) && !categoryDropdown.contains(e.target)) {
            categoryDropdown.classList.remove('show');
        }
    });
}
// Atualizar filtros quando categorias forem selecionadas
if (categoryCheckboxes.length > 0) {
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterCourses);
    });
}

// Limpar filtros
if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (categoryCheckboxes.length > 0) {
            categoryCheckboxes.forEach(checkbox => checkbox.checked = false);
        }
        filterCourses();
        if (categoryDropdown) categoryDropdown.classList.remove('show');
    });
}