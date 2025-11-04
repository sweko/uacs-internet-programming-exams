// Constants
const API_URL = 'https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/dry-run-mid-term-2025/data/authors.json';

// State management
let authors = [];
let currentSort = {
    column: 'id',
    ascending: true
};

// Cache DOM elements
const authorsList = document.getElementById('authors-list');
const nationalityFilter = document.getElementById('nationality-filter');
const nameFilter = document.getElementById('name-filter');
const aliveFilter = document.getElementById('alive-filter');
const activeYearFilter = document.getElementById('active-year-filter');
const modal = document.getElementById('book-modal');
const closeModal = document.querySelector('.close');

// Fetch and initialize data
async function fetchAuthors() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        authors = data.authors;
        initializeNationalityFilter();
        renderAuthors();
    } catch (error) {
        console.error('Error fetching authors:', error);
    }
}

// Initialize nationality filter with unique values
function initializeNationalityFilter() {
    const nationalities = [...new Set(authors.map(author => author.nationality))].sort();
    nationalities.forEach(nationality => {
        const option = document.createElement('option');
        option.value = nationality;
        option.textContent = nationality;
        nationalityFilter.appendChild(option);
    });
}

// Helper functions
/**
 * Parse a variety of date string formats into a JS Date object.
 * Does not modify the source data; returns null if parsing fails.
 */
function parseDateToJS(d) {
    if (!d) return null;
    if (d instanceof Date) return d;
    if (typeof d !== 'string') return null;
    const s = d.trim();

    // YYYY-MM-DD or YYYY-M-D
    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(s)) {
        const [y, m, day] = s.split('-').map(Number);
        return new Date(y, m - 1, day);
    }

    // MM/DD/YYYY (common US format)
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
        const [mo, day, y] = s.split('/').map(Number);
        return new Date(y, mo - 1, day);
    }

    // YYYY/MM/DD
    if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(s)) {
        const [y, m, day] = s.split('/').map(Number);
        return new Date(y, m - 1, day);
    }

    // YYYY.MM.DD
    if (/^\d{4}\.\d{1,2}\.\d{1,2}$/.test(s)) {
        const [y, m, day] = s.split('.').map(Number);
        return new Date(y, m - 1, day);
    }

    // Dashes with ambiguous order: e.g. 11-05-2001
    if (/^\d{1,2}-\d{1,2}-\d{4}$/.test(s)) {
        const [p1, p2, y] = s.split('-').map(Number);
        // If first part >12 assume D-M-YYYY, otherwise assume M-D-YYYY
        if (p1 > 12) {
            return new Date(y, p2 - 1, p1);
        }
        return new Date(y, p1 - 1, p2);
    }

    // Fallback: let Date try to parse common formats
    const parsed = new Date(s);
    if (!isNaN(parsed)) return parsed;
    return null;
}

