var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
document.addEventListener("DOMContentLoaded", backsitcode);
var bands = []; // all authors == bands
function backsitcode() {
    return __awaiter(this, void 0, void 0, function () {
        var data, nameSort, idSort, applyFilterButton, modal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, waitData()];
                case 1:
                    data = _a.sent();
                    bands = data;
                    fillter(bands); // fillNationalities == fillter
                    displayBands(bands); // displayAuthors == displayBands
                    nameSort = document.getElementById("sort-name");
                    nameSort.addEventListener("click", sortByName); // sortByName == sortByName
                    idSort = document.getElementById("sort-id");
                    idSort.addEventListener("click", sortById); // sortById == sortById
                    applyFilterButton = document.getElementById("apply-filter");
                    applyFilterButton.addEventListener("click", applyFilter); // applyFilter == applyFilter
                    modal = document.getElementById("biblio-details");
                    modal.addEventListener("click", function () {
                        modal.classList.add("hidden");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
var nameSorter = function (first, second) { return first.name.localeCompare(second.name); };
var idSorter = function (first, second) { return first.id - second.id; };
var sortByName = function () {
    var sortedBands = bands.toSorted(nameSorter);
    displayBands(sortedBands);
};
var sortById = function () {
    var sortedBands = bands.toSorted(idSorter);
    displayBands(sortedBands);
};
var fillter = function (bands) {
    var filter = document.getElementById("country-filter");
    var countrys = new Set();
    for (var _i = 0, bands_1 = bands; _i < bands_1.length; _i++) {
        var band = bands_1[_i];
        countrys.add(band.location);
    }
    for (var _a = 0, countrys_1 = countrys; _a < countrys_1.length; _a++) {
        var country = countrys_1[_a];
        var option = document.createElement("option");
        option.value = country;
        option.innerHTML = country;
        filter.appendChild(option);
    }
};
var applyFilter = function () {
    var countryElement = document.getElementById("country-filter");
    var country = countryElement.value;
    var aliveElement = document.getElementById("alive-filter");
    var alive = aliveElement.value;
    var filteredBands = bands;
    if (country !== "all") {
        filteredBands = filteredBands.filter(function (band) { return band.location === country; });
    }
    if (alive !== "all") {
        filteredBands = filteredBands.filter(function (bands) {
            if (alive === "yes") {
                return bands.formed === undefined;
            }
            return !!bands.formed;
        });
    }
    displayBands(filteredBands);
    // if (nationality === "all") {
    //     displayAuthors(authors);
    //     return;
    // }
    // const filteredAuthors = authors.filter(author => author.nationality === nationality);
    // displayAuthors(filteredAuthors);
};
var waitData = function () { return __awaiter(_this, void 0, void 0, function () {
    var datajson, response, cdata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                datajson = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json";
                return [4 /*yield*/, fetch(datajson)];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("The data is not there");
                }
                return [4 /*yield*/, response.json()];
            case 2:
                cdata = _a.sent();
                return [2 /*return*/, cdata];
        }
    });
}); };
var displayBands = function (metalBands) {
    var container = document.getElementById("band-container");
    container.innerHTML = "";
    for (var _i = 0, bands_2 = bands; _i < bands_2.length; _i++) {
        var band = bands_2[_i];
        var BandRow = generateBandRow(band);
        container.appendChild(BandRow);
    }
};
var generateBandRow = function (band) {
    var row = document.createElement("div");
    row.classList.add("band-row");
    // id cell
    var idCell = document.createElement("div");
    idCell.classList.add("band-table", "band-id");
    idCell.innerHTML = band.id.toString();
    row.appendChild(idCell);
    var nameCell = document.createElement("div");
    nameCell.classList.add("band-table", "band-name");
    nameCell.innerHTML = band.name;
    row.appendChild(nameCell);
    var formedCell = document.createElement("div");
    formedCell.classList.add("band-table", "band-formed");
    formedCell.innerHTML = band.formed.toString();
    row.appendChild(formedCell);
    var locationCell = document.createElement("div");
    locationCell.classList.add("band-table", "band-location");
    locationCell.innerHTML = band.formed ? "No" : "Yes";
    row.appendChild(locationCell);
    var contryCell = document.createElement("div");
    contryCell.classList.add("band-table", "band-contry");
    contryCell.innerHTML = getBandAge(band).toString();
    row.appendChild(contryCell);
    var membersCell = document.createElement("div");
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
};
var getBandAge = function (bands) {
    // this implementation is a bit wrong, it will show wrong results sometimes
    var birthYear = new Date(bands.formed).getFullYear();
    if (bands.formed) {
        var deathYear = new Date(bands.formed).getFullYear();
        return deathYear - birthYear;
    }
    else {
        var currentYear = new Date().getFullYear();
        return currentYear - birthYear;
    }
};
