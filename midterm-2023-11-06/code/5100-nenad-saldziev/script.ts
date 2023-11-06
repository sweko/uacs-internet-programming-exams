interface albums{ 
        name: string; // the name of the album
        year: number; // the year the album was released
} // an array of album objects

interface metalBand{  // Author == metalBand
    id: number;
    name: string;
    genre: string;
    formed: number; // the year the band was formed
    location : string; // the city and country where the band was formed
    members: [ string ]; // an array of strings, each string is the name of a band member
    album: albums[];
}
// Array of band[objects]

type BandSorter = (first: metalBand, second: metalBand) => number;

document.addEventListener("DOMContentLoaded", backsitcode)

let bands: metalBand[] = []; // all authors == bands

async function backsitcode() {
    const data = await waitData();
    bands = data;

    fillter(bands); // fillNationalities == fillter

    displayBands(bands); // displayAuthors == displayBands

    const nameSort = document.getElementById("sort-name")!;
    nameSort.addEventListener("click", sortByName); // sortByName == sortByName

    const idSort = document.getElementById("sort-id")!;
    idSort.addEventListener("click", sortById); // sortById == sortById

    const applyFilterButton = document.getElementById("apply-filter")!;
    applyFilterButton.addEventListener("click", applyFilter); // applyFilter == applyFilter

    const modal = document.getElementById("biblio-details")!;
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

const fillter = (bands: metalBand[]) => {
    const filter = document.getElementById("country-filter")!;

    const countrys = new Set<string>();
    for (const band of bands) {
        countrys.add(band.location);
    }

    for (const country of countrys) {
        const option = document.createElement("option");
        option.value = country;
        option.innerHTML = country;
        filter.appendChild(option);
    }
}

const applyFilter = () => {
    const countryElement = document.getElementById("country-filter") as HTMLSelectElement;
    const country = countryElement.value;

    const aliveElement = document.getElementById("alive-filter") as HTMLSelectElement;
    const alive = aliveElement.value;

    let filteredBands = bands;
    if (country !== "all") {
        filteredBands = filteredBands.filter(band => band.location === country);
    }
    if (alive !== "all") {
        filteredBands = filteredBands.filter(bands => {
            if (alive === "yes") {
                return bands.formed === undefined;
            }
            return !!bands.formed;
        })
    }

    displayBands(filteredBands);



    // if (nationality === "all") {
    //     displayAuthors(authors);
    //     return;
    // }

    // const filteredAuthors = authors.filter(author => author.nationality === nationality);
    // displayAuthors(filteredAuthors);
}

const waitData = async () => {
    const datajson = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json"; // dataUri == datajson
    const response = await fetch(datajson);

    if (!response.ok) {
        throw new Error("The data is not there");
    }

    const cdata = await response.json();
    return cdata;
}

const displayBands = (metalBands: metalBand[]) => { //
    const container = document.getElementById("band-container")!;
    container.innerHTML = "";
    for (const band of bands) {
        const BandRow = generateBandRow(band);
        container.appendChild(BandRow);
    }
}

const generateBandRow = (band: metalBand) => {
    const row = document.createElement("div");
    row.classList.add("band-row");

    // id cell
    const idCell = document.createElement("div");
    idCell.classList.add("band-table", "band-id");
    idCell.innerHTML = band.id.toString();
    row.appendChild(idCell);

    const nameCell = document.createElement("div");
    nameCell.classList.add("band-table", "band-name");
    nameCell.innerHTML = band.name;
    row.appendChild(nameCell);

    const formedCell = document.createElement("div");
    formedCell.classList.add("band-table", "band-formed");
    formedCell.innerHTML = band.formed.toString();
    row.appendChild(formedCell);

    const locationCell = document.createElement("div");
    locationCell.classList.add("band-table", "band-location");
    locationCell.innerHTML = band.formed ? "No" : "Yes";
    row.appendChild(locationCell);

    const contryCell = document.createElement("div");
    contryCell.classList.add("band-table", "band-contry");
    contryCell.innerHTML = getBandAge(band).toString();
    row.appendChild(contryCell);

    const membersCell = document.createElement("div");
    membersCell.classList.add("band-table", "band-member");
    membersCell.innerHTML = band.members.toString();
    row.appendChild(membersCell);

    // const biblioCell = document.createElement("div");
    // biblioCell.classList.add("band-table", "band-biblio");
    // biblioCell.innerHTML = `The band has ${band.formed} books`;

    // row.appendChild(biblioCell);

    // const yearsActiveCell = document.createElement("div");
    // yearsActiveCell.classList.add("band-table", "band-years");
    // yearsActiveCell.innerHTML = "----";
    // row.appendChild(yearsActiveCell);

    return row;
}

const getBandAge = (bands: metalBand) => {
    // this implementation is a bit wrong, it will show wrong results sometimes
    const birthYear = new Date(bands.formed).getFullYear();
    if (bands.formed) {
        const deathYear = new Date(bands.formed).getFullYear();
        return deathYear - birthYear;
    } else {
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear;
    }
}