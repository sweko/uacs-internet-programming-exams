interface Book {
    name: string;
    year: number;
    type: string;
}

interface Author {
    id: number;
    name: string;
    birth_date: string;
    death_date?: string;
    nationality: string;
    bibliography: Book[];
}

type AuthorSorter = (first: Author, second: Author) => number;

document.addEventListener("DOMContentLoaded", siteCode)

let authors: Author[] = [];

async function siteCode() {
    const data = await loadData();
    authors = data;

    fillNationalities(authors);

    displayAuthors(authors);

    const nameSort = document.getElementById("sort-name")!;
    nameSort.addEventListener("click", sortByName);

    const idSort = document.getElementById("sort-id")!;
    idSort.addEventListener("click", sortById);

    const applyFilterButton = document.getElementById("apply-filter")!;
    applyFilterButton.addEventListener("click", applyFilter)

    const modal = document.getElementById("biblio-details")!;
    modal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
}

const nameSorter: AuthorSorter = (first, second) => first.name.localeCompare(second.name);
const idSorter: AuthorSorter = (first, second) => first.id - second.id;

const sortByName = () => {
    const sortedAuthors = authors.toSorted(nameSorter);
    displayAuthors(sortedAuthors);
}

const sortById = () => {
    const sortedAuthors = authors.toSorted(idSorter);
    displayAuthors(sortedAuthors);
}

const fillNationalities = (authors: Author[]) => {
    const filter = document.getElementById("nationality-filter")!;

    const nationalities = new Set<string>();
    for (const author of authors) {
        nationalities.add(author.nationality);
    }

    for (const nationality of nationalities) {
        const option = document.createElement("option");
        option.value = nationality;
        option.innerHTML = nationality;
        filter.appendChild(option);
    }
}


const applyFilter = () => {
    const nationalityElement = document.getElementById("nationality-filter") as HTMLSelectElement;
    const nationality = nationalityElement.value;

    const aliveElement = document.getElementById("alive-filter") as HTMLSelectElement;
    const alive = aliveElement.value;

    let filteredAuthors = authors;
    if (nationality !== "all") {
        filteredAuthors = filteredAuthors.filter(author => author.nationality === nationality);
    }
    if (alive !== "all") {
        filteredAuthors = filteredAuthors.filter(author => {
            if (alive === "yes") {
                return author.death_date === undefined;
            }
            return !!author.death_date;
        })
    }

    displayAuthors(filteredAuthors);



    // if (nationality === "all") {
    //     displayAuthors(authors);
    //     return;
    // }

    // const filteredAuthors = authors.filter(author => author.nationality === nationality);
    // displayAuthors(filteredAuthors);
}



const loadData = async () => {
    const dataUri = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/dry-run-mid-term/data/authors.json";
    const response = await fetch(dataUri);

    if (!response.ok) {
        throw new Error("The data is not there");
    }

    const data = await response.json();
    return data;
}

const displayAuthors = (authors: Author[]) => {
    const container = document.getElementById("author-container")!;
    container.innerHTML = "";
    for (const author of authors) {
        const authorRow = generateAuthorRow(author);
        container.appendChild(authorRow);
    }
}

const generateAuthorRow = (author: Author) => {
    const row = document.createElement("div");
    row.classList.add("author-row");

    // id cell
    const idCell = document.createElement("div");
    idCell.classList.add("author-data", "author-id");
    idCell.innerHTML = author.id.toString();
    row.appendChild(idCell);

    const nameCell = document.createElement("div");
    nameCell.classList.add("author-data", "author-name");
    nameCell.innerHTML = author.name;
    row.appendChild(nameCell);

    const bdateCell = document.createElement("div");
    bdateCell.classList.add("author-data", "author-bdate");
    bdateCell.innerHTML = author.birth_date;
    row.appendChild(bdateCell);

    const aliveCell = document.createElement("div");
    aliveCell.classList.add("author-data", "author-alive");
    aliveCell.innerHTML = author.death_date ? "No" : "Yes";
    row.appendChild(aliveCell);

    const ageCell = document.createElement("div");
    ageCell.classList.add("author-data", "author-age");
    ageCell.innerHTML = getAuthorAge(author).toString();
    row.appendChild(ageCell);

    const nationalityCell = document.createElement("div");
    nationalityCell.classList.add("author-data", "author-nationality");
    nationalityCell.innerHTML = author.nationality;
    row.appendChild(nationalityCell);

    const biblioCell = document.createElement("div");
    biblioCell.classList.add("author-data", "author-biblio");
    biblioCell.innerHTML = `The author has ${author.bibliography.length} books`;
    biblioCell.addEventListener("click", () => {
        const modal = document.getElementById("biblio-details")!;
        modal.classList.remove("hidden");

        const modalHeader = document.querySelector("#biblio-details-content h2")! as HTMLHeadingElement;
        modalHeader.innerText = `Selected bibliography for ${author.name}`;

        const bookList = document.getElementById("biblio-details-book-list")! as HTMLUListElement;
        bookList.innerHTML = "";
        for (const book of author.bibliography.toSorted((first, second) => first.year - second.year)) {
            const bookItem = document.createElement("li");
            bookItem.innerText = `${book.name} (${book.year})`;
            bookList.appendChild(bookItem);
        }
    })
    row.appendChild(biblioCell);

    const yearsActiveCell = document.createElement("div");
    yearsActiveCell.classList.add("author-data", "author-years");
    yearsActiveCell.innerHTML = "----";
    row.appendChild(yearsActiveCell);

    return row;
}

const getAuthorAge = (author: Author) => {
    // this implementation is a bit wrong, it will show wrong results sometimes
    const birthYear = new Date(author.birth_date).getFullYear();
    if (author.death_date) {
        const deathYear = new Date(author.death_date).getFullYear();
        return deathYear - birthYear;
    } else {
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear;
    }
}