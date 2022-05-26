import styles from './tagselect.module.css';
import arrowDown from '../../assets/arrow_down.svg';

type TagSelectProps = {
    placeholder: string;
    color?: string;
};

function TagSelect({ placeholder, color = 'blue' }: TagSelectProps) {
    const styleColor = color === 'blue' ? styles.blue : '';

    return (
        <div className={styles.container}>
            <input
                className={styles.input + ' ' + styleColor}
                type="text"
                placeholder={placeholder}
            />
            <img
                className={styles.icon + ' ' + styleColor}
                src={arrowDown}
                alt="Arrow down"
            />
        </div>
    );
}

export default TagSelect;
