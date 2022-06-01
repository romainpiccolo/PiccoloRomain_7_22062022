import arrowDown from '../../assets/arrow_down.svg';
import arrowUp from '../../assets/arrow_up.svg';
import styles from './tagselectcaret.module.css';

type CaretProps = {
    direction: string;
    color?: string;
    handleClick: () => void;
};

function TagSelectCaret({
    direction = 'down',
    color = 'blue',
    handleClick,
}: CaretProps) {
    const customClass = `${styles.icon.concat(' ', styles[`${color}`])}`;
    const arrowType = direction === 'down' ? arrowDown : arrowUp;

    return (
        <>
            <img
                className={customClass}
                src={arrowType}
                alt={`Arrow ${direction}`}
                onClick={handleClick}
            />
        </>
    );
}

export default TagSelectCaret;
