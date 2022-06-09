import { useEffect, useState } from 'react';
import styles from './tagselect.module.css';
import TagSelectCaret from '../TagSelectCaret';
import TagSelectItem from '../TagSelectItem';
import { singularize } from '../../helper/string';

type TagSelectProps = {
    placeholder: string;
    color?: string;
    tags: Array<string>;
    selected: Array<string>;
    handleClickOnTag: (value: string) => void;
};

function TagSelect({
    placeholder,
    color = 'blue',
    tags,
    selected,
    handleClickOnTag,
}: TagSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTags, setCurrentTags] = useState<Array<string>>(tags);
    const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);

    useEffect(() => {
        setCurrentTags(tags);
        setIsOpen(false);
        setCurrentPlaceholder(placeholder);
    }, [tags, placeholder]);

    const handleClickOpen = () => {
        setIsOpen(!isOpen);

        isOpen
            ? setCurrentPlaceholder(placeholder)
            : setCurrentPlaceholder(
                  'Rechercher un '.concat(
                      ' ',
                      singularize(placeholder).toLowerCase()
                  )
              );
    };

    const handleInputChange = (search: string) => {
        if (search.length > 2) {
            setIsOpen(true);
            setCurrentTags(
                tags.filter((tag) => tag.includes(search.toLowerCase()))
            );
        } else {
            setCurrentTags(tags);
        }
    };

    const inputClass = `${styles.input.concat(' ', styles[`${color}`])}`;
    const tagListClass = `${styles.tagsList
        .concat(' ', styles[`${color}`])
        .concat(' ', isOpen ? styles.showList : styles.hideList)}`;

    return (
        <>
            <div className={styles.container}>
                <div className={styles.inputContainer}>
                    <input
                        className={inputClass}
                        type="text"
                        placeholder={currentPlaceholder}
                        onChange={(e) =>
                            handleInputChange(e.currentTarget.value.trim())
                        }
                    />

                    <TagSelectCaret
                        direction={isOpen ? 'down' : 'up'}
                        color={color}
                        handleClick={handleClickOpen}
                    />
                </div>

                <div className={tagListClass}>
                    {currentTags.map((tag, index) =>
                        !selected.includes(tag) ? (
                            <TagSelectItem
                                key={index}
                                value={tag}
                                handleClick={handleClickOnTag}
                            />
                        ) : (
                            <></>
                        )
                    )}
                </div>
            </div>
        </>
    );
}

export default TagSelect;
