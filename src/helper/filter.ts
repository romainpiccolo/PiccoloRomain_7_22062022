import IRecipe from "../Interface/IRecipe";
import IRecipeIngredient from "../Interface/IRecipeIngredient";
import ITags from "../Interface/ITags";

const checkInIngredient = (recipe: IRecipe, lowerSearch: string) => {
    return recipe.ingredients.filter(item => {
        return item.ingredient.toLowerCase().includes(lowerSearch)
    }).length > 0
}

const filterRecipesByNameDescriptionAndIngredients = (filterRecipes: IRecipe[], search: string) => {
    const lowerSearch = search.toLowerCase();

    return filterRecipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(lowerSearch) ||
            recipe.description.toLowerCase().includes(lowerSearch) ||
            checkInIngredient(recipe, lowerSearch)
        )
    })
}

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

export { filterRecipesByNameDescriptionAndIngredients, extractTagsFromResults };