import IRecipe from "../Interface/IRecipe";
import IRecipeIngredient from "../Interface/IRecipeIngredient";

/**
 * A function to check if an ingredient is in a recipe
 * @param recipe A recipe
 * @param lowerSearch An ingredient you're looking for into the recipe (Lowercase)
 * @returns A boolean if the ingredient is in the recipe or not
 */
const checkInIngredient = (recipe: IRecipe, lowerSearch: string) => {
    return recipe.ingredients.filter(item => {
        return item.ingredient.toLowerCase().includes(lowerSearch)
    }).length > 0
}

/**
 * A function that found the recipe with the name or description or ingredient you're looking for.
 * @param filterRecipes An array of recipe
 * @param search The input you're looking for. Must be include into name, description or ingredients list
 * @returns A new array with the recipe that match the search input
 */
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

/**
 * A function that extract ingredients from a recipe
 * @param ingredientList An array of object with ingredient in each object
 * @returns An array of ingredient
 */
const extractIngredientFromRecipe = (ingredientList: IRecipeIngredient[]) => {
    return ingredientList.reduce<string[]>((accumulator, current) => {
        return [...accumulator, current.ingredient.toLowerCase()]
    }, [])
}

/**
 * A function that found the recipe with the ingredient you're looking for.
 * @param filterRecipes An array of recipe
 * @param ingredientList An array of ingredient you're looking for
 * @returns A new array of filter recipes
 */
const filterRecipesByIngredient = (filterRecipes: IRecipe[], ingredientList: Array<string>) => {
    return filterRecipes.filter(recipe => {
        const recipeIngredients = extractIngredientFromRecipe(recipe.ingredients)

        return ingredientList.every(ingredient => recipeIngredients.includes(ingredient))
    })
}

/**
 * A function that found the recipe with the appliance you're looking for.
 * @param filterRecipes An array of recipe
 * @param applianceList An array of appliance you're looking for
 * @returns A new array of filter recipes
 */
const filterRecipesByAppliance = (filterRecipes: IRecipe[], applianceList: Array<string>) => {

    if (!applianceList.length) {
        return filterRecipes
    }

    return filterRecipes.filter(recipe => {
        return applianceList.every(appliance => appliance === recipe.appliance.toLowerCase())
    })
}

/**
 * A function that found the recipe with the ustensil you're looking for.
 * @param filterRecipes An array of recipe
 * @param ustensilList An array of ustensil you're looking for
 * @returns A new array of filter recipes
 */
const filterRecipesByUstensil = (filterRecipes: IRecipe[], ustensilList: Array<string>) => {

    if (!ustensilList.length) {
        return filterRecipes
    }

    return filterRecipes.filter(recipe => {
        return ustensilList.every(ustensil => recipe.ustensils.includes(ustensil))
    })
}

/**
 * A function that found the recipe with the filter you're looking for.
 * @param filterRecipes An array of recipe
 * @param ingredientList An array of ingredient you're looking for
 * @param applianceList An array of appliance you're looking for
 * @param ustensilList An array of ustensil you're looking for
 * @returns A new array of filter recipes
 */
const filterByTags = (filterRecipes: IRecipe[], ingredientList: Array<string>, applianceList: Array<string>, ustensilList: Array<string>) => {
    const resultIngredient: IRecipe[] = filterRecipesByIngredient(filterRecipes, ingredientList)
    const resultAppliance: IRecipe[] = filterRecipesByAppliance(resultIngredient, applianceList)
    const resultUstensil: IRecipe[] = filterRecipesByUstensil(resultAppliance, ustensilList)

    return Array.from(new Set(resultUstensil)) as IRecipe[];
}



export { filterRecipesByNameDescriptionAndIngredients, filterByTags };