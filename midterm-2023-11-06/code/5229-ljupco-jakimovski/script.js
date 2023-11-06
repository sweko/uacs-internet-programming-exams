"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
let bands = [];
async function siteCode() {
    const data = await loadData();
    bands = data.metalBands;
    console.log(bands);
    // fillNationalities(authors);
    displayBands(bands);
    const idSort = document.getElementById("sort-id");
    idSort.addEventListener("click", sortById);
    const nameSort = document.getElementById("sort-name");
    nameSort.addEventListener("click", sortByName);
}
const nameSorter = (first, second) => first.name.localeCompare(second.name);
const idSorter = (first, second) => first.id - second.id;
const sortByName = () => {
    const sortedBands = bands.toSorted(nameSorter);
    displayBands(sortedBands);
};
const sortById = () => {
    const sortedBands = bands.toSorted(idSorter);
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
    const idCell = document.createElement("div");
    idCell.classList.add("band-data", "band-id");
    idCell.innerHTML = band.id.toString();
    row.appendChild(idCell);
    const nameCell = document.createElement("div");
    nameCell.classList.add("band-data", "band-name");
    nameCell.innerHTML = band.name;
    row.appendChild(nameCell);
    return row;
};
//# sourceMappingURL=script.js.map