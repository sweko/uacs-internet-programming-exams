document.addEventListener('DOMContentLoaded', () => {
    const bandsTable = document.getElementById('bandsTable');
    const nameFilter = document.getElementById('nameFilter');
    const countryFilter = document.getElementById('countryFilter');
    const genreFilter = document.getElementById('genreFilter');
    const yearActiveFilter = document.getElementById('yearActiveFilter');

    let bandsData = []; 

    fetch('https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json')
        .then(response => response.json())
        .then(data => {
            bandsData = data.metalBands;
            populateTable(bandsData);
            populateFilterDropdowns(bandsData);
        })
        .catch(error => console.error('Error fetching data:', error));

    function populateTable(data) {
        const table = document.getElementById('bandsTable');
    
        table.innerHTML = '';
    
        const headers = [
            'ID',
            'Name',
            'Formed',
            'Location',
            'Country',
            'Genre',
            'Members',
            'Albums',
            'First Album',
            'Last Album',
            'Years Active'
        ];
    
        const headerRow = table.insertRow();
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
    
        data.forEach(band => {
            const row = table.insertRow();
            row.innerHTML = `
                <td>${band.id}</td>
                <td>${band.name}</td>
                <td>${band.formed}</td>
                <td>${band.location}</td>
                <td>${band.location.split(', ')[1]}</td>
                <td>${band.genre}</td>
                <td>${formatMembers(band.members)}</td>
                <td>${band.albums.length}</td>
                <td>${band.albums[0].name} (${band.albums[0].year})</td>
                <td>${band.albums[band.albums.length - 1].name} (${band.albums[band.albums.length - 1].year})</td>
                <td>${getYearsActive(band)}</td>
            `;
        });
    }
    
    function formatMembers(members) {
        if (members.length > 5) {
            members = members.slice(0, 5).sort();
            members[members.length - 1] = members[members.length - 1].replace(/,/, ' &');
            return members.join(', ') + '...';
        } else if (members.length <= 3) {
            return members.join(' & ');
        } else {
            return members.slice().sort().join(', ');
        }
    }
    
    function getYearsActive(band) {
        const latestYear = Math.max(...band.albums.map(album => album.year));
        const endYear = latestYear > new Date().getFullYear() - 2 ? 'present' : latestYear;
        return `${band.formed} - ${endYear}`;
    }
    function populateFilterDropdowns(data) {
        const countries = [...new Set(data.map(band => band.location.split(', ')[1]))];
        const genres = [...new Set(data.map(band => band.genre))];
    
        const countryFilter = document.getElementById('countryFilter');
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countryFilter.appendChild(option);
        });
    
        const genreFilter = document.getElementById('genreFilter');
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreFilter.appendChild(option);
        });
    }
    

    nameFilter.addEventListener('input', applyFilters);
    countryFilter.addEventListener('change', applyFilters);
    genreFilter.addEventListener('change', applyFilters);
    yearActiveFilter.addEventListener('input', applyFilters);

    function applyFilters() {
        const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
        const countryFilter = document.getElementById('countryFilter').value;
        const genreFilter = document.getElementById('genreFilter').value;
        const yearActiveFilter = parseInt(document.getElementById('yearActiveFilter').value);
    
        const filteredData = bandsData.filter(band => {
            return (
                band.name.toLowerCase().includes(nameFilter) &&
                (countryFilter === '' || band.location.split(', ')[1] === countryFilter) &&
                (genreFilter === '' || band.genre === genreFilter) &&
                (!yearActiveFilter || (band.formed <= yearActiveFilter && Math.max(...band.albums.map(album => album.year)) >= yearActiveFilter))
            );
        });
    
        populateTable(filteredData);
    }
    
}
);
