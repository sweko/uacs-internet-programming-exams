// API URL
const API_URL = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/dry-run-mid-term-2024/data/authors.json";

// Global state
let authors = [];
let filteredAuthors = [];
let currentSort = { field: null, ascending: true };

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    await loadAuthors();
    populateNationalityFilter();
    displayAuthors();
    setupEventListeners();
});

// Load authors from API
async function loadAuthors() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        authors = data.authors || data;
        filteredAuthors = [...authors];
    } catch (error) {
        console.error('Error loading authors:', error);
        alert('Failed to load authors data');
    }
}

// Populate nationality dropdown
function populateNationalityFilter() {
    const nationalitySelect = document.getElementById('nationality-search');
    const nationalities = [...new Set(authors.map(author => author.nationality))].sort();
    
    nationalities.forEach(nationality => {
        const option = document.createElement('option');
        option.value = nationality;
        option.textContent = nationality;
        nationalitySelect.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('search-authors').addEventListener('click', applyFilters);
    document.getElementById('name-search').addEventListener('input', applyFilters);
    document.getElementById('close-modal').addEventListener('click', closeModal);
}

// Apply filters
function applyFilters() {
    const nameFilter = document.getElementById('name-search').value.toLowerCase().trim();
    const nationalityFilter = document.getElementById('nationality-search').value;
    const aliveFilter = document.getElementById('alive-search').checked;
    const yearFilter = document.getElementById('year-search').value;

    filteredAuthors = authors.filter(author => {
        // Name filter
        if (nameFilter && !author.name.toLowerCase().includes(nameFilter)) {
            return false;
        }

        // Nationality filter
        if (nationalityFilter && author.nationality !== nationalityFilter) {
            return false;
        }

        // Alive filter
        if (aliveFilter && author.death_date) {
            return false;
        }

        // Year filter
        if (yearFilter) {
            const year = parseInt(yearFilter);
            const yearsActive = getYearsActive(author);
            if (!isActiveInYear(yearsActive, year)) {
                return false;
            }
        }

        return true;
    });

    displayAuthors();
}

// Check if author was active in a given year
function isActiveInYear(yearsActive, year) {
    if (!yearsActive) return false;
    
    const startYear = yearsActive.start;
    let endYear = yearsActive.end;
    
    if (yearsActive.endLabel === 'present') {
        endYear = new Date().getFullYear();
    }
    
    return year >= startYear && year <= endYear;
}

// Calculate age
function calculateAge(birthDate, deathDate) {
    const birth = new Date(birthDate);
    const end = deathDate ? new Date(deathDate) : new Date();
    
    let age = end.getFullYear() - birth.getFullYear();
    const monthDiff = end.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

// Get years active
function getYearsActive(author) {
    if (!author.bibliography || author.bibliography.length === 0) {
        return null;
    }

    const years = author.bibliography.map(book => parseInt(book.year)).filter(y => !isNaN(y));
    if (years.length === 0) return null;

    const startYear = Math.min(...years);
    const endYear = Math.max(...years);
    const currentYear = new Date().getFullYear();

    let endLabel;
    if (author.death_date) {
        const deathYear = new Date(author.death_date).getFullYear();
        endLabel = deathYear.toString();
    } else if (currentYear - endYear <= 2) {
        endLabel = 'present';
    } else {
        endLabel = endYear.toString();
    }

    return {
        start: startYear,
        end: author.death_date ? new Date(author.death_date).getFullYear() : endYear,
        endLabel: endLabel,
        display: `${startYear} - ${endLabel}`
    };
}

// Get bibliography summary
function getBibliographySummary(bibliography) {
    const typeCounts = {};
    
    bibliography.forEach(book => {
        const type = book.type.charAt(0).toUpperCase() + book.type.slice(1).toLowerCase();
        typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    const summaryParts = Object.entries(typeCounts).map(([type, count]) => {
        const plural = count === 1 ? type : pluralize(type);
        return `${count} ${plural}`;
    });

    if (summaryParts.length === 0) return '0 books';
    if (summaryParts.length === 1) return summaryParts[0];
    if (summaryParts.length === 2) return summaryParts.join(' and ');
    
    const lastPart = summaryParts.pop();
    return summaryParts.join(', ') + ' and ' + lastPart;
}

// Pluralize book types
function pluralize(type) {
    if (type === 'Collection') return 'Collections';
    if (type === 'Novella') return 'Novellas';
    return type + 's';
}

// Display authors
function displayAuthors() {
    displayHeaders();
    
    const container = document.getElementById('author-container');
    container.innerHTML = '';

    filteredAuthors.forEach(author => {
        const row = createAuthorRow(author);
        container.appendChild(row);
    });
}

// Display headers with sorting
function displayHeaders() {
    const headerContainer = document.querySelector('.author-header-table');
    headerContainer.innerHTML = '';

    const headers = [
        { label: 'ID', field: 'id' },
        { label: 'Name', field: 'name' },
        { label: 'Birth Date', field: 'birth_date' },
        { label: 'Alive', field: 'alive' },
        { label: 'Age', field: 'age' },
        { label: 'Nationality', field: 'nationality' },
        { label: 'Bibliography', field: 'bibliography' },
        { label: 'Years Active', field: 'years_active' }
    ];

    headers.forEach(header => {
        const headerDiv = document.createElement('div');
        headerDiv.className = 'author-header';
        headerDiv.style.cursor = 'pointer';
        
        let arrow = '';
        if (currentSort.field === header.field) {
            arrow = currentSort.ascending ? ' ▲' : ' ▼';
            headerDiv.classList.add('sorted');
        } else {
            arrow = ' ▽';
            headerDiv.classList.add('unsorted');
        }
        
        headerDiv.textContent = header.label + arrow;
        headerDiv.addEventListener('click', () => sortBy(header.field));
        
        headerContainer.appendChild(headerDiv);
    });
}

// Create author row
function createAuthorRow(author) {
    const row = document.createElement('div');
    row.className = 'author-row';

    // ID
    const idDiv = document.createElement('div');
    idDiv.className = 'author-data';
    idDiv.textContent = author.id;
    row.appendChild(idDiv);

    // Name
    const nameDiv = document.createElement('div');
    nameDiv.className = 'author-data';
    nameDiv.textContent = author.name;
    row.appendChild(nameDiv);

    // Birth Date
    const birthDiv = document.createElement('div');
    birthDiv.className = 'author-data';
    birthDiv.textContent = author.birth_date;
    row.appendChild(birthDiv);

    // Alive
    const aliveDiv = document.createElement('div');
    aliveDiv.className = 'author-data';
    const aliveCheckbox = document.createElement('input');
    aliveCheckbox.type = 'checkbox';
    aliveCheckbox.checked = !author.death_date;
    aliveCheckbox.disabled = true;
    aliveDiv.appendChild(aliveCheckbox);
    row.appendChild(aliveDiv);

    // Age
    const ageDiv = document.createElement('div');
    ageDiv.className = 'author-data';
    ageDiv.textContent = calculateAge(author.birth_date, author.death_date);
    row.appendChild(ageDiv);

    // Nationality
    const nationalityDiv = document.createElement('div');
    nationalityDiv.className = 'author-data';
    nationalityDiv.textContent = author.nationality;
    row.appendChild(nationalityDiv);

    // Bibliography
    const biblioDiv = document.createElement('div');
    biblioDiv.className = 'author-data';
    const biblioLink = document.createElement('a');
    biblioLink.href = '#';
    biblioLink.textContent = getBibliographySummary(author.bibliography);
    biblioLink.addEventListener('click', (e) => {
        e.preventDefault();
        showBibliographyModal(author);
    });
    biblioDiv.appendChild(biblioLink);
    row.appendChild(biblioDiv);

    // Years Active
    const yearsDiv = document.createElement('div');
    yearsDiv.className = 'author-data';
    const yearsActive = getYearsActive(author);
    yearsDiv.textContent = yearsActive ? yearsActive.display : 'N/A';
    row.appendChild(yearsDiv);

    return row;
}

// Sort authors
function sortBy(field) {
    if (currentSort.field === field) {
        currentSort.ascending = !currentSort.ascending;
    } else {
        currentSort.field = field;
        currentSort.ascending = true;
    }

    filteredAuthors.sort((a, b) => {
        let aValue, bValue;

        switch (field) {
            case 'id':
                aValue = parseInt(a.id);
                bValue = parseInt(b.id);
                break;
            case 'name':
                aValue = a.name.toLowerCase();
                bValue = b.name.toLowerCase();
                break;
            case 'birth_date':
                aValue = new Date(a.birth_date);
                bValue = new Date(b.birth_date);
                break;
            case 'alive':
                aValue = !a.death_date ? 1 : 0;
                bValue = !b.death_date ? 1 : 0;
                break;
            case 'age':
                aValue = calculateAge(a.birth_date, a.death_date);
                bValue = calculateAge(b.birth_date, b.death_date);
                break;
            case 'nationality':
                aValue = a.nationality.toLowerCase();
                bValue = b.nationality.toLowerCase();
                break;
            case 'bibliography':
                aValue = a.bibliography.length;
                bValue = b.bibliography.length;
                break;
            case 'years_active':
                const aYears = getYearsActive(a);
                const bYears = getYearsActive(b);
                aValue = aYears ? aYears.start * 10000 + aYears.end : 0;
                bValue = bYears ? bYears.start * 10000 + bYears.end : 0;
                break;
            default:
                return 0;
        }

        if (aValue < bValue) return currentSort.ascending ? -1 : 1;
        if (aValue > bValue) return currentSort.ascending ? 1 : -1;
        return 0;
    });

    displayAuthors();
}

// Show bibliography modal
function showBibliographyModal(author) {
    const modal = document.getElementById('biblio-modal');
    const authorName = document.getElementById('biblio-author-name');
    const biblioList = document.getElementById('biblio-list');

    authorName.textContent = `Books by ${author.name}`;
    
    // Sort books by year (newest to oldest)
    const sortedBooks = [...author.bibliography].sort((a, b) => {
        const yearA = parseInt(a.year);
        const yearB = parseInt(b.year);
        return yearB - yearA;
    });

    biblioList.innerHTML = '';
    
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    
    // Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['Name', 'Year', 'Type'].forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        th.style.border = '1px solid #ddd';
        th.style.padding = '8px';
        th.style.textAlign = 'left';
        th.style.backgroundColor = '#f2f2f2';
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Body
    const tbody = document.createElement('tbody');
    sortedBooks.forEach(book => {
        const row = document.createElement('tr');
        
        const nameCell = document.createElement('td');
        nameCell.textContent = book.name;
        nameCell.style.border = '1px solid #ddd';
        nameCell.style.padding = '8px';
        row.appendChild(nameCell);
        
        const yearCell = document.createElement('td');
        yearCell.textContent = book.year;
        yearCell.style.border = '1px solid #ddd';
        yearCell.style.padding = '8px';
        row.appendChild(yearCell);
        
        const typeCell = document.createElement('td');
        typeCell.textContent = book.type;
        typeCell.style.border = '1px solid #ddd';
        typeCell.style.padding = '8px';
        row.appendChild(typeCell);
        
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    
    biblioList.appendChild(table);
    modal.classList.remove('hidden');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('biblio-modal');
    modal.classList.add('hidden');
}
