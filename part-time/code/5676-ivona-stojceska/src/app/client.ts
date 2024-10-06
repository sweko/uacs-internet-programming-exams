import { Time } from "@angular/common";

export interface Recipe {
    id: number;
    title: string;
    cuisine: string;
    description?: string; 
    ingredient?: Ingredient[];
    instructions: string;
    time: Time;
    servings?: string;
    }


    export interface Ingredient {
        name: string;
        quantity: number;
        unit: string;
    }
    