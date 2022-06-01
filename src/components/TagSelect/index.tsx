import styles from './tagselect.module.css';
import { useState } from 'react';
import TagSelectCaret from '../TagSelectCaret';

type TagSelectProps = {
    placeholder: string;
    color?: string;
};

function TagSelect({ placeholder, color = 'blue' }: TagSelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    let styleColor = styles.blue;

    if (color === 'green') {
        styleColor = styles.green;
    }
    if (color === 'red') {
        styleColor = styles.red;
    }

    const handleClickOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.container}>
            <input
                className={styles.input + ' ' + styleColor}
                type="text"
                placeholder={placeholder}
            />

            <TagSelectCaret
                direction={isOpen ? 'down' : 'up'}
                color={color}
                handleClick={handleClickOpen}
            />
        </div>
    );
}

export default TagSelect;
