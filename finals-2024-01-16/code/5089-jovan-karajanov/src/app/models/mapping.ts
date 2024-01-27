import { Bands } from "./client";
import { BandServerModel, AlbumServerModel } from "./server";

export const toBand = (serverModel: BandServerModel): Bands => {
  const band: Bands = {
    id: serverModel.id,
    name: serverModel.name,
    genre: serverModel.genre,
    formed: serverModel.formed,
    location: serverModel.location,
    members: serverModel.members,
    albums: serverModel.albums.map(a => toAlbum(a)),
    bonusCountry: extractCountry(serverModel.location),
    bonusFirstAlbum: calculateBonusFirstAlbum(serverModel.albums),
    bonusLastAlbum: calculateBonusLastAlbum(serverModel.albums),
  };
  return band;
};

const toAlbum = (albumServerModel: AlbumServerModel): any => {
  return {
    name: albumServerModel.name,
    year: albumServerModel.year,
  };
};

const extractCountry = (location: string): string => {
  const parts = location.split(', ');
  return parts.length > 1 ? parts[parts.length - 1] : '';
};

const calculateBonusFirstAlbum = (albums: AlbumServerModel[]): any => {
  return albums.length > 0 ? toAlbum(albums[0]) : null;
};

const calculateBonusLastAlbum = (albums: AlbumServerModel[]): any => {
  return albums.length > 0 ? toAlbum(albums[albums.length - 1]) : null;
};
