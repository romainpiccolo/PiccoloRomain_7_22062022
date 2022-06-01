import IRecipe from '../../Interface/IRecipe';
import Timer from '../Timer';
import styles from './card.module.css';

type CardInfoIngredientsProps = {
    ingredient: string;
    quantity?: number;
    unit?: string;
};

const CardInfoIngredients = ({ item }: { item: CardInfoIngredientsProps }) => {
    return (
        <div>
            <span>{item.ingredient}: </span>
            <span>{item.quantity}</span>
            <span>{item.unit}</span>
        </div>
    );
};

function Card({ recipe }: { recipe: IRecipe }) {
    return (
        <div className={styles.card}>
            <div className={styles.img}></div>
            <div className={styles.content}>
                <div className={styles.cardTitle}>
                    <div>{recipe.name}</div>
                    <Timer duration={recipe.time} />
                </div>
                <div className={styles.cardInfos}>
                    <div className={styles.cardInfosIngredients}>
                        {recipe.ingredients.map((item, index) => (
                            <CardInfoIngredients key={index} item={item} />
                        ))}
                    </div>
                    <div className={styles.cardInfosDescription}>
                        {recipe.description}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
