import { Album, Band, PlaceData } from './client';
import { response } from "express"
import { AlbumResponse, BandResponse, PlaceDataResponse } from "./server"

export const toBand = (response: BandResponse): Band => {
    return {
        id: response.id,
        name: response.name,
        genre: response.genre,
        formed: response.formed,
        location: response.location,
        members: response.members,
        albums: response.albums.map(toAlbum)
    }
}

export const toAlbum = (response: AlbumResponse): Album => {
    return {
        name: response.name,
        year: response.year,
    };
}

export const toPlaceData = (response: PlaceDataResponse): PlaceData => {
    return {
        id: response.id,
        country: response.country,
        cities: response.cities
    };
};

export const toBandResponse = (band: Band): BandResponse => {
    return {
        id: band.id,
        name: band.name,
        genre: band.genre,
        formed: band.formed,
        location: band.location,
        members: band.members,
        albums: band.albums.map(toAlbumResponse)
    };
}

export const toAlbumResponse = (album: Album): AlbumResponse => {
    return {
        name: album.name,
        year: album.year,
    };
}