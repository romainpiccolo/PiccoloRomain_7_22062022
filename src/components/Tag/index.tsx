import styles from './tag.module.css';
import removeIcon from '../../assets/remove_icon.svg';
import { capitalize } from '../../helper/string';

type TagProps = {
    value: string;
    color: string;
    handleClickOnTag: (e: string) => void;
};

function Tag({ value, color, handleClickOnTag }: TagProps) {
    const tagClass = `${styles.tag.concat(' ', styles[`${color}`])}`;

    return (
        <div className={tagClass}>
            {capitalize(value)}
            <img
                className={styles.removeIcon}
                src={removeIcon}
                alt="remove icon"
                onClick={() => handleClickOnTag(value)}
            />
        </div>
    );
}

export default Tag;
