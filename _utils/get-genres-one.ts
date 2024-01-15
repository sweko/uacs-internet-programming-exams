import {exists, readTextFile, copyDirectory} from './fs-promisify'


export async function getMovies() {
    const movieData = await readTextFile('../midterm-2023-11-07/data/movies.json');
    return JSON.parse(movieData);
}


export async function main() {
    const movieData: any[] = await getMovies();
    const genreSet = new Set<string>();
    for (const movie of movieData) {
        for (const genre of movie.genre) {
            genreSet.add(genre);
        }
    }
    const genres = Array.from(genreSet);
    console.log(genres);

    const actorMap = new Map<string, number>();
    for (const movie of movieData) {
        for (const {actor} of movie.cast) {
            if (actorMap.has(actor)) {
                actorMap.set(actor, actorMap.get(actor)! + 1);
            } else {
                actorMap.set(actor, 1);
            }
        }
    }

    const actorArray = Array.from(actorMap.entries()).filter(([_, count]) => count > 1);
    actorArray.sort((a, b) => {
        if (b[1] === a[1]) {
            return a[0].localeCompare(b[0]);
        }
        return b[1] - a[1];
    });

    console.log(actorArray.map(([actor, _]) => actor).join("\n"));

    // const actors = Array.from(actorSet).sort().slice(20, 30);
    // console.log(actors.join("\n"));
    // console.log("------");
    // const actors2 = Array.from(actorSet).sort().slice(30, 40);
    // console.log(actors2.join("\n"));
    // console.log("------");
    // const actors3 = Array.from(actorSet).sort().slice(40, 50);
    // console.log(actors3.join("\n"));
}

main();