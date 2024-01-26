import { Album, Band } from "./app-data";
import { AlbumData, BandData } from "./server-data";

export const toBand = (response: BandData): Band =>
{
    return{
        id:response.id,
        name: response.name,
        genre: response.genre,
        formed: response.formed,
        location: response.location,
        member: response.member,
        albums: response.albums
    }
}

export const toAlbum = (response: AlbumData): Album =>
{
    return{
        name: response.name,
        year: response.year,
    }
}

export const toBandData = (band: BandData): BandData =>
{
    return{
        id: band.id,
        name: band.name,
        genre: band.genre,
        formed: band.formed,
        location: band.location,
        member: band.member,
        albums: band.albums
    }
}

export const toAlbumData = (album: AlbumData): AlbumData =>
{
    return{
        name:album.name,
        year: album.year,
    }
}