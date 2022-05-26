import IRecipeIngredient from "./IRecipeIngredient";

export default interface IRecipe {
    id: number;
    name: string;
    servings: number;
    ingredients: Array<IRecipeIngredient>;
    time: number;
    description: string;
    appliance: string;
    ustensils: Array<string>;
}