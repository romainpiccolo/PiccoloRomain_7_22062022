import CustomSelect from '../../components/CustomSelect/customselect';
import SearchInput from '../../components/SearchInput';
import styles from './home.module.css';
import { recipes } from '../../datas/recipes';
import { useEffect, useState } from 'react';
import Gallery from '../../components/Gallery';
import IRecipe from '../../Interface/IRecipe';
import ITags from '../../Interface/ITags';
import {
    filterRecipesByNameDescriptionAndIngredients,
    extractTagsFromResults,
} from '../../helper/filter';

function Home() {
    const [filterRecipes, setFilterRecipes] = useState<IRecipe[]>(recipes);
    const [search, setSearch] = useState<string>('');
    const [tags, setTags] = useState<ITags>({
        ingredients: [],
        appliance: [],
        ustensils: [],
    });

    useEffect(() => {
        if (search.length > 2) {
            const result = filterRecipesByNameDescriptionAndIngredients(
                recipes,
                search
            );

            setFilterRecipes(result);
            console.log(extractTagsFromResults(result));

            //TODO filter tag + change Tags
        } else {
            setFilterRecipes(recipes);
            console.log(extractTagsFromResults(recipes));

            setTags(extractTagsFromResults(recipes));

            // Reset tags
        }
    }, [search]);

    return (
        <>
            <div className={styles.home}>
                <SearchInput setSearch={setSearch} />
                {/* <div>
                    <CustomSelect />
                </div> */}
                <Gallery recipes={filterRecipes} />
            </div>
        </>
    );
}

export default Home;
