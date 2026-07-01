import { NavLink, Link } from 'react-router-dom';

import BurgerMenu from './BurgerMenu';
import styles from './CSS/appheader.module.css'  


export default function AppHeader() {


    const linkNav = [
    {
        title: "Home",
        url: "/"
    }, 
    {
        title: "Lista delle IA",
        url: "/listaia"
    },
    {
        title: "Preferiti",
        url: "/preferiti"
    },
    {
        title: "AggiungiIA",
        url: "/aggiungiia"
    }]



    return (
        <header>    
                <div className={styles.logoContainer}>
                    <div className={styles.logoBox}>
                        <NavLink to={"/"}><i className={`fa-solid fa-brain ${styles.logo}`}></i></NavLink>
                    </div>
                    <p className={styles.logoText}>ComparaIA</p>
                </div>

                {/* Barra di navigazione */}
                <nav>               
                    <ul className={styles.flexNavHeader}>
                        {linkNav.map((curLink, index) => (
                            <li key={index}>                            
                                    <NavLink className={styles.navlink} to={curLink.url}>{curLink.title}</NavLink>
                            </li>
                        ))}
                    </ul>  
                    <BurgerMenu links={linkNav}/>
                </nav>
        </header>
    );
};