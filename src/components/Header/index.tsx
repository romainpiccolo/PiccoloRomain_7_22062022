import logo from '../../assets/logo.svg';
import styles from './header.module.css';

function Header() {
    return (
        <div className={styles.header}>
            <img src={logo} alt="Les petits plats logo" />
        </div>
    );
}

export default Header;
