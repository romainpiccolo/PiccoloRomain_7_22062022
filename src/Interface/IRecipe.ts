export default interface IRecipe {
    id: number;
    name: string
    servings: number;
    ingredients: Array<{
        ingredient: string;
        quantity?: number;
        unit?: string;
    }>;
    time: number;
    description: string;
    appliance: string;
    ustensils: Array<string>;
}