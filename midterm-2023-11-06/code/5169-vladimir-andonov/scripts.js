document.addEventListener('DOMContentLoaded', () => {
  
  fetch('https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json')
    .then((response) => response.json())
    .then((data) => {
      const bandData = data.metalBands;

      const tableBody = document.getElementById('band-container');

      function populateTable(data) {
        tableBody.innerHTML = '';
        data.forEach((band) => {
          const row = document.createElement('div');
          row.className = 'band-table';
          row.innerHTML = `
            <div class="band-data">${band.id}</div>
            <div class="band-data">${band.name}</div>
            <div class="band-data">${band.formed}</div>
            <div class="band-data">${band.location}</div>
            <div class="band-data">${band.location.split(', ')[1]}</div>
            <div class="band-data">${band.members.slice(0, 5).join(', ').replace(/, ([^,]*)$/, ' & $1')}</div>
            <div class="band-data">${band.albums.length}</div>
          `;
          tableBody.appendChild(row);
        });
      }

      function sortTable(column, isAscending) {
        bandData.sort((a, b) => {
          const valA = a[column];
          const valB = b[column];
          const comparison = isAscending ? 1 : -1;

          if (column === 'members') {
            return valA.length - valB.length || valA.localeCompare(valB);
          }

          if (column === 'albums') {
            return valA.length - valB.length || valA[0].year - valB[0].year || valA[0].name.localeCompare(valB[0].name);
          }

          return valA - valB;
        });

        populateTable(bandData);
      }

      function filterTable() {
        const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
        const countryFilter = document.getElementById('countryFilter').value;
        const genreFilter = document.getElementById('genreFilter').value;
        const yearsActiveFilter = parseInt(document.getElementById('yearsActiveFilter').value);

        const filteredData = bandData.filter((band) => {
          const country = band.location.split(', ')[1];
          return (
            band.name.toLowerCase().includes(nameFilter) &&
            (countryFilter === '' || countryFilter === country) &&
            (genreFilter === '' || genreFilter === band.genre) &&
            (isNaN(yearsActiveFilter) || (band.formed <= yearsActiveFilter && band.albums[0].year >= yearsActiveFilter))
          );
        });

        populateTable(filteredData);
      }

      document.querySelector('.band-header-table').addEventListener('click', (event) => {
        if (event.target.dataset.sort) {
          const column = event.target.dataset.sort;
          const isCurrentAscending = event.target.classList.contains('asc');

          // Toggle the sorting direction
          const isAscending = isCurrentAscending ? false : true;
          document.querySelectorAll('.band-header').forEach((header) => header.classList.remove('asc', 'desc'));
          event.target.classList.add(isAscending ? 'asc' : 'desc');

          sortTable(column, isAscending);
        }
      });

      document.getElementById('nameFilter').addEventListener('input', filterTable);
      document.getElementById('countryFilter').addEventListener('change', filterTable);
      document.getElementById('genreFilter').addEventListener('change', filterTable);
      document.getElementById('yearsActiveFilter').addEventListener('input', filterTable);

      populateTable(bandData);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});