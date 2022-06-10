import TagSelect from '../../components/TagSelect';
import SearchInput from '../../components/SearchInput';
import styles from './home.module.css';
import { recipes } from '../../datas/recipes';
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
    const [defaultTags] = useState<ITags>(() => getCachedTags(recipes));
    const [filterRecipes, setFilterRecipes] = useState<IRecipe[]>(recipes);
    const [filterTagRecipes, setFilterTagRecipes] = useState<IRecipe[]>([]);
    const [search, setSearch] = useState<string>('');
    const [tags, setTags] = useState<ITags>(defaultTags);
    const [IngredientTag, setIngredientTag] = useState<string[]>([]);
    const [ApplianceTag, setApplianceTag] = useState<string[]>([]);
    const [UstensilTag, setUstensilTag] = useState<string[]>([]);

    useEffect(() => {
        if (search.length > 2) {
            const result = filterRecipesByNameDescriptionAndIngredients(
                recipes,
                search
            );

            setFilterRecipes(result);
            setFilterTagRecipes(result);
            setTags(extractTagsFromResults(result));
        } else {
            setFilterRecipes(recipes);
            setFilterTagRecipes(recipes);
            setTags(defaultTags);
        }
    }, [search, defaultTags]);

    useEffect(() => {
        if (
            !IngredientTag.length &&
            !ApplianceTag.length &&
            !UstensilTag.length
        ) {
            setFilterTagRecipes(filterRecipes);
        } else {
            setFilterTagRecipes(
                filterByTags(
                    filterRecipes,
                    IngredientTag,
                    ApplianceTag,
                    UstensilTag
                )
            );
        }
    }, [IngredientTag, ApplianceTag, UstensilTag, filterRecipes]);

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
