"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
let bands = [];
async function siteCode() {
    const data = await loadData();
    bands = data.metalBands;
    fillCountries(bands);
    displayBands(bands);
    const nameSort = document.getElementById("sort-name");
    nameSort.addEventListener("click", sortByName);
    const idSort = document.getElementById("sort-id");
    idSort.addEventListener("click", sortById);
    const yearSort = document.getElementById("sort-formed");
    yearSort.addEventListener("click", sortByYear);
    const locationSort = document.getElementById("sort-Location");
    locationSort.addEventListener("click", sortByLocation);
    const applyFilterButton = document.getElementById("apply-filter");
    applyFilterButton.addEventListener("click", applyFilter);
}
const nameSorter = (first, second) => first.name.localeCompare(second.name);
const idSorter = (first, second) => first.id - second.id;
const yearSorter = (first, second) => first.formed - second.formed;
const locationSorter = (first, second) => first.name.localeCompare(second.name);
const sortByName = () => {
    const sortedBands = bands.toSorted(nameSorter);
    displayBands(sortedBands);
};
const sortById = () => {
    const sortedBands = bands.toSorted(idSorter);
    displayBands(sortedBands);
};
const sortByYear = () => {
    const sortedBands = bands.toSorted(yearSorter);
    displayBands(sortedBands);
};
const sortByLocation = () => {
    const sortedBands = bands.toSorted(locationSorter);
    displayBands(sortedBands);
};
const fillCountries = (bands) => {
    const filter = document.getElementById("country-filter");
    const countries = new Set();
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
    const bandNameElement = document.getElementById("name-filter");
    const bandName = bandNameElement.value.toLowerCase();
    const countryElement = document.getElementById("country-filter");
    const country = countryElement.value;
    const genreElement = document.getElementById("genre-filter");
    const genre = bandNameElement.value.toLowerCase();
    let filteredBands = bands;
    if (bandName) {
        filteredBands = filteredBands.filter(band => band.name.toLowerCase().includes(bandName));
    }
    if (country !== "all") {
        filteredBands = filteredBands.filter(band => band.country === country);
    }
    displayBands(filteredBands);
};
const loadData = async () => {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json";
    const response = await fetch(dataUri);
    if (!response.ok) {
        throw new Error("The data is not there");
    }
    const data = await response.json();
    return data;
};
const displayBands = (bands) => {
    const container = document.getElementById("band-container");
    container.innerHTML = "";
    for (const band of bands) {
        const bandRow = generateBandRow(band);
        container.appendChild(bandRow);
    }
};
const generateBandRow = (band) => {
    const row = document.createElement("div");
    row.classList.add("band-row");
    // id cell
    const idCell = document.createElement("div");
    idCell.classList.add("band-data", "band-id");
    idCell.innerHTML = band.id.toString();
    row.appendChild(idCell);
    const nameCell = document.createElement("div");
    nameCell.classList.add("band-data", "band-name");
    nameCell.innerHTML = `${band.name} / ${band.genre}`;
    row.appendChild(nameCell);
    const formedCell = document.createElement("div");
    formedCell.classList.add("band-data", "band-formed");
    formedCell.innerHTML = band.formed.toString();
    row.appendChild(formedCell);
    const locationCell = document.createElement("div");
    locationCell.classList.add("band-data", "band-location");
    locationCell.innerHTML = band.location;
    row.appendChild(locationCell);
    const locationCell1 = document.createElement("div");
    locationCell1.classList.add("band-data", "band-location");
    locationCell1.innerHTML = band.location;
    row.appendChild(locationCell1);
    const countryCell = document.createElement("div");
    countryCell.classList.add("band-data", "band-location");
    countryCell.innerHTML = band.country;
    row.appendChild(countryCell);
    // const genreCell = document.createElement("div");
    // genreCell.classList.add("band-data", "band-location");
    // genreCell.innerHTML = band.genre;
    // row.appendChild(countryCell);
    const membersCell = document.createElement("div");
    membersCell.classList.add("band-data", "band-members");
    membersCell.innerHTML = band.members.join(", ");
    row.appendChild(membersCell);
    const albumsCell = document.createElement("div");
    albumsCell.classList.add("band-data", "band-albums");
    albumsCell.innerHTML = band.albums.length.toString();
    row.appendChild(albumsCell);
    return row;
};
//# sourceMappingURL=script.js.map