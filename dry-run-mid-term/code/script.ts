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

document.addEventListener("DOMContentLoaded", siteCode)

async function siteCode() {
    const data = await loadData();
    displayAuthors(data as any);
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
    for (const author of authors) {
        const authorRow = generateAuthorRow(author);
        container.appendChild(authorRow);
    }
}

const generateAuthorRow = (author: Author) => {
    /**
     *       <div class="author-row">
        <div class="author-data">27</div>
        <div class="author-data">Adrian Tchaikovsky</div>
        <div class="author-data">1972-08-14</div>
        <div class="author-data">Yes</div>
        <div class="author-data">51</div>
        <div class="author-data">British</div>
        <div class="author-data">14 works total</div>
        <div class="author-data">2008 - Present</div>
      </div>
     */
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
    ageCell.innerHTML = "---";
    row.appendChild(ageCell);

    const nationalityCell = document.createElement("div");
    nationalityCell.classList.add("author-data", "author-nationality");
    nationalityCell.innerHTML = author.nationality;
    row.appendChild(nationalityCell);

    const biblioCell = document.createElement("div");
    biblioCell.classList.add("author-data", "author-biblio");
    biblioCell.innerHTML = `The author has ${author.bibliography.length} books`;
    row.appendChild(biblioCell);

    const yearsActiveCell = document.createElement("div");
    yearsActiveCell.classList.add("author-data", "author-years");
    yearsActiveCell.innerHTML = "----";
    row.appendChild(yearsActiveCell);

    return row;


}