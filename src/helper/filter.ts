import IRecipe from "../Interface/IRecipe";
import IRecipeIngredient from "../Interface/IRecipeIngredient";

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

const extractIngredientFromRecipe = (ingredientList: IRecipeIngredient[]) => {
    const ingredients: string[] = []
    ingredientList.map(item => {
        ingredients.push(item.ingredient.toLowerCase())
    })

    return ingredients
}

const filterRecipesByIngredient = (filterRecipes: IRecipe[], ingredientList: Array<string>) => {
    return filterRecipes.filter(recipe => {
        const recipeIngredients = extractIngredientFromRecipe(recipe.ingredients)

        return ingredientList.every(ingredient => recipeIngredients.includes(ingredient))
    })
}


const filterRecipesByAppliance = (filterRecipes: IRecipe[], applianceList: Array<string>) => {

    if (!applianceList.length) {
        return filterRecipes
    }

    return filterRecipes.filter(recipe => {
        return applianceList.every(appliance => appliance === recipe.appliance.toLowerCase())
    })
}

const filterRecipesByUstensil = (filterRecipes: IRecipe[], ustensilList: Array<string>) => {

    if (!ustensilList.length) {
        return filterRecipes
    }

    return filterRecipes.filter(recipe => {
        return ustensilList.every(ustensil => recipe.ustensils.includes(ustensil))
    })
}

const filterByTags = (filterRecipes: IRecipe[], ingredientList: Array<string>, applianceList: Array<string>, ustensilList: Array<string>) => {
    const resultIngredient: IRecipe[] = filterRecipesByIngredient(filterRecipes, ingredientList)
    const resultAppliance: IRecipe[] = filterRecipesByAppliance(resultIngredient, applianceList)
    const resultUstensil: IRecipe[] = filterRecipesByUstensil(resultAppliance, ustensilList)

    return Array.from(new Set(resultUstensil)) as IRecipe[];
}



export { filterRecipesByNameDescriptionAndIngredients, filterByTags };