import CustomSelect from '../../components/CustomSelect/customselect';
import SearchInput from '../../components/SearchInput';
import styles from './home.module.css';
import { recipes } from '../../datas/recipes';
import { useEffect, useState } from 'react';
import Gallery from '../../components/Gallery';
import IRecipe from '../../Interface/IRecipe';
import ITags from '../../Interface/ITags';

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
            functionalFilterResult();
            //TODO filter tag + change Tags
        } else {
            setFilterRecipes(recipes);
            // Reset tags
        }
    }, [search]);

    const functionalFilterResult = () => {
        let result = filterRecipes.filter((recipe) => {
            return recipe.name.includes(search);
        });

        setFilterRecipes(result);
    };

    const functionalFilterTags = () => {
        const tags: ITags = {
            ingredients: [],
            appliance: [],
            ustensils: [],
        };

        filterRecipes.map((recipe) => {
            recipe.ingredients.map((ingredient) => {});
        });
    };

    return (
        <>
            <div className={styles.home}>
                <SearchInput setSearch={setSearch} />
                <div>
                    <CustomSelect />
                </div>
                <Gallery recipes={filterRecipes} />
            </div>
        </>
    );
}

export default Home;
