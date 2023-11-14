var bandData = [];
function fetchData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            bandData = data.metalBands;
            callback();
        }
    };
    xhr.send();
}
function populateBandList() {
    var bandList = document.getElementById('bandList');
    bandData.forEach(function (band) {
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + band.id + '</td>' +
            '<td>' + band.name + '</td>' +
            '<td>' + band.formed + '</td>' +
            '<td>' + band.location + '</td>' +
            '<td>' + getCountry(band.location) + '</td>' +
            '<td>' + band.genre + '</td>' +
            '<td>' + formatMembers(band.members) + '</td>' +
            '<td>' + band.albums.length + '</td>' +
            '<td>' + band.albums[0].name + ' (' + band.albums[0].year + ')</td>' +
            '<td>' + band.albums[band.albums.length - 1].name + ' (' + band.albums[band.albums.length - 1].year + ')</td>' +
            '<td>' + calculateYearsActive(band) + '</td>';
        bandList.appendChild(row);
        row.addEventListener('click', function () {
            displayBandDetails(band);
        });
    });
}
function displayBandDetails(band) {
    var modal = document.getElementById('bandModal');
    var modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = "\n        <span class=\"close\" id=\"closeModal\" onclick=\"closeModal()\">&times;</span>\n        <h2>".concat(band.name, "</h2>\n        <p>ID: ").concat(band.id, "</p>\n        <p>Genre: ").concat(band.genre, "</p>\n        <p>Formed: ").concat(band.formed, "</p>\n        <p>Location: ").concat(band.location, "</p>\n        <p>Country: ").concat(getCountry(band.location), "</p>\n        <p>Members: ").concat(formatMembers(band.members), "</p>\n        <p>Albums: ").concat(band.albums.length, "</p>\n        <p>First Album: ").concat(band.albums[0].name, " (").concat(band.albums[0].year, ")</p>\n        <p>Last Album: ").concat(band.albums[band.albums.length - 1].name, " (").concat(band.albums[band.albums.length - 1].year, ")</p>\n        <p>Years Active: ").concat(calculateYearsActive(band), "</p>\n    ");
    modal.style.display = 'block';
}
function closeModal() {
    var modal = document.getElementById('bandModal');
    if (modal) {
        modal.style.display = 'none';
    }
}
function getCountry(location) {
    var parts = location.split(',');
    if (parts.length > 1) {
        return parts[parts.length - 1].trim();
    }
    else {
        return 'N/A';
    }
}
function formatMembers(members) {
    members.sort();
    if (members.length > 5) {
        return members.slice(0, 5).join(', ') + ' & more';
    }
    else if (members.length < 3) {
        return members.join(' & ');
    }
    else {
        return members.slice(0, members.length - 1).join(', ') + ' & ' + members[members.length - 1];
    }
}
function calculateYearsActive(band) {
    var currentYear = new Date().getFullYear();
    var startYear = band.formed;
    var lastAlbumYear = Math.max.apply(Math, band.albums.map(function (album) {
        return album.year;
    }));
    if (lastAlbumYear >= currentYear - 2) {
        return startYear + ' - present';
    }
    else {
        return startYear + ' - ' + lastAlbumYear;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    fetchData(function () {
        populateBandList();
    });
});
