import styles from './searchinput.module.css';
import searchIcon from '../../assets/search_icon.svg';

type SearchInputProps = {
    setSearch: (e: string) => void;
};

function SearchInput({ setSearch }: SearchInputProps) {
    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                placeholder="Rechercher une recette"
                className={styles.input}
                onChange={(e) => setSearch(e.currentTarget.value.trim())}
            />

            <img
                className={styles.searchIcon}
                src={searchIcon}
                alt="search icon"
            />
        </div>
    );
}

export default SearchInput;
