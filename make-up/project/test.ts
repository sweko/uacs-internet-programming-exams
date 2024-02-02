import * as fs from 'fs';

function test() {
    console.log('Hello, World!');
    const data = fs.readFileSync('project/cities.json', 'utf8');
    const cities: {name: string, country:string}[] = JSON.parse(data).cities;
    console.log(cities.length);
    //const names = cities.map(city => city.name);
    const distinct = new Map<string, number>();
    for (const city of cities) {
        distinct.set(city.country, (distinct.get(city.country) || 0) + 1);
    }
    for (const iterator of distinct.entries()) {
        console.log(`"${iterator[0]}",`);
    }
}

test();