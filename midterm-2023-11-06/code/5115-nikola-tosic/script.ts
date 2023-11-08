interface Album {
    name: string;
    year: number;
}

interface Band {
    id: number;
    name: string;
    formed: number;
    location: string;
    country: string;
    members: string[];
    albums: Album[];
}

type BandSorter = (first: Band, second: Band) => number;

document.addEventListener("DOMContentLoaded", siteCode);

let bands: Band[] = [];

async function siteCode() {
    const data = await loadData();
    bands = data;

    fillCountries(bands);

    displayBands(bands);

    const nameSort = document.getElementById("sort-name")!;
    nameSort.addEventListener("click", sortByName);

    const idSort = document.getElementById("sort-id")!;
    idSort.addEventListener("click", sortById);

    const applyFilterButton = document.getElementById("apply-filter")!;
    applyFilterButton.addEventListener("click", applyFilter);

    const modal = document.getElementById("album-details")!;
    modal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
}

const nameSorter: BandSorter = (first, second) => first.name.localeCompare(second.name);
const idSorter: BandSorter = (first, second) => first.id - second.id;

const sortByName = () => {
    const sortedBands = bands.slice().sort(nameSorter);
    displayBands(sortedBands);
};

const sortById = () => {
    const sortedBands = bands.slice().sort(idSorter);
    displayBands(sortedBands);
};

const fillCountries = (bands: Band[]) => {
    const filter = document.getElementById("country-filter")!;

    const countries = new Set<string>();
    for (const band of bands) {
        countries.add(band.country);
    }

    for (const country of countries) {
        const option = document.createElement("option");
        option.value = country;
        option.innerHTML = country;
        filter.appendChild(option);
    }
};

const applyFilter = () => {
    const countryElement = document.getElementById("country-filter") as HTMLSelectElement;
    const country = countryElement.value;

    let filteredBands = bands;
    if (country !== "all") {
        filteredBands = filteredBands.filter(band => band.country === country);
    }

    displayBands(filteredBands);
};

const loadData = async () => {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json";
    const response = await fetch(dataUri);

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data.metalBands;
};

const displayBands = (bands: Band[]) => {
    const container = document.getElementById("band-container")!;
    container.innerHTML = "";
    for (const band of bands) {
        const bandRow = generateBandRow(band);
        container.appendChild(bandRow);
    }
};

const generateBandRow = (band: Band) => {
    const row = document.createElement("div");
    row.classList.add("band-row");

    const idCell = document.createElement("div");
    idCell.classList.add("band-data", "band-id");
    idCell.innerHTML = band.id.toString();
    row.appendChild(idCell);

    const nameCell = document.createElement("div");
    nameCell.classList.add("band-data", "band-name");
    nameCell.innerHTML = band.name;
    row.appendChild(nameCell);

    const formedCell = document.createElement("div");
    formedCell.classList.add("band-data", "band-formed");
    formedCell.innerHTML = band.formed.toString();
    row.appendChild(formedCell);

    const locationCell = document.createElement("div");
    locationCell.classList.add("band-data", "band-location");
    locationCell.innerHTML = band.location;
    row.appendChild(locationCell);

    const countryCell = document.createElement("div");
    countryCell.classList.add("band-data", "band-country");
    countryCell.innerHTML = band.country;
    row.appendChild(countryCell);

    const membersCell = document.createElement("div");
    membersCell.classList.add("band-data", "band-members");
    membersCell.innerHTML = band.members.join(", ");
    row.appendChild(membersCell);

    const albumsCell = document.createElement("div");
    albumsCell.classList.add("band-data", "band-albums");
    albumsCell.innerHTML = band.albums.length.toString();
    albumsCell.addEventListener("click", () => {
        const modal = document.getElementById("album-details")!;
        modal.classList.remove("hidden");

        const modalHeader = document.querySelector("#album-details-content h2")! as HTMLHeadingElement;
        modalHeader.innerText = `Albums by ${band.name}`;

        const albumList = document.getElementById("album-details-list")! as HTMLUListElement;
        albumList.innerHTML = "";
        for (const album of band.albums.sort((a, b) => b.year - a.year)) {
            const albumItem = document.createElement("li");
            albumItem.innerText = `${album.name} (${album.year})`;
            albumList.appendChild(albumItem);
        }
    });
    row.appendChild(albumsCell);

    return row;
};
