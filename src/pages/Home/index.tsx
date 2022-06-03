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
    const [selectedTags, setSelectedTags] = useState([]);

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

    const handleClickOnTag = (value: string, tagList: Array<string>) => {
        if (selectedTags)
            //TODO
            // setSelectedTags();
            //Add to selectedTag
            console.log(value, tagList);
    };

    return (
        <>
            <div className={styles.home}>
                <SearchInput setSearch={setSearch} />
                <div className={styles.tagSelectWrapper}>
                    <TagSelect
                        placeholder="Ingrédients"
                        color="blue"
                        tags={tags.ingredients}
                        handleClickOnTag={(value) =>
                            handleClickOnTag(value, tags.ingredients)
                        }
                    />

                    <TagSelect
                        placeholder="Appareils"
                        color="green"
                        tags={tags.appliance}
                        handleClickOnTag={(value) =>
                            handleClickOnTag(value, tags.appliance)
                        }
                    />

                    <TagSelect
                        placeholder="Ustensiles"
                        color="red"
                        tags={tags.ustensils}
                        handleClickOnTag={(value) =>
                            handleClickOnTag(value, tags.ustensils)
                        }
                    />
                </div>
                <Gallery recipes={filterRecipes} />
            </div>
        </>
    );
}

export default Home;
