import { Band } from "./band";
import { BandResponse } from "./server";

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

const toAlbum = (albumResponse: any): any => {
    return {
        name: albumResponse.name,
        year: albumResponse.year,
    };
};

export const toBandResponse = (band: Band): any => {
    return {
        id: band.id,
        name: band.name,
        genre: band.genre,
        formed: band.formed,
        location: band.location,
        members: band.members,
        albums: band.albums.map((a: any) => toAlbumResponse(a)),
    };
};

const toAlbumResponse = (album: any): any => {
    return {
        name: album.name,
        year: album.year,
    };
};
