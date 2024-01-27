export interface Bands{
    id: number,
    name: string,
    genre: string,
    formed: number,
    location : string, 
    members: [ string ], 
    albums: [ 
        {
            name: string, 
            year: number, 
        }
    ] 
}