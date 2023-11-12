const api = 'https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json';

async function fetchData() {
  try {
    const response = await fetch(api);
    const data = await response.json();
    const metalBands = data.metalBands;

    displayBands(metalBands);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayBands(bands) {
  const bandContainer = document.getElementById('band-container');

  bands.forEach((band) => {
    const sortedMembers = band.members.slice().sort();

    let membersString = sortedMembers.slice(0, 5).join(', ');
    if (sortedMembers.length > 5) {
      membersString += '...';
    }

    membersString = membersString.replace(/, ([^,]*)$/, ' & $1');

    const formedYear = band.formed;
    const albumYears = band.albums.map((album) => album.year);
    const endYear = Math.max(...albumYears);
    const currentYear = new Date().getFullYear();
    let yearsActive;

    if (endYear >= currentYear - 2) {
      yearsActive = `${formedYear} - present`;
    } else {
      yearsActive = `${formedYear} - ${endYear}`;
    }

    const bandTable = document.createElement('div');
    bandTable.className = 'band-table';
    bandTable.innerHTML = `
      <div class="band-data">${band.id}</div>
      <div class="band-data">${band.name}</div>
      <div class="band-data">${band.formed}</div>
      <div class="band-data">${band.location.split(', ')[0]}</div>
      <div class="band-data">${band.location.split(', ')[1]}</div>
      <div class="band-data">${band.genre}</div>
      <div class="band-data">${membersString}</div>
      <div class="band-data">${band.albums.length}</div>
      <div class="band-data">${band.albums[0].name} (${band.albums[0].year})</div>
      <div class="band-data">${band.albums[band.albums.length - 1].name} (${band.albums[band.albums.length - 1].year})</div>
      <div class="band-data">${yearsActive}</div>
    `;
    bandContainer.appendChild(bandTable);
  });
}
  
const sortOrders = {
    id: 'asc',
    name: 'asc',
    formed: 'asc',
    location: 'asc',
    country: 'asc',
    genre: 'asc',
    members: 'asc',
    albums: 'asc',
    'first-album': 'asc',
    'last-album': 'asc',
    'years-active': 'asc',
};

let bands = [];

function sortTable(column) {
    const icon = document.getElementById(`${column}-icon`);
    const sortOrder = sortOrders[column];
  
    for (const key in sortOrders) {
      const otherIcon = document.getElementById(`${key}-icon`);
      otherIcon.className = 'fas fa-sort';
    }
  
    if (sortOrder === 'asc') {
      icon.className = 'fas fa-sort-up';
  
      bands.sort((a, b) => {
        if (column === 'id') {
          return a.id - b.id;
        }
      });
  
      displayBands(bands);
  
      sortOrders[column] = 'desc';
    } else {
      icon.className = 'fas fa-sort-down';
  
      bands.sort((a, b) => {
        if (column === 'id') {
          return b.id - a.id;
        }
      });
  
      displayBands(bands);
  
      sortOrders[column] = 'asc';
    }
}

fetchData();
  