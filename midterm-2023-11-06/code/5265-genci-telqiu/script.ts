type Band = {
    id: number;
    name: string;
    genre: string;
    formed: number;
    location: string;
    members: string[];
    albums: Album[];
  };
  
  type Album = {
    name: string;
    year: number;
  };
  
  
  const loadData = async () => {
    const datauri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json";
    const response = await fetch(datauri);
    if (!response.ok) {
        throw new Error("The data is not there");
    }

    const data = await response.json();
    return data.metalBands;
}

const displayBands = (metalbands: Band[]) => {
    const container = document.getElementById("band-container")!;
    container.innerHTML = "";
    for (const metalband of metalbands) {
        const metalBandRow = generateMetalBandRow(metalband);
        container.append(metalBandRow);
    }
}

const generateMetalBandRow = (metalband: Band) => {
    const row = document.createElement("div");
    row.classList.add("band-table");

    const idCell = document.createElement("div");
    idCell.classList.add("band-data", "band-id");
    idCell.innerHTML = metalband.id.toString();
    row.appendChild(idCell);

    const nameCell = document.createElement("div");
    nameCell.classList.add("band-data", "band-name");
    nameCell.innerHTML = metalband.name.toString();
    row.appendChild(nameCell);

    const formedCell = document.createElement("div");
    formedCell.classList.add("band-data", "band-formed");
    formedCell.innerHTML = metalband.formed.toString();
    row.appendChild(formedCell);

    const locationCell = document.createElement("div");
    locationCell.classList.add("band-data", "band-location");
    locationCell.innerHTML = metalband.location.toString();
    row.appendChild(locationCell);


    const countryCell = document.createElement("div");
    countryCell.classList.add("band-data", "band-country");
    countryCell.innerHTML = metalband.location.split(", ")[1];
    row.appendChild(countryCell);

    const membersCell = document.createElement("div");
    membersCell.classList.add("band-data", "band-members");
    membersCell.innerHTML = metalband.members.toString();
    row.appendChild(membersCell);

    const albumsCell = document.createElement("div");
    albumsCell.classList.add("band-data", "band-albums");
    albumsCell.innerHTML = `Has ${metalband.albums.length.toString()} albums`;
    row.appendChild(albumsCell);

    return row;
}


loadData()
    .then(displayBands)
    .catch((error) => console.error(error));

async function loadDataAndPopulateFilters() {
    try {
        const githubUrl = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json"; // Replace with your GitHub URL

        const response = await fetch(githubUrl);
        if (!response.ok) {
            throw new Error("Failed to load data");
        }

        const data = await response.json();

        const uniqueCountries = [...new Set(data.metalBands.map(band => band.location.split(', ')[1]))];
        const uniqueGenres = [...new Set(data.metalBands.map(band => band.genre))];

        const countrySelect = document.getElementById("country-filter-select");
        uniqueCountries.forEach(country => {
            const option = document.createElement("option");
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });

        const genreSelect = document.getElementById("genre-filter-select");
        uniqueGenres.forEach(genre => {
            const option = document.createElement("option");
            option.value = genre;
            option.textContent = genre;
            genreSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

loadDataAndPopulateFilters();


