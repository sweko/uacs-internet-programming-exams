import { Band, Album, Place } from "./band";
import { BandResponse, AlbumResponse, PlaceResponse } from "./server";

export const toBand = (response: BandResponse): Band => {
    return {
        id: response.id,
        name: response.name,
        genre: response.genre,
        formed: response.formed,
        location: response.location,
        members: response.members,
        albums: response.albums.map(a => toAlbum(a)),
    }
}

export const toAlbum = (response: AlbumResponse): Album => {
    return {
        name: response.name,
        year: response.year,
    }
}

export const toPlace = (response: PlaceResponse): Place => {
    return{
        id: response.id,
        country: response.country,
        city: response.city
    }
}

export const toBandResponse = (band: Band): BandResponse => {
    return {
        id: band.id,
        name: band.name,
        genre: band.genre,
        formed: band.formed,
        location: band.location,
        members: band.members,
        albums: band.albums.map(a => toAlbumResponse(a)),
    }

}

export const toAlbumResponse = (album: Album): AlbumResponse => {
    return {
        name: album.name,
        year: album.year,
    }
}

export const toPlaceResponse = (place: Place): PlaceResponse => {
    return{
        id: place.id,
        country: place.country,
        city: place.city
    }
}