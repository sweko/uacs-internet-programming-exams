"use strict";
let bands = [];
// Function to fetch band data from the local JSON file (bands.json)
async function fetchBandData() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json");
        if (!response.ok) {
            throw new Error("Failed to fetch data from the JSON file");
        }
        const data = await response.json();
        bands = data.metalBands;
        populateFilterOptions(data);
        displayBands(bands);
    }
    catch (error) {
        console.error("Error:", error);
    }
}
// Function to display bands on the webpage
function displayBands(bands) {
    const bandContainer = document.getElementById("band-container");
    if (!bandContainer) {
        console.error("Band container not found.");
        return;
    }
    bandContainer.innerHTML = ''; // Clear the container
    bands.forEach((band) => {
        const bandElement = document.createElement("div");
        bandElement.classList.add("band-table");
        const location = band.location.split(", ");
        const country = location[location.length - 1];
        const albums = band.albums.map(album => album.name).join(", ");
        const firstAlbumYear = Math.min(...band.albums.map(album => album.year));
        const lastAlbumYear = Math.max(...band.albums.map(album => album.year));
        bandElement.innerHTML = `
            <div class="band-data">${band.id}</div>
            <div class "band-data">${band.name}</div>
            <div class="band-data">${band.formed}</div>
            <div class="band-data">${location[0]}</div>
            <div class="band-data">${country}</div>
            <div class="band-data">${band.members.join(", ")}</div>
            <div class="band-data">${albums}</div>
            <div class="band-data">${firstAlbumYear}</div>
            <div class="band-data">${lastAlbumYear}</div>
            <div class="band-data">${firstAlbumYear} - ${lastAlbumYear}</div>
        `;
        bandContainer.appendChild(bandElement);
    });
    const headers = document.querySelectorAll(".band-header");
    headers.forEach((header) => {
        header.addEventListener("click", () => {
            const sortBy = header.getAttribute("data-sort-by");
            if (sortBy) {
                sortTable(bands, sortBy);
                displayBands(bands);
            }
        });
    });
}
// Function to sort the table data
function sortTable(bands, sortBy) {
    bands.sort((a, b) => {
        let aValue, bValue;
        switch (sortBy) {
            case "id":
                aValue = a.id;
                bValue = b.id;
                break;
            case "name":
            case "location":
            case "country":
                aValue = a[sortBy];
                bValue = b[sortBy];
                break;
            case "formed":
            case "firstAlbumYear":
            case "lastAlbumYear":
                aValue = a[sortBy];
                bValue = b[sortBy];
                break;
            case "yearsActive":
                const aStartYear = a.albums[0].year;
                const aEndYear = a.albums[a.albums.length - 1].year;
                const bStartYear = b.albums[0].year;
                const bEndYear = b.albums[b.albums.length - 1].year;
                return aStartYear - bStartYear || aEndYear - bEndYear;
            default:
                aValue = 0;
                bValue = 0;
        }
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.localeCompare(bValue);
        }
        else if (typeof aValue === 'number' && typeof bValue === 'number') {
            return aValue - bValue;
        }
        else {
            return 0;
        }
    });
}
// Function to populate filter options
function populateFilterOptions(data) {
    const countryFilter = document.getElementById("country-filter");
    const genreFilter = document.getElementById("genre-filter");
    const countries = new Set();
    const genres = new Set();
    data.metalBands.forEach((band) => {
        countries.add(band.country);
        genres.add(band.genre);
    });
    countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countryFilter?.appendChild(option);
    });
    genres.forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreFilter?.appendChild(option);
    });
}
// Function to apply filters
function applyFilters() {
    const nameFilter = document.getElementById("name-filter").value.toLowerCase();
    const countryFilter = document.getElementById("country-filter").value;
    const genreFilter = document.getElementById("genre-filter").value;
    const yearActiveFilter = parseInt(document.getElementById("year-active-filter").value, 10);
    const filteredBands = bands.filter((band) => {
        const nameMatches = !nameFilter || band.name.toLowerCase().includes(nameFilter);
        const countryMatches = !countryFilter || countryFilter === band.country;
        const genreMatches = !genreFilter || genreFilter === band.genre;
        const yearActiveMatches = !yearActiveFilter ||
            (yearActiveFilter >= band.firstAlbumYear && yearActiveFilter <= band.lastAlbumYear);
        return nameMatches && countryMatches && genreMatches && yearActiveMatches;
    });
    displayBands(filteredBands);
}
// Call the fetchBandData function to retrieve and display the data
fetchBandData();
//# sourceMappingURL=script.js.map