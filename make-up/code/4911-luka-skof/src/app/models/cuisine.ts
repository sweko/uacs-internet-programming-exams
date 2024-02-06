export interface Cuisine {
    id: number;
    name: string;
    ingrediants: [{
        name: string;
        quantity: number;
        unit: string;
    }]
}