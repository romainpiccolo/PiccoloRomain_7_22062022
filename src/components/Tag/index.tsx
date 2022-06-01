import { capitalize } from '../../helper/string';
import styles from './tag.module.css';

type TagProps = {
    value: string;
    handleClick: (e: string) => void;
};

function Tag({ value, handleClick }: TagProps) {
    return (
        <div className={styles.tag} onClick={() => handleClick(value)}>
            {capitalize(value)}
        </div>
    );
}

export default Tag;
