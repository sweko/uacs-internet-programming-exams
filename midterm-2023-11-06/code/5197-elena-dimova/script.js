"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
let bands = [];
async function siteCode() {
    const data = await loadData();
    displayBands(data);
}
const loadData = async () => {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json";
    const response = await fetch(dataUri);
    if (!response.ok) {
        throw new Error("The data is not there");
    }
    const data = await response.json();
    return data.metalBands;
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
    row.classList.add("band-table");
    const idCell = document.createElement("div");
    idCell.classList.add("band-data", "band-id");
    idCell.innerHTML = band.id.toString();
    row.appendChild(idCell);
    const nameCell = document.createElement("div");
    nameCell.classList.add("band-data", "band-name");
    nameCell.innerHTML = band.name;
    row.appendChild(nameCell);
    const genreCell = document.createElement("div");
    genreCell.classList.add("band-data", "band-genre");
    genreCell.innerHTML = band.genre;
    row.appendChild(genreCell);
    const formedCell = document.createElement("div");
    formedCell.classList.add("band-data", "band-formed");
    formedCell.innerHTML = band.formed.toString();
    row.appendChild(formedCell);
    const locationCell = document.createElement("div");
    locationCell.classList.add("band-data", "band-location");
    locationCell.innerHTML = band.location;
    row.appendChild(locationCell);
    const membersCell = document.createElement("div");
    membersCell.classList.add("band-data", "band-members");
    membersCell.innerHTML = band.members.join(", ");
    row.appendChild(membersCell);
    return row;
};
//# sourceMappingURL=script.js.map