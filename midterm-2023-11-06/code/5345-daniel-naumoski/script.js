"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
let bands = [];
//let albums: Album[];
async function siteCode() {
    const data = await loadData();
    bands = data.metalBands;
    displayBands(bands);
    const nameSort = document.getElementById("sort-name");
    nameSort.addEventListener("click", sortByName);
    const applyFilterButton = document.getElementById("apply-filter");
    applyFilterButton.addEventListener("click", applyFilter);
}
const applyFilter = () => {
};
const idSorter = (first, second) => first.id - second.id;
const sortById = () => {
    const sortedBands = bands.toSorted(idSorter);
    displayBands(sortedBands);
};
const nameSorter = (first, second) => first.name.localeCompare(second.name);
const sortByName = () => {
    const sortedBands = bands.toSorted(nameSorter);
    displayBands(sortedBands);
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
    console.log("DEBUG TEST");
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
    nameCell.innerHTML = band.name;
    row.appendChild(nameCell);
    const formedCell = document.createElement("div");
    formedCell.classList.add("band-data", "band-formed");
    formedCell.innerHTML = band.formed.toString();
    row.appendChild(formedCell);
    const locationCell = document.createElement("div");
    locationCell.classList.add("band-data", "band-location");
    locationCell.innerHTML = band.formed.toString();
    row.appendChild(locationCell);
    const genreCell = document.createElement("div");
    genreCell.classList.add("band-data", "band-genre");
    genreCell.innerHTML = band.genre;
    row.appendChild(genreCell);
    return row;
    //const membersCell = document.createElement("div");
    //membersCell.classList.add("band-data", "band-members");
    //membersCell.innerHTML = band.members;
    //row.appendChild(genreCell);
    const applyFilter = () => {
        const idElement = document.getElementById("id-filter");
        const id = idElement.value;
        const nameElement = document.getElementById("name-filter");
        const name = nameElement.value;
        let filteredBands = bands;
        if (name !== "all") {
            filteredBands = filteredBands.filter(band => band.name === name);
        }
        //if (id !== "0") {
        //    filteredBands = filteredBands.filter(band => band.id === id);
        //}
        displayBands(filteredBands);
        const albumsCell = document.createElement("div");
        albumsCell.classList.add("band-data", "band-albums");
        albumsCell.innerHTML = `The band has ${band.albums.length} albums`;
        albumsCell.addEventListener("click", () => {
            const modal = document.getElementById("albums-details");
            modal.classList.remove("hidden");
            const modalHeader = document.querySelector("#album-details-content h2");
            modalHeader.innerText = `Selected albums for ${band.name}`;
            const albumList = document.getElementById("album-details-book-list");
            albumList.innerHTML = "";
            for (const album of band.albums.toSorted((first, second) => first.year - second.year)) {
                const albumItem = document.createElement("li");
                albumItem.innerText = `${album.name} (${album.year})`;
                albumList.appendChild(albumItem);
            }
        });
        row.appendChild(albumsCell);
        return row;
    };
};
//# sourceMappingURL=script.js.map