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

export { filterRecipesByNameDescriptionAndIngredients };