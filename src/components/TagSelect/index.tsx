import { useEffect, useState } from 'react';
import styles from './tagselect.module.css';
import TagSelectCaret from '../TagSelectCaret';
import Tag from '../Tag';
import { singularize } from '../../helper/string';

type TagSelectProps = {
    placeholder: string;
    color?: string;
    tags: Array<string>;
};

function TagSelect({ placeholder, color = 'blue', tags }: TagSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTags, setCurrentTags] = useState<Array<string>>(tags);
    const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholder);

    useEffect(() => {
        setCurrentTags(tags);
        setIsOpen(false);
    }, [tags]);

    const handleClickOpen = () => {
        setIsOpen(!isOpen);

        isOpen
            ? setCurrentPlaceholder(placeholder)
            : setCurrentPlaceholder(
                  'Rechercher un ' + singularize(placeholder).toLowerCase()
              );
    };

    const handleClickOnTag = (e: string) => {
        console.log(e);
    };

    const handleInputChange = (search: string) => {
        if (search.length > 2) {
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
                    <span>{currentTags.length}</span>

                    {currentTags.map((tag, index) => (
                        <Tag
                            key={index}
                            value={tag}
                            handleClick={handleClickOnTag}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default TagSelect;
