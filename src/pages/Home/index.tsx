import TagSelect from '../../components/TagSelect';
import SearchInput from '../../components/SearchInput';
import styles from './home.module.css';
import { recipes as recipesData } from '../../datas/recipes';
import { useEffect, useState } from 'react';
import Gallery from '../../components/Gallery';
import IRecipe from '../../Interface/IRecipe';
import ITags from '../../Interface/ITags';
import {
    filterRecipesByNameDescriptionAndIngredients,
    filterByTags,
} from '../../helper/filter';
import { extractTagsFromResults, getCachedTags } from '../../helper/tags';
import { toggleValueInArray } from '../../helper/array';
import TagList from '../../components/TagList';

function Home() {
    const [defaultTags] = useState<ITags>(() => getCachedTags(recipesData));
    const [filterRecipes, setFilterRecipes] = useState<IRecipe[]>(recipesData);
    const [filterTagRecipes, setFilterTagRecipes] = useState<IRecipe[]>([]);
    const [search, setSearch] = useState<string>('');
    const [tags, setTags] = useState<ITags>(defaultTags);
    const [IngredientTag, setIngredientTag] = useState<string[]>([]);
    const [ApplianceTag, setApplianceTag] = useState<string[]>([]);
    const [UstensilTag, setUstensilTag] = useState<string[]>([]);

    useEffect(() => {
        const result =
            search.length > 2
                ? filterRecipesByNameDescriptionAndIngredients(
                      recipesData,
                      search
                  )
                : recipesData;

        const tags =
            search.length > 2 ? extractTagsFromResults(result) : defaultTags;

        setFilterRecipes(result);
        setFilterTagRecipes(result);
        setTags(tags);
    }, [search, defaultTags]);

    useEffect(() => {
        const filteredRecipes =
            !IngredientTag.length && !ApplianceTag.length && !UstensilTag.length
                ? filterRecipes
                : filterByTags(
                      filterRecipes,
                      IngredientTag,
                      ApplianceTag,
                      UstensilTag
                  );

        const tags = extractTagsFromResults(filteredRecipes);
        setFilterTagRecipes(filteredRecipes);
        setTags(tags);
    }, [search, IngredientTag, ApplianceTag, UstensilTag, filterRecipes]);

    const handleClickOnIngredientTag = (value: string) => {
        setIngredientTag(toggleValueInArray(IngredientTag, value));
    };

    const handleClickOnApplianceTag = (value: string) => {
        setApplianceTag(toggleValueInArray(ApplianceTag, value));
    };

    const handleClickOnUstensilTag = (value: string) => {
        setUstensilTag(toggleValueInArray(UstensilTag, value));
    };

    return (
        <>
            <div className={styles.home}>
                <SearchInput setSearch={setSearch} />
                <TagList
                    list={IngredientTag}
                    color="blue"
                    handleClickOnTag={handleClickOnIngredientTag}
                />

                <TagList
                    list={ApplianceTag}
                    color="green"
                    handleClickOnTag={handleClickOnApplianceTag}
                />

                <TagList
                    list={UstensilTag}
                    color="red"
                    handleClickOnTag={handleClickOnUstensilTag}
                />

                <div className={styles.tagSelectWrapper}>
                    <TagSelect
                        placeholder="Ingrédients"
                        color="blue"
                        tags={tags.ingredients}
                        selected={IngredientTag}
                        handleClickOnTag={handleClickOnIngredientTag}
                    />

                    <TagSelect
                        placeholder="Appareils"
                        color="green"
                        tags={tags.appliance}
                        selected={ApplianceTag}
                        handleClickOnTag={handleClickOnApplianceTag}
                    />

                    <TagSelect
                        placeholder="Ustensiles"
                        color="red"
                        tags={tags.ustensils}
                        selected={UstensilTag}
                        handleClickOnTag={handleClickOnUstensilTag}
                    />
                </div>
                <Gallery recipes={filterTagRecipes} />
            </div>
        </>
    );
}

export default Home;
