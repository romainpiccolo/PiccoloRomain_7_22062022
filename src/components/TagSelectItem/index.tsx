import { capitalize } from '../../helper/string';
import styles from './selectTagItem.module.css';

type SelectTagItemProps = {
    value: string;
    handleClick: (e: string) => void;
};

function SelectTagItem({ value, handleClick }: SelectTagItemProps) {
    return (
        <div
            className={styles.selectTagItem}
            onClick={() => handleClick(value)}
        >
            {capitalize(value)}
        </div>
    );
}

export default SelectTagItem;
