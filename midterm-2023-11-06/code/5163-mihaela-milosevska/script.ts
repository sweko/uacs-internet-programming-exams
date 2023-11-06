interface album{
    name: string;
    year; number;
}

interface band {
    id: number;
    name: string;
    formed: number;
    location: string;
    genre: string;
    members: string;
    albums: number;
}
type BandSorter = (first: Band, second: Band) => number;

async function getBands(): Promise<Band[]> {
    const url = "https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/midterm-2023-11-06/data/bands.json";
    const response = await axios.get(url);
    return response.data.metalBands;
}

function formatBand(band: Band): Record<string, unknown> {
    const members = band.members.sort().slice(0, 5).join(', ');
    const lastMember = band.members.length > 5 ? '...' : '';
    const membersString = band.members.length < 3 ? members : `${members}, ${lastMember}`;
    const [city, country] = band.location.split(', ');
    return {
        id: band.id,
        name: band.name,
        formed: band.formed,
        location: city,
        genre: band.genre,
        members: membersString,
        albums: band.albums.length,
    };
}

async function main() {
    const bands = await getBands();
    const bandInfos = bands.map(formatBand);
    let sortedBy = '';
    let ascending = true;
    const table = document.createElement('table');
    table.setAttribute('id', 'band-table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const headers = ['ID', 'Name', 'Formed', 'Location', 'Bonus Country', 'Genre', 'Members', 'Albums'];
    const headerCells = headers.map(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.addEventListener('click', () => {
            if (sortedBy === header) {
                ascending = !ascending;
            } else {
                sortedBy = header;
                ascending = true;
            }
            sortTable(header, ascending);
        });
        return th;
    });

    thead.appendChild(document.createElement('tr'));
    headerCells.forEach(header => thead.firstElementChild.appendChild(header));
    table.appendChild(thead);
    bandInfos.forEach(band => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${band.id}</td>
            <td>${band.name}</td>
            <td>${band.formed}</td>
            <td>${band.location}</td>
            <td>${band.genre}</td>
            <td>${band.members}</td>
            <td>${band.albums}</td>
        `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    document.body.appendChild(table);
}
