"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
let rockband = [];
async function siteCode() {
    const data = await loadData();
    rockband = data.metalBands;
    fillLocation(rockband);
    const sortButton = document.getElementById("sort-id");
    sortButton.addEventListener("click", sortById);
    const sortName = document.getElementById("sort-name");
    sortName.addEventListener("click", sortByName);
    const applyName = document.getElementById("name-filter");
    applyName?.addEventListener("input", applyNameFilter);
    const applyButton = document.getElementById("apply-filter");
    applyButton.addEventListener("click", applyFilter);
    populateTable(rockband);
}
// Function to populate the HTML table with rock band data
const fillLocation = (rockband) => {
    const filter = document.getElementById("country-filter");
    const countries = new Set();
    for (const bandrock of rockband) {
        countries.add(bandrock.country);
    }
    for (const country of countries) {
        const option = document.createElement("option");
        option.value = country;
        option.innerHTML = country;
        filter.appendChild(option);
    }
};
const CountryFind = (rockband) => {
    let bandLocation = rockband.location;
    let Parts = bandLocation.split(",");
    let LastBit = Parts[Parts.length - 1];
    return LastBit;
};
const applyFilter = () => {
    const CountriesElement = document.getElementById("country-filter");
    const Countries = CountriesElement.value;
    console.log('Selected Country:', Countries);
    let filteredCountries = rockband;
    if (Countries !== "all") {
        filteredCountries = filteredCountries.filter(band => band.country === Countries);
    }
    console.log('Filtered Bands:', filteredCountries);
    populateTable(filteredCountries);
};
const loadData = async () => {
    const dataUri = 'https://raw.githubusercontent.com/GonnyFTW/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json';
    const response = await fetch(dataUri);
    if (!response.ok) {
        throw new Error("The data is not there");
    }
    const data = await response.json();
    return data;
};
const nameSorter = (first, second) => first.name.localeCompare(second.name);
const idSorter = (first, second) => first.ID - second.ID;
const sortByName = () => {
    const sortedBands = rockband.slice().sort(nameSorter);
    populateTable(sortedBands);
};
// Function to apply the name filter
const applyNameFilter = () => {
    const nameFilterInput = document.getElementById("name-filter");
    const nameFilter = nameFilterInput.value.trim().toLowerCase();
    let filteredBands = rockband;
    if (nameFilter !== "") {
        filteredBands = rockband.filter(band => band.name.toLowerCase().includes(nameFilter));
    }
    populateTable(filteredBands);
};
// Function to sort the bands by ID
const sortById = () => {
    const sortedBands = rockband.slice().sort(idSorter);
    populateTable(sortedBands);
};
function populateTable(bands) {
    const bandContainer = document.getElementById("band-container");
    bandContainer.innerHTML = "";
    if (bandContainer) {
        bands.forEach((band) => {
            const bandTable = document.createElement("div");
            bandTable.classList.add("band-table");
            const bandData = document.createElement("div");
            bandData.classList.add("band-data", "band-id");
            bandData.textContent = band.id.toString();
            bandTable.appendChild(bandData);
            const bandName = document.createElement("div");
            bandName.classList.add("band-data", "band-name");
            bandName.textContent = band.name;
            bandTable.appendChild(bandName);
            const bandAlbums = document.createElement("div");
            bandAlbums.classList.add("band-data", "band-albums");
            const albumsList = document.createElement("ul");
            const bandFormed = document.createElement("div");
            bandFormed.classList.add("band-data", "band-formed");
            bandFormed.textContent = band.formed.toString();
            bandTable.appendChild(bandFormed);
            const bandLocation = document.createElement("div");
            bandLocation.classList.add("band-data", "band-location");
            bandLocation.textContent = band.location;
            bandTable.appendChild(bandLocation);
            const locationParts = band.location.split(', ');
            if (locationParts.length > 1) {
                const bandCountry = document.createElement("div");
                bandCountry.classList.add("band-data", "band-country");
                bandCountry.textContent = CountryFind(band);
                bandTable.appendChild(bandCountry);
            }
            const bandGenre = document.createElement("div");
            bandGenre.classList.add("band-data", "band-members");
            bandGenre.textContent = band.genre;
            bandTable.appendChild(bandGenre);
            const bandMembers = document.createElement("div");
            bandMembers.classList.add("band-data", "band-members");
            bandMembers.textContent = band.members;
            bandTable.appendChild(bandMembers);
            // Iterate through the albums array and create list items
            band.albums.forEach((album) => {
                const albumItem = document.createElement("li");
                albumItem.textContent = `${album.name} (${album.year})`;
                albumsList.appendChild(albumItem);
            });
            bandAlbums.appendChild(albumsList);
            bandTable.appendChild(bandAlbums);
            bandContainer.appendChild(bandTable);
        });
    }
}
//# sourceMappingURL=script.js.map