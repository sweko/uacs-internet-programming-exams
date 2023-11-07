interface Album {
    name: string;
    year: number;
}

interface Band {
    id: number;
    name: string;
    genre: string;
    formed: number;
    location: string;
    members: string[];
    albums: Album[];
}

type BandSorter = (first: Band, second: Band) => number;

document.addEventListener("DOMContentLoaded", siteCode)

let bands: Band[] = [];

async function siteCode() {
    const data = await loadData();
    bands = data;

    fillGenres(bands);

    displayBands(bands);

    const nameSort = document.getElementById("sort-name")!;
    nameSort.addEventListener("click", sortByName);

    const idSort = document.getElementById("sort-id")!;
    idSort.addEventListener("click", sortById);

    const applyFilterButton = document.getElementById("apply-filter")!;
    applyFilterButton.addEventListener("click", applyFilter)

    const modal = document.getElementById("album-details")!;
    modal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
}

const nameSorter: BandSorter = (first, second) => first.name.localeCompare(second.name);
const idSorter: BandSorter = (first, second) => first.id - second.id;

const sortByName = () => {
    const sortedBands = bands.toSorted(nameSorter);
    displayBands(sortedBands);
}

const sortById = () => {
    const sortedBands = bands.toSorted(idSorter);
    displayBands(sortedBands);
}

const fillGenres = (bands: Band[]) => {
    const filter = document.getElementById("genre-filter")!;

    const genres = new Set<string>();
    for (const band of bands) {
        genres.add(band.genre);
    }

    for (const genre of genres) {
        const option = document.createElement("option");
        option.value = genre;
        option.innerHTML = genre;
        filter.appendChild(option);
    }
}


const applyFilter = () => {
    const genreElement = document.getElementById("genre-filter") as HTMLSelectElement;
    const genre = genreElement.value;

    const activeElement = document.getElementById("active-filter") as HTMLSelectElement;
    const active = activeElement.value;

    let filteredBands = bands;
    if (genre !== "all") {
        filteredBands = filteredBands.filter(band => band.genre === genre);
    }
    if (active !== "all") {
        filteredBands = filteredBands.filter(band => {
            if (active === "yes") {
                return band.formed === undefined;
            }
            return !!band.formed;
        })
    }

    displayBands(filteredBands);

    const loadData = async () => {
        const dataUri = "https://raw.githubusercontent.com/1ynxxny1/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json";
        const response = await fetch(dataUri);

        if (!response.ok) {
            throw new Error("The data is not there");
        }
    
        const data = await response.json();
        return data;
    }

}
