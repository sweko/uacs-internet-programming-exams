"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
let metalbands = [];
async function siteCode() {
    const data = await loadData();
    displayMetalbands(data);
}
const loadData = async () => {
    const dataUri = " https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json";
    const response = await fetch(dataUri);
    if (!response.ok) {
        throw new Error("The data is not there");
    }
    const data = await response.json();
    return data.metalBands;
};
const displayMetalbands = (metalbands) => {
    const container = document.getElementById("band-container");
    container.innerHTML = "";
    for (const metalband of metalbands) {
        const metalbandRow = generateMetalBandsRow(metalband);
        container.appendChild(metalbandRow);
    }
};
const generateMetalBandsRow = (metalbands) => {
    const row = document.createElement("div");
    row.classList.add("band-table");
    const idCell = document.createElement("div");
    idCell.classList.add("band-data", "band-id");
    idCell.innerHTML = metalbands.id.toString();
    row.appendChild(idCell);
    const nameCell = document.createElement("div");
    nameCell.classList.add("band-data", "band-name");
    nameCell.innerHTML = metalbands.name;
    row.appendChild(nameCell);
    const genreCell = document.createElement("div");
    genreCell.classList.add("band-data", "band-genre");
    genreCell.innerHTML = metalbands.genre;
    row.appendChild(genreCell);
    const formedCell = document.createElement("div");
    formedCell.classList.add("band-data", "band-formed");
    formedCell.innerHTML = metalbands.formed.toString();
    row.appendChild(formedCell);
    const locationCell = document.createElement("div");
    locationCell.classList.add("band-data", "band-location");
    locationCell.innerHTML = metalbands.location;
    row.appendChild(locationCell);
    const membersCell = document.createElement("div");
    membersCell.classList.add("band-data", "band-members");
    membersCell.innerHTML = metalbands.members.toString();
    row.appendChild(membersCell);
    // const albumsCell = document.createElement("div");
    // albumsCell.classList.add("band-data", "band-Album");
    // albumsCell.innerHTML = metalbands.albums.toString();
    // row.appendChild(albumsCell);
    return row;
};
//# sourceMappingURL=script.js.map