function formatDateIso(d) {
    const date = parseDateToJS(d);
    if (!date) return d || '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}
function calculateAge(birthDate, deathDate = null) {
    const birth = parseDateToJS(birthDate);
    const end = deathDate ? parseDateToJS(deathDate) : new Date();
    if (!birth || isNaN(birth)) return '';
    const age = Math.floor((end - birth) / (365.25 * 24 * 60 * 60 * 1000));
    return age;
}

function isAlive(author) {
    return !author.death_date;
}

function formatBibliography(bibliography) {
    const counts = bibliography.reduce((acc, book) => {
        const type = book.type.charAt(0).toUpperCase() + book.type.slice(1).toLowerCase();
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(counts)
        .map(([type, count]) => `${count} ${type}${count === 1 ? '' : 's'}`)
        .join(', ')
        .replace(/,([^,]*)$/, ' and$1');
}

function getYearsActive(author) {
    const books = author.bibliography;
    if (!books.length) return 'N/A';

    const years = books.map(book => typeof book.year === 'string' ? parseInt(book.year) : book.year);
    const startYear = Math.min(...years);
    let endYear;

    if (author.death_date) {
        const d = parseDateToJS(author.death_date);
        endYear = d ? d.getFullYear() : new Date(author.death_date).getFullYear();
    } else {
        const maxYear = Math.max(...years);
        const currentYear = new Date().getFullYear();
        endYear = (currentYear - maxYear <= 2) ? 'present' : maxYear;
    }

    return `${startYear} - ${endYear}`;
}

// Filtering functions
function applyFilters() {
    let filteredAuthors = [...authors];

    // Name filter
    const nameQuery = nameFilter.value.toLowerCase();
    if (nameQuery) {
        filteredAuthors = filteredAuthors.filter(author =>
            author.name.toLowerCase().includes(nameQuery)
        );
    }

    // Nationality filter
    const nationalityQuery = nationalityFilter.value;
    if (nationalityQuery) {
        filteredAuthors = filteredAuthors.filter(author =>
            author.nationality === nationalityQuery
        );
    }

    // Alive filter
    if (aliveFilter.checked) {
        filteredAuthors = filteredAuthors.filter(isAlive);
    }

    // Active year filter
    const activeYear = activeYearFilter.value;
    if (activeYear) {
        const activeYearNum = parseInt(activeYear, 10);
        filteredAuthors = filteredAuthors.filter(author => {
            const years = author.bibliography
                .map(book => typeof book.year === 'string' ? parseInt(book.year) : book.year);
            const startYear = Math.min(...years);
            let endYear = Math.max(...years);
            if (author.death_date) {
                const d = parseDateToJS(author.death_date);
                if (d) endYear = d.getFullYear();
            }
            return activeYearNum >= startYear && activeYearNum <= endYear;
        });
    }

    return filteredAuthors;
}

// Sorting functions
function applySorting(authors) {
    return authors.sort((a, b) => {
        let comparison = 0;
        
        switch (currentSort.column) {
            case 'id':
                comparison = (typeof a.id === 'string' ? parseInt(a.id) : a.id) -
                           (typeof b.id === 'string' ? parseInt(b.id) : b.id);
                break;
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'birthDate':
                const aBirth = parseDateToJS(a.birth_date);
                const bBirth = parseDateToJS(b.birth_date);
                if (aBirth && bBirth) {
                    comparison = aBirth - bBirth;
                } else if (aBirth && !bBirth) {
                    comparison = 1;
                } else if (!aBirth && bBirth) {
                    comparison = -1;
                } else {
                    comparison = 0;
                }
                break;
            case 'alive':
                comparison = isAlive(b) - isAlive(a);
                break;
            case 'age':
                comparison = calculateAge(a.birth_date, a.death_date) -
                           calculateAge(b.birth_date, b.death_date);
                break;
            case 'nationality':
                comparison = a.nationality.localeCompare(b.nationality);
                break;
            case 'bibliography':
                comparison = a.bibliography.length - b.bibliography.length;
                break;
            case 'yearsActive':
                const aYears = a.bibliography.map(book => typeof book.year === 'string' ? parseInt(book.year) : book.year);
                const bYears = b.bibliography.map(book => typeof book.year === 'string' ? parseInt(book.year) : book.year);
                comparison = Math.min(...aYears) - Math.min(...bYears);
                if (comparison === 0) {
                    const aMax = Math.max(...aYears);
                    const bMax = Math.max(...bYears);
                    comparison = aMax - bMax;
                }
                break;
        }

        return currentSort.ascending ? comparison : -comparison;
    });
}

// Rendering functions
function renderAuthors() {
    const filteredAuthors = applyFilters();
    const sortedAuthors = applySorting(filteredAuthors);

    authorsList.innerHTML = sortedAuthors.map(author => `
        <tr>
            <td>${author.id}</td>
            <td>${author.name}</td>
            <td>${formatDateIso(author.birth_date)}</td>
            <td><input type="checkbox" ${isAlive(author) ? 'checked' : ''} disabled></td>
            <td>${calculateAge(author.birth_date, author.death_date)}</td>
            <td>${author.nationality}</td>
            <td class="bibliography-link" onclick="showBibliography('${author.id}')">
                ${formatBibliography(author.bibliography)}
            </td>
            <td>${getYearsActive(author)}</td>
        </tr>
    `).join('');

    // Update sort arrows
    document.querySelectorAll('.sort-arrow').forEach(arrow => {
        arrow.className = 'sort-arrow';
        const column = arrow.parentElement.dataset.sort;
        if (column === currentSort.column) {
            arrow.classList.add(currentSort.ascending ? 'asc' : 'desc');
        }
    });
}

// Modal functions
function showBibliography(authorId) {
    const author = authors.find(a => a.id.toString() === authorId.toString());
    if (!author) return;

    const books = [...author.bibliography]
        .sort((a, b) => b.year - a.year)
        .map(book => `
            <tr>
                <td>${book.name}</td>
                <td>${book.year}</td>
                <td>${book.type.charAt(0).toUpperCase() + book.type.slice(1).toLowerCase()}</td>
            </tr>
        `).join('');

    document.getElementById('modal-title').textContent = `${author.name}'s Bibliography`;
    document.getElementById('modal-books-list').innerHTML = books;
    // Show modal and prevent background scrolling so scrolls go to the modal content
    modal.style.display = 'flex';
    // lock page scroll
    document.body.style.overflow = 'hidden';
}

// Event listeners
document.querySelectorAll('.authors-table th').forEach(header => {
    header.addEventListener('click', () => {
        const column = header.dataset.sort;
        if (currentSort.column === column) {
            currentSort.ascending = !currentSort.ascending;
        } else {
            currentSort.column = column;
            currentSort.ascending = true;
        }
        renderAuthors();
    });
});

nameFilter.addEventListener('input', renderAuthors);
nationalityFilter.addEventListener('change', renderAuthors);
aliveFilter.addEventListener('change', renderAuthors);
activeYearFilter.addEventListener('input', renderAuthors);

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    // restore page scroll
    document.body.style.overflow = '';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        // restore page scroll
        document.body.style.overflow = '';
    }
});

// Close on ESC key and restore scroll
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Initialize the application
fetchAuthors();