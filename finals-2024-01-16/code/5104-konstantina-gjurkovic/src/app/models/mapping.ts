import { Band, Album } from "./client";
import { BandResponse, AlbumResponse, BandsResponse } from "./server";

export const toBand = (response: BandResponse): Band => {
    return {
        id: response.id,
        name: response.name,
        genre: response.genre,
        formed: response.formed,
        location: response.location,
        members: response.members,
        albums: response.albums.map(a => toAlbum(a))
    };
};

export const toAlbum = (response: AlbumResponse): Album => {
    return {
        id: 0, 
        name: response.name,
        year: response.year
    };
};

export const toBandsResponse = (bandsResponse: BandsResponse): { bands: Band[] } => {
    return {
        bands: bandsResponse.bands.map(b => toBand(b))
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
        albums: band.albums.map(a => toAlbumResponse(a))
    };
};

export const toAlbumResponse = (album: Album): AlbumResponse => {
    return {
        name: album.name,
        year: album.year
    };
};