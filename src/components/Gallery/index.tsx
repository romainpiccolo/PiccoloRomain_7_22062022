import IRecipe from '../../Interface/IRecipe';
import Card from '../Card';
import styles from './gallery.module.css';

type GalleryProps = {
    recipes: Array<IRecipe>;
};

function Gallery({ recipes }: GalleryProps) {
    return (
        <div className={styles.gallery}>
            {!recipes.length ? (
                <div>
                    « Aucune recette ne correspond à votre critère... vous
                    pouvez chercher « tarte aux pommes », « poisson », etc.
                </div>
            ) : (
                recipes.map((recipe) => (
                    <Card key={recipe.id} recipe={recipe} />
                ))
            )}
        </div>
    );
}

export default Gallery;
