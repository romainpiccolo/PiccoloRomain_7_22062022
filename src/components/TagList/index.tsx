import Tag from '../Tag';
import styles from './tagList.module.css';

type TagListProps = {
    list: Array<string>;
    color: string;
    handleClickOnTag: (e: string) => void;
};

function TagList({ list, color, handleClickOnTag }: TagListProps) {
    return (
        <>
            {list.length > 0 ? (
                <div className={styles.TagListWrapper}>
                    {list.map((tag, index) => (
                        <Tag
                            key={index}
                            value={tag}
                            color={color}
                            handleClickOnTag={handleClickOnTag}
                        />
                    ))}
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default TagList;
