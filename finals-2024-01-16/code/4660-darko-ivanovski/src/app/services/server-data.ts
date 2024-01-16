export interface BandData{
    id: number,
    name: string,
    genre: string,
    formed: number,
    location: string,
    members: string[],
    albums: AlbumData[]
}



export interface AlbumData{
    name: string,
    year: number
}