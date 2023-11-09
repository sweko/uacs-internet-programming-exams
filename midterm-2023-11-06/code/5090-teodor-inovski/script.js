"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
let bands = [];
async function siteCode() {
    const data = await loadData();
    bands = data.metalBands;
    fillGenres(bands);
    displayBands(bands);
    const nameSort = document.getElementById("sort-name");
    nameSort?.addEventListener("click", sortByName);
    const idSort = document.getElementById("sort-id");
    idSort?.addEventListener("click", sortById);
    const formedSort = document.getElementById("sort-formed");
    formedSort?.addEventListener("click", sortByFormed);
    const locationSort = document.getElementById("sort-location");
    locationSort?.addEventListener("click", sortByLocation);
    const albumSort = document.getElementById("sort-albums");
    albumSort?.addEventListener("click", sortByAlbums);
    const memberSort = document.getElementById("sort-member");
    memberSort?.addEventListener("click", sortByMembers);
    const applyFilterButton = document.getElementById("apply-filter");
    applyFilterButton.addEventListener("click", applyFilter);
}
const nameSorter = (first, second) => first.name.localeCompare(second.name);
const idSorter = (first, second) => first.id - second.id;
const formedSorter = (first, second) => first.formed - second.formed;
const locationSorter = (first, second) => first.location.localeCompare(second.location);
const albumSorter = (first, second) => first.albums.length - second.albums.length;
const memberSorter = (first, second) => first.members.length - second.members.length;
const sortByName = () => {
    const sortedBands = bands.toSorted(nameSorter);
    displayBands(sortedBands);
};
const sortById = () => {
    const sortedBands = bands.toSorted(idSorter);
    displayBands(sortedBands);
};
const sortByFormed = () => {
    const sortedBands = bands.toSorted(formedSorter);
    displayBands(sortedBands);
};
const sortByLocation = () => {
    const sortedBands = bands.toSorted(locationSorter);
    displayBands(sortedBands);
};
const sortByAlbums = () => {
    const sortedBands = bands.toSorted(albumSorter);
    displayBands(sortedBands);
};
const sortByMembers = () => {
    const sortedBands = bands.toSorted(memberSorter);
    displayBands(sortedBands);
};
const fillGenres = (bands) => {
    const filter = document.getElementById("genre-filter");
    const genres = new Set();
    for (const band of bands) {
        genres.add(band.genre);
    }
    console.log(genres);
    for (const genre of genres) {
        const option = document.createElement("option");
        option.value = genre;
        option.innerHTML = genre;
        filter?.appendChild(option);
    }
};
const applyFilter = () => {
    const genreElement = document.getElementById("genre-filter");
    const genre = genreElement.value;
    const nameElement = document.getElementById("name-filter");
    const name = nameElement.value;
    let filteredBands = bands;
    if (genre !== "all") {
        filteredBands = filteredBands.filter(band => band.genre === genre);
    }
    if (name !== "") {
        filteredBands = filteredBands.filter(band => band.name === name);
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
        let bandRow = generateBandRow(band);
        container.appendChild(bandRow);
    }
};
const generateBandRow = (band) => {
    const row = document.createElement("div");
    row.classList.add("band-row");
    const idData = document.createElement("div");
    idData.classList.add("band-data", "band-id");
    idData.innerHTML = band.id.toString();
    row.appendChild(idData);
    const nameData = document.createElement("div");
    nameData.classList.add("band-data", "band-name");
    nameData.innerHTML = `${band.name} - ${band.genre}`;
    row.appendChild(nameData);
    const formedData = document.createElement("div");
    formedData.classList.add("band-data", "band-formed");
    formedData.innerHTML = band.formed.toString();
    row.appendChild(formedData);
    const locationData = document.createElement("div");
    locationData.classList.add("band-data", "band-location");
    locationData.innerHTML = band.location;
    row.appendChild(locationData);
    const countryData = document.createElement("div");
    countryData.classList.add("band-data", "band-location");
    countryData.innerHTML = band.location;
    row.appendChild(countryData);
    const membersData = document.createElement("div");
    membersData.classList.add("band-data", "band-members");
    membersData.innerHTML = band.members.join(", ");
    row.appendChild(membersData);
    const albumsData = document.createElement("div");
    albumsData.classList.add("band-data", "band-albums");
    albumsData.innerHTML = band.albums.length.toString();
    row.appendChild(albumsData);
    return row;
};
//# sourceMappingURL=script.js.map