import IRecipe from "../Interface/IRecipe";

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

const filterRecipesByIngredient = (filterRecipes: IRecipe[], ingredientList: Array<string>) => {
    console.log(filterRecipes);

    return filterRecipes
}


const filterRecipesByAppliance = (filterRecipes: IRecipe[], applianceList: Array<string>) => {
    return filterRecipes.filter(recipe => {
        return applianceList.includes(recipe.appliance.toLowerCase())
    })
}

const filterRecipesByUstensil = (filterRecipes: IRecipe[], ustensilList: Array<string>) => {

    return filterRecipes.filter(recipe => {
        return ustensilList.every(ustensil => recipe.ustensils.includes(ustensil))
    })
}

const filterByTags = (filterRecipes: IRecipe[], ingredientList: Array<string>, applianceList: Array<string>, ustensilList: Array<string>) => {
    const resultIngredient: IRecipe[] = filterRecipesByIngredient(filterRecipes, ingredientList)
    const resultAppliance: IRecipe[] = filterRecipesByAppliance(resultIngredient, applianceList)

    console.log('resultAppliance', resultAppliance);

    //TODOOOOOOOOOOOOOOOOOOOOOOOOOOO
    const resultUstensil: IRecipe[] = filterRecipesByUstensil(resultAppliance, ustensilList)

    const t = new Set();

    resultUstensil.map(recipe => {
        t.add(recipe)
    })

    // console.log(Array.from(t));


    return Array.from(t) as IRecipe[];
}



export { filterRecipesByNameDescriptionAndIngredients, filterByTags };