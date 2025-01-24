import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRecipe } from '../../models/Recipe';

@Component({
  selector: '[app-recipecard]',
  templateUrl: './recipecard.component.html',
  styleUrl: './recipecard.component.css',
})
export class RecipecardComponent {
  @Input() data: IRecipe = {
    // sample data for the component
    id: 1,
    title: 'Spaghetti Bolognese',
    cuisine: 'Italian',
    description: 'Classic Italian pasta dish with a rich meat sauce.',
    ingredients: [
      {
        name: 'spaghetti',
        quantity: 300,
        unit: 'grams',
      },
      {
        name: 'ground beef',
        quantity: 500,
        unit: 'grams',
      },
      {
        name: 'onion',
        quantity: 1,
        unit: 'medium',
      },
      {
        name: 'garlic',
        quantity: 2,
        unit: 'cloves',
      },
      {
        name: 'tomato sauce',
        quantity: 400,
        unit: 'milliliters',
      },
      {
        name: 'red wine',
        quantity: 100,
        unit: 'milliliters',
      },
      {
        name: 'olive oil',
        quantity: 2,
        unit: 'tablespoons',
      },
      {
        name: 'salt',
        quantity: 1,
        unit: 'teaspoon',
      },
      {
        name: 'black pepper',
        quantity: 0.5,
        unit: 'teaspoon',
      },
    ],
    instructions:
      '1. Cook spaghetti according to package instructions. 2. In a pan, sauté chopped onions and garlic in olive oil. 3. Add ground beef, cook until browned. \n4. Pour in red wine, let it simmer. \n5. Add tomato sauce, salt, and black pepper. Simmer for 20 minutes. \n6. Serve the Bolognese sauce over cooked spaghetti.',
    time: 45,
    servings: 4,
  } as IRecipe;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  onDeleteClick(): void {
    this.delete.emit(this.data.id);
  }

  displayTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      if (remainingMinutes > 0) {
        return `${hours} hour ${remainingMinutes} minutes`;
      } else {
        return `${hours} hour`;
      }
    } else {
      return `${minutes} minutes`;
    }
  }
}
