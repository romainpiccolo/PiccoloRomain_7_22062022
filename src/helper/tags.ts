import IRecipe from "../Interface/IRecipe";
import IRecipeIngredient from "../Interface/IRecipeIngredient";
import ITags from "../Interface/ITags";

const sanitizeTags = (tags: ITags): ITags => {
    const sanitizeIngredients = tags.ingredients.map(ingredient => ingredient.toLowerCase());
    const sanitizeAppliance = tags.appliance.map(appliance => appliance.toLowerCase());
    const sanitizeUstensils = tags.ustensils.map(ustensil => ustensil.toLowerCase());


    return {
        ingredients: Array.from(new Set(sanitizeIngredients.sort())),
        appliance: Array.from(new Set(sanitizeAppliance.sort())),
        ustensils: Array.from(new Set(sanitizeUstensils.sort())),
    }
}

const extractIngredientTags = (ingredients: IRecipeIngredient[]) => {
    const ingredientList: Array<string> = []
    ingredients.forEach(item => {
        ingredientList.push(item.ingredient)
    })

    return ingredientList;
}

const extractTagsFromResults = (filterRecipes: IRecipe[]): ITags => {
    const tags: ITags = {
        ingredients: [],
        appliance: [],
        ustensils: [],
    }

    filterRecipes.forEach(recipe => {
        tags.ingredients.push(...extractIngredientTags(recipe.ingredients));
        tags.appliance.push(recipe.appliance);
        tags.ustensils.push(...recipe.ustensils);
    })

    return sanitizeTags(tags);
}

const getCachedTags = (recipes: IRecipe[]) => {
    const cachedTags = localStorage.getItem('tags');
    const defaultTags =
        cachedTags !== null
            ? JSON.parse(localStorage.getItem('tags') as string)
            : extractTagsFromResults(recipes);

    if (!cachedTags)
        localStorage.setItem('tags', JSON.stringify(defaultTags));

    return defaultTags;
};

export { extractTagsFromResults, getCachedTags };