import styles from './layout.module.css';
import Header from '../Header';

type LayoutProps = {
    children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
    return (
        <>
            <div className={styles.layout}>
                <div className={styles.header}>
                    <Header />
                </div>
                <main className={styles.main}>{children}</main>
            </div>
        </>
    );
}

export default Layout;
