import { Album, Band } from "./add-data"
import { AlbumData, BandData } from "./server-data"

export const toBand = (response: BandData): Band =>{
    return{
        id: response.id,
        name: response.name,
        genre: response.genre,
        formed: response.formed,
        location: response.location,
        members: response.members,
        albums: response.albums.map(toAlbum)
    }
}



export const toAlbum = (response: AlbumData): Album =>{
    return{
        name: response.name,
        year: response.year
    }
}

export const toBandData = (band: Band): BandData =>{
    return{
        id: band.id,
        name: band.name,
        genre: band.genre,
        formed: band.formed,
        location: band.location,
        members: band.members,
        albums: band.albums.map(toAlbumData)
    }
}



export const toAlbumData = (album: Album): AlbumData =>{
    return{
        name: album.name,
        year: album.year
    }
}