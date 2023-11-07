script.js
"use strict";
document.addEventListener("DOMContentLoaded", siteCode);
let metalBands = [];
async function siteCode() {
    const data = await loadData();
    metalBands = data.metalBands;
    fillGenres(metalBands);
    displayBands(metalBands);
    const nameSort = document.getElementById("sort-name");
    nameSort.addEventListener("click", sortByName);
    const idSort = document.getElementById("sort-id");
    idSort.addEventListener("click", sortById);
    const applyFilterButton = document.getElementById("apply-filter");
    applyFilterButton.addEventListener("click", applyFilter);
    const modal = document.getElementById("band-details");
    modal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
}
const nameSorter = (first, second) => first.name.localeCompare(second.name);
const idSorter = (first, second) => first.id - second.id;
const sortByName = () => {
    const sortedBands = metalBands.toSorted(nameSorter);
    displayBands(sortedBands);
};
const sortById = () => {
    const sortedBands = metalBands.toSorted(idSorter);
    displayBands(sortedBands);
};
const fillGenres = (bands) => {
    const filter = document.getElementById("genre-filter");
    const genres = new Set();
    for (const band of bands) {
        genres.add(band.genre);
    }
    for (const genre of genres) {
        const option = document.createElement("option");
        option.value = genre;
        option.innerHTML = genre;
        filter.appendChild(option);
    }
};
const applyFilter = () => {
    const genreElement = document.getElementById("genre-filter");
    const genre = genreElement.value;
    const activeElement = document.getElementById("active-filter");
    const active = activeElement.value;
    let filteredBands = metalBands;
    if (genre !== "all") {
        filteredBands = filteredBands.filter(band => band.genre === genre);
    }
    if (active !== "all") {
        filteredBands = filteredBands.filter(band => {
            if (active === "yes") {
                return band.disband_date === undefined;
            }
            return !!band.disband_date;
        });
    }
    displayBands(filteredBands);
};
const loadData = async () => {
    const dataUri = "https://raw.githubusercontent.com/1ynxxny1/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json";
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
