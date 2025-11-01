const data = [];
let currentSort = "id";
const displayAuthors = (authors) => {
    const container = document.getElementById("author-container");
    container.innerHTML = "";
    for (const author of authors) {
        displayAuthor(author);
    }
};
const displayAuthor = (author) => {
    const container = document.getElementById("author-container");
    const row = document.createElement("div");
    row.classList.add("author-row");
    row.appendChild(makeAuthorDataDiv(author.id.toString()));
    row.appendChild(makeAuthorDataDiv(author.name));
    const bdate = getBirthDate(author.birth_date);
    row.appendChild(makeAuthorDataDiv(bdate));
    const isAlive = getIsAlive(author);
    const isAliveDiv = document.createElement("div");
    isAliveDiv.classList.add("author-data");
    const chkIsAlive = document.createElement("input");
    chkIsAlive.type = "checkbox";
    chkIsAlive.disabled = true;
    chkIsAlive.checked = isAlive;
    isAliveDiv.appendChild(chkIsAlive);
    row.appendChild(isAliveDiv);
    row.appendChild(makeAuthorDataDiv("--"));
    row.appendChild(makeAuthorDataDiv(author.nationality));
    row.appendChild(makeAuthorDataDiv(author.bibliography.length.toString()));
    row.appendChild(makeAuthorDataDiv("--"));
    container?.appendChild(row);
};
const getBirthDate = (birthDateString) => {
    const birthDate = new Date(birthDateString);
    console.log(birthDate);
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    const result = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    console.log(result);
    return result;
};
const getIsAlive = (author) => {
    return author.death_date === undefined;
};
const makeAuthorDataDiv = (data) => {
    const div = document.createElement("div");
    div.classList.add("author-data");
    div.textContent = data;
    return div;
};
document.addEventListener("DOMContentLoaded", async () => {
    const localData = await loadData();
    data.push(...localData);
    displayAuthors(data);
    const nationalities = extractNationalities(data);
    displayNationalities(nationalities);
    const idSort = document.getElementById("sort-id");
    idSort.style.cursor = "pointer";
    idSort?.addEventListener("click", sortById);
    const nameSort = document.getElementById("sort-name");
    nameSort.style.cursor = "pointer";
    nameSort?.addEventListener("click", sortByName);
    const searchButton = document.getElementById("search-authors");
    searchButton?.addEventListener("click", searchAuthors);
});
const extractNationalities = (authors) => {
    const allNationalities = authors.map(author => author.nationality);
    const unique = [...new Set(allNationalities)];
    unique.sort((f, s) => f.localeCompare(s));
    return unique;
};
const displayNationalities = (nationalities) => {
    const select = document.getElementById("nationality-search");
    select.innerHTML = "";
    const none = document.createElement("option");
    none.text = "--- Select ---";
    none.value = "";
    select.appendChild(none);
    for (const nationality of nationalities) {
        const option = document.createElement("option");
        option.text = nationality;
        option.value = nationality;
        select.appendChild(option);
    }
};
const sortById = () => {
    const idSort = document.getElementById("sort-id");
    currentSort = "id";
    const allSorters = document.getElementsByClassName("sorter");
    for (let index = 0; index < allSorters.length; index++) {
        const sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    idSort.classList.toggle("sorted");
    idSort.classList.toggle("unsorted");
    data.sort((first, second) => {
        return first.id - second.id;
    });
    displayAuthors(data);
};
const sortByName = () => {
    const nameSort = document.getElementById("sort-name");
    currentSort = "name";
    const allSorters = document.getElementsByClassName("sorter");
    for (let index = 0; index < allSorters.length; index++) {
        const sorter = allSorters[index];
        sorter.classList.remove("sorted");
        sorter.classList.add("unsorted");
    }
    nameSort.classList.toggle("sorted");
    nameSort.classList.toggle("unsorted");
    data.sort((first, second) => {
        return first.name.localeCompare(second.name);
    });
    displayAuthors(data);
};
const searchAuthors = () => {
    const nameSearch = document.getElementById("name-search");
    const nameValue = nameSearch.value.toLowerCase();
    const natSearch = document.getElementById("nationality-search");
    const natValue = natSearch.value;
    const filteredAuthors = data
        .filter(author => author.name.toLowerCase().includes(nameValue))
        .filter(author => {
        if (natValue === "") {
            return true; // we don't filter by nationality
        }
        return (natValue === author.nationality);
    });
    displayAuthors(filteredAuthors);
};
const loadData = async () => {
    const response = await fetch("https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/dry-run-mid-term-2024/data/authors.json");
    const data = await response.json();
    return data;
};
