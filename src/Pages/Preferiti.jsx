import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { Link } from "react-router-dom"

// CSS convertito in CSS Modules
import styles from "./CSS/preferiti.module.css"

const Preferiti = () => {

    const { favorites, removeFromFavorites } = useContext(GlobalContext);

    return (
        <section className={styles.favSection}>
            <div className="container">
                <div className={styles.favTitleBox}>
                    <h2 className={styles.favTitle}>
                        _iTuoiPreferiti<i className={`fa-solid fa-star ${styles.favStar}`}></i>
                    </h2>
                </div>
                
                {favorites.length === 0 ? (
                    <div className={styles.favBoxNone}>
                        <p className={styles.favNone}>
                            Oh no! Non ci sono ancora preferiti nella tua lista!
                        </p>
                        <Link to="/listaia" className={styles.favBtnList}>
                            <i className="fa-solid fa-arrow-left me-2"></i> Vai alla lista
                        </Link>
                    </div>
                ) : (
                    <ul>
                        {favorites.map((curElem, index) => (
                            <div key={index} className={styles.favFlexBox}>
                                <li className={styles.favAiBox}>
                                    <h3 className={styles.favTitleAi}>{curElem.title}</h3>
                                    <p className={styles.favCategory}>{curElem.category}</p>
                                </li>
                                <div className={styles.favBtnFlex}>
                                    <Link to={`/listaia/${curElem.id}`} className={styles.favBtnDetails}>
                                        Vedi dettagli
                                    </Link>
                                    <button 
                                        className={styles.favBtnErase} 
                                        onClick={() => removeFromFavorites(curElem)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    )
}

export default Preferiti