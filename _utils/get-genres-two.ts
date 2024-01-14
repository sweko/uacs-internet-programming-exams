import {exists, readTextFile, copyDirectory} from './fs-promisify'


export async function getBands() {
    const bandData: any = await readTextFile('./midterm-2023-11-06/data/bands.json');
    return JSON.parse(bandData).metalBands;
}

export async function main() {
    const bandData: any[] = await getBands();
    const genreSet = new Set<string>();
    for (const band of bandData) {
        genreSet.add(band.genre);
    }
    const genres = Array.from(genreSet);
    console.log(JSON.stringify(genres));
    console.log("--------------------");

    const locationMap = new Map<string, Set<string>>();

    for (const band of bandData) {
        const location:string = band.location;
        location.lastIndexOf(', ');
        const city = location.substring(0, location.lastIndexOf(', '));
        const country = location.substring(location.lastIndexOf(', ') + 2);
        if (!locationMap.has(country)) {
            locationMap.set(country, new Set<string>());
        }
        locationMap.get(country)!.add(city);
    }

    const data = Array.from(locationMap.entries()).map(([country, cities], index) => ({
        id: index + 1,
        country,
        cities: Array.from(cities).sort()
    }));

    console.log(JSON.stringify(data, null, 2));
}

main();