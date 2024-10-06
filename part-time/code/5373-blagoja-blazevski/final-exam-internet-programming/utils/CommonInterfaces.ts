export interface IIngredient {
  name: string;
  unit: string;
  quantity: number;
}

export interface IRecipe {
  id: number;
  title: string;
  cuisine: string;
  description: string;
  ingredients: IIngredient[];
  instructions: string;
  time: number;
  servings: number;
}

export interface ICardButtonsModel {
  view?: boolean;
  edit?: boolean;
  delete?: boolean;
  viewText?: string;
}

export interface IData {
  [key: string]: any;
}

export interface IFetchOptions {
  objectName: string;
  method: "GET" | "POST" | "DELETE" | "PATCH";
  body?: IData;
}

export interface IDataDefinition {
  title?: string;
  titleOver?: string;
  description?: string;
}
