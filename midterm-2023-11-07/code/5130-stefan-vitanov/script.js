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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function getMovies() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-07/data/movies.json')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
function truncatePlot(plot, maxLength) {
    if (plot.length <= maxLength)
        return plot;
    var trimmedString = plot.substr(0, maxLength);
    if (trimmedString.lastIndexOf(' ') > 0) {
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
    }
    return "".concat(trimmedString, "...");
}
function formatGenres(genres) {
    return genres.join(' / ');
}
function formatCast(cast) {
    return cast.sort(function (a, b) { return a.actor.localeCompare(b.actor); })
        .slice(0, 5)
        .map(function (member, index, arr) {
        var actorName = "<strong>".concat(member.actor, "</strong>");
        var characterName = " as ".concat(member.character);
        return index === arr.length - 1 && arr.length < 6 ? actorName + characterName : actorName + characterName + (index === arr.length - 2 ? ' &' : ', ');
    })
        .join('') + (cast.length > 5 ? '...' : '');
}
function formatOscars(oscars) {
    var oscarEntries = Object.entries(oscars)
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key.replace(/([A-Z])/g, ' $1').trim(), " won by ").concat(value);
    });
    return oscarEntries.sort().join('<br>');
}
function createMovieHTML(movie) {
    var movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-table');
    var idDiv = document.createElement('div');
    idDiv.classList.add('movie-data');
    idDiv.textContent = movie.id.toString();
    var titleDiv = document.createElement('div');
    titleDiv.classList.add('movie-data');
    titleDiv.textContent = movie.title;
    var directorDiv = document.createElement('div');
    directorDiv.classList.add('movie-data');
    directorDiv.textContent = movie.director;
    var yearDiv = document.createElement('div');
    yearDiv.classList.add('movie-data');
    yearDiv.textContent = movie.year.toString();
    var genreDiv = document.createElement('div');
    genreDiv.classList.add('movie-data');
    genreDiv.textContent = formatGenres(movie.genre);
    var plotDiv = document.createElement('div');
    plotDiv.classList.add('movie-data');
    plotDiv.textContent = truncatePlot(movie.plot, 50);
    var castDiv = document.createElement('div');
    castDiv.classList.add('movie-data');
    castDiv.innerHTML = formatCast(movie.cast);
    var oscarsDiv = document.createElement('div');
    oscarsDiv.classList.add('movie-data');
    oscarsDiv.innerHTML = formatOscars(movie.oscars);
    movieContainer.appendChild(idDiv);
    movieContainer.appendChild(titleDiv);
    movieContainer.appendChild(directorDiv);
    movieContainer.appendChild(yearDiv);
    movieContainer.appendChild(genreDiv);
    movieContainer.appendChild(plotDiv);
    movieContainer.appendChild(castDiv);
    movieContainer.appendChild(oscarsDiv);
    return movieContainer;
}
var currentSort = {
    field: null,
    ascending: true
};
function sortMovies(movies, sortField, ascending) {
    return movies.sort(function (a, b) {
        var valA = a[sortField];
        var valB = b[sortField];
        if (sortField === 'genre') {
            var genreLengthComparison = a.genre.length - b.genre.length;
            if (genreLengthComparison !== 0)
                return ascending ? genreLengthComparison : -genreLengthComparison;
            var sortedGenresA = __spreadArray([], a.genre, true).sort();
            var sortedGenresB = __spreadArray([], b.genre, true).sort();
            for (var i = 0; i < sortedGenresA.length; i++) {
                var comparison = sortedGenresA[i].localeCompare(sortedGenresB[i]);
                if (comparison !== 0)
                    return ascending ? comparison : -comparison;
            }
            return 0;
        }
        else if (sortField === 'cast') {
            var castLengthComparison = a.cast.length - b.cast.length;
            if (castLengthComparison !== 0)
                return ascending ? castLengthComparison : -castLengthComparison;
            for (var i = 0; i < a.cast.length; i++) {
                var comparison = a.cast[i].actor.localeCompare(b.cast[i].actor);
                if (comparison !== 0)
                    return ascending ? comparison : -comparison;
            }
            return 0;
        }
        else if (typeof valA === 'string' && typeof valB === 'string') {
            return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        else if (typeof valA === 'number' && typeof valB === 'number') {
            return ascending ? valA - valB : valB - valA;
        }
        return 0;
    });
}
function populateGenreDropdown() {
    return __awaiter(this, void 0, void 0, function () {
        var movies, genres, genreSelect;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMovies()];
                case 1:
                    movies = _a.sent();
                    genres = new Set(movies.flatMap(function (movie) { return movie.genre; }));
                    genreSelect = document.getElementById('filter-genre');
                    genres.forEach(function (genre) {
                        var option = document.createElement('option');
                        option.value = genre;
                        option.textContent = genre;
                        if (genreSelect) {
                            genreSelect.appendChild(option);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function populateOscarsDropdown() {
    return __awaiter(this, void 0, void 0, function () {
        var movies, oscars, oscarSelect;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMovies()];
                case 1:
                    movies = _a.sent();
                    oscars = new Set(movies.flatMap(function (movie) { return Object.keys(movie.oscars); }));
                    oscarSelect = document.getElementById('filter-oscars');
                    oscars.forEach(function (oscar) {
                        var option = document.createElement('option');
                        option.value = oscar;
                        option.textContent = oscar.replace(/([A-Z])/g, ' $1').trim();
                        if (oscarSelect) {
                            oscarSelect.appendChild(option);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function applyFilters(movies) {
    var titleElement = document.getElementById('filter-title');
    var titleFilter = titleElement ? titleElement.value.toLowerCase() : '';
    var yearElement = document.getElementById('filter-year');
    var yearFilter = yearElement ? parseInt(yearElement.value, 10) : NaN;
    var genreElement = document.getElementById('filter-genre');
    var genreFilter = genreElement ? genreElement.value : '';
    var oscarElement = document.getElementById('filter-oscars');
    var oscarFilter = oscarElement ? oscarElement.value : '';
    return movies.filter(function (movie) {
        var titleMatch = movie.title.toLowerCase().includes(titleFilter);
        var yearMatch = isNaN(yearFilter) || movie.year === yearFilter;
        var genreMatch = !genreFilter || movie.genre.includes(genreFilter);
        var oscarMatch = !oscarFilter || movie.oscars.hasOwnProperty(oscarFilter);
        return titleMatch && yearMatch && genreMatch && oscarMatch;
    });
}
function handleSearchButtonClick() {
    displayMoviesWithFilters();
}
function setUpSearchButton() {
    var searchButton = document.getElementById('search-button');
    if (searchButton) {
        searchButton.addEventListener('click', handleSearchButtonClick);
    }
}
function displayMoviesWithFilters() {
    return __awaiter(this, void 0, void 0, function () {
        var movies, titleElement, yearElement, genreElement, oscarElement, titleFilter, yearFilter, genreFilter, oscarFilter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getMovies()];
                case 1:
                    movies = _a.sent();
                    titleElement = document.getElementById('filter-title');
                    yearElement = document.getElementById('filter-year');
                    genreElement = document.getElementById('filter-genre');
                    oscarElement = document.getElementById('filter-oscars');
                    titleFilter = titleElement.value.trim().toLowerCase();
                    yearFilter = parseInt(yearElement.value, 10);
                    genreFilter = genreElement.value;
                    oscarFilter = formatOscar(oscarElement.value);
                    movies = movies.filter(function (movie) {
                        var titleMatch = titleFilter ? movie.title.toLowerCase().includes(titleFilter) : true;
                        var yearMatch = !isNaN(yearFilter) ? movie.year === yearFilter : true;
                        var genreMatch = genreFilter ? movie.genre.includes(genreFilter) : true;
                        var oscarMatch = oscarFilter ? movie.oscars.hasOwnProperty(oscarFilter) : true;
                        return titleMatch && yearMatch && genreMatch && oscarMatch;
                    });
                    if (currentSort.field === null) {
                        currentSort.field = 'id';
                    }
                    displayMovies(currentSort.field, currentSort.ascending, movies);
                    return [2 /*return*/];
            }
        });
    });
}
function formatOscar(oscarValue) {
    if (!oscarValue)
        return '';
    return oscarValue.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}
function displayMovies(sortField, ascending, movies) {
    if (sortField === void 0) { sortField = 'id'; }
    if (ascending === void 0) { ascending = true; }
    return __awaiter(this, void 0, void 0, function () {
        var movieContainer_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!movies) return [3 /*break*/, 2];
                    return [4 /*yield*/, getMovies()];
                case 1:
                    movies = _a.sent();
                    _a.label = 2;
                case 2:
                    try {
                        if (sortField) {
                            movies = sortMovies(movies, sortField, ascending);
                        }
                        movieContainer_1 = document.getElementById('movie-container');
                        if (movieContainer_1) {
                            movieContainer_1.innerHTML = '';
                            movies.forEach(function (movie) {
                                var movieHTML = createMovieHTML(movie);
                                movieContainer_1.appendChild(movieHTML);
                            });
                        }
                    }
                    catch (error) {
                        console.error('There was an error fetching or displaying the movie data: ', error);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function handleHeaderClick(sortField) {
    currentSort.ascending = (sortField === currentSort.field) ? !currentSort.ascending : true;
    currentSort.field = sortField;
    displayMovies(sortField, currentSort.ascending);
    updateSortArrows();
}
function updateSortArrows() {
    var headers = document.querySelectorAll('.movie-header');
    headers.forEach(function (header) {
        header.innerHTML = header.innerHTML.replace(/ ?\u{2191}|\u{2193}/gu, '');
        if (header.dataset.field === currentSort.field) {
            var arrow = currentSort.ascending ? '\u2191' : '\u2193';
            header.innerHTML += " ".concat(arrow);
        }
    });
}
function setUpSortingHeaders() {
    var headers = document.querySelectorAll('.movie-header');
    headers.forEach(function (header) {
        if (header.dataset.field) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', function () { return handleHeaderClick(header.dataset.field); });
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d;
    setUpSortingHeaders();
    populateGenreDropdown();
    populateOscarsDropdown();
    setUpSearchButton();
    (_a = document.getElementById('filter-title')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', displayMoviesWithFilters);
    (_b = document.getElementById('filter-year')) === null || _b === void 0 ? void 0 : _b.addEventListener('input', displayMoviesWithFilters);
    (_c = document.getElementById('filter-genre')) === null || _c === void 0 ? void 0 : _c.addEventListener('change', displayMoviesWithFilters);
    (_d = document.getElementById('filter-oscars')) === null || _d === void 0 ? void 0 : _d.addEventListener('change', displayMoviesWithFilters);
    displayMovies("id", true);
});
