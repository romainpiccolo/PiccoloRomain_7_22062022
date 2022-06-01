import TagSelect from '../../components/TagSelect';
import SearchInput from '../../components/SearchInput';
import styles from './home.module.css';
import { recipes } from '../../datas/recipes';
import { useEffect, useState } from 'react';
import Gallery from '../../components/Gallery';
import IRecipe from '../../Interface/IRecipe';
import ITags from '../../Interface/ITags';
import { filterRecipesByNameDescriptionAndIngredients } from '../../helper/filter';
import { extractTagsFromResults, getCachedTags } from '../../helper/tags';

function Home() {
    const [filterRecipes, setFilterRecipes] = useState<IRecipe[]>(recipes);
    const [search, setSearch] = useState<string>('');
    const [defaultTags] = useState<ITags>(() => getCachedTags(recipes));
    const [tags, setTags] = useState<ITags>(defaultTags);

    useEffect(() => {
        if (search.length > 2) {
            const result = filterRecipesByNameDescriptionAndIngredients(
                recipes,
                search
            );

            setFilterRecipes(result);
            setTags(extractTagsFromResults(result));
        } else {
            setFilterRecipes(recipes);
            setTags(defaultTags);
        }
    }, [search, defaultTags]);

    useEffect(() => {
        console.log(tags);
    }, [tags]);

    return (
        <>
            <div className={styles.home}>
                <SearchInput setSearch={setSearch} />
                <div className={styles.tagSelectWrapper}>
                    <TagSelect
                        placeholder="Ingrédients"
                        color="blue"
                        tags={tags.ingredients}
                    />

                    <TagSelect
                        placeholder="Appareils"
                        color="green"
                        tags={tags?.appliance}
                    />

                    <TagSelect
                        placeholder="Ustensiles"
                        color="red"
                        tags={tags?.ustensils}
                    />
                </div>
                <Gallery recipes={filterRecipes} />
            </div>
        </>
    );
}

export default Home;
