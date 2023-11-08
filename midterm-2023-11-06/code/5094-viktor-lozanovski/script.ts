interface Album {
  name: string;
  year: number;
}

interface Band {
  id: number;
  name: string;
  genre: string;
  formed: number;
  location: string;
  members: string[];
  albums: Album[];
}

const bandContainer = document.getElementById('band-container')!;

function renderBands(bands: Band[]) {
  bandContainer.innerHTML = '';

  bands.forEach((band) => {
    const bandTable = document.createElement('div');
    bandTable.classList.add('band-table');

    const bandDataId = document.createElement('div');
    bandDataId.classList.add('band-data');
    bandDataId.textContent = band.id.toString();
    bandTable.appendChild(bandDataId);

    const bandDataName = document.createElement('div');
    bandDataName.classList.add('band-data');
    bandDataName.textContent = band.name;
    bandTable.appendChild(bandDataName);

    const bandDataFormed = document.createElement('div');
    bandDataFormed.classList.add('band-data');
    bandDataFormed.textContent = band.formed.toString();
    bandTable.appendChild(bandDataFormed);

    const bandDataLocation = document.createElement('div');
    bandDataLocation.classList.add('band-data');
    bandDataLocation.textContent = band.location;
    bandTable.appendChild(bandDataLocation);

    const bandDataCountry = document.createElement('div');
    bandDataCountry.classList.add('band-data');
    bandDataCountry.textContent = getCountryFromLocation(band.location);
    bandTable.appendChild(bandDataCountry);

    const bandDataMembers = document.createElement('div');
    bandDataMembers.classList.add('band-data');
    bandDataMembers.textContent = getFormattedMembers(band.members);
    bandTable.appendChild(bandDataMembers);

    const bandDataAlbums = document.createElement('div');
    bandDataAlbums.classList.add('band-data');
    bandDataAlbums.textContent = band.albums.length.toString();
    bandTable.appendChild(bandDataAlbums);

    bandContainer?.appendChild(bandTable);
  });
}

fetch('https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json')
  .then((response) => response.json())
  .then((data) => {
    const bands: Band[] = data.metalBands;
    renderBands(bands);
  })
  .catch((error) => {
    console.error('Error fetching band data:', error);
  });

function getCountryFromLocation(location: string): string {
  const parts = location.split(',');
  if (parts.length > 1) {
    return parts[parts.length - 1].trim();
  }
  return '';
}

function getFormattedMembers(members: string[]): string {
  const sortedMembers = members.sort();
  if (sortedMembers.length > 5) {
    const firstFiveMembers = sortedMembers.slice(0, 5);
    return `${firstFiveMembers.join(', ')} ...`;
  }
  if (sortedMembers.length > 2) {
    const lastMember = sortedMembers.pop();
    return `${sortedMembers.join(', ')} & ${lastMember}`;
  }
  return sortedMembers.join(', ');
}

fetch('https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json')
  .then((response) => response.json())
  .then((data) => {
    const bands: Band[] = data.metalBands;
    renderBands(bands);
  })
  .catch((error) => {
    console.error('Error fetching band data:', error);
  });
