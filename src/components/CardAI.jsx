import { Link } from "react-router-dom"
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

import styles from "./CSS/cardai.module.css"

const categoryIcons = {
  "Multimedia & Editing": "fa-film",
  "Design & Presentazioni": "fa-palette",
  "Assistenti Generali": "fa-robot",
  "Scrittura & Contenuti": "fa-pen-nib",
  "Performance Management": "fa-chart-line",
  "Ricerca AI": "fa-magnifying-glass",
  "Marketing & SEO": "fa-bullhorn",
};

export default function cardAI({title, subtitle, details, toggle, addRemCompare, disabledCompare, onDelete, onEdit, id}) {

    const iconClass = categoryIcons[subtitle] || "fa-brain";
    
    const {favorites, addToFavorites, removeFromFavorites} = useContext(GlobalContext)

    const isFavorite = favorites.some((curFav) => curFav.id === id)

    const toggleFavorite = () => {
        const aiData = { id, title, category: subtitle };
        isFavorite ? removeFromFavorites(aiData) : addToFavorites(aiData);
    };

    return (
        <>
        <div className={styles.cardAi}>

            <div className={styles.upperCardZone}>

                <div className={styles.fallbackIconBox}>
                    <i className={`fa-solid ${iconClass}`}></i>
                </div>
                
                <div className={styles.cardBtnBox2}>
                    <button className={styles.btnFav} onClick={toggleFavorite}>{isFavorite ? <i className={`fa-solid fa-star ${styles.btnFavEmpty}`}></i> : <i className={`fa-regular fa-star ${styles.btnFavFull}`}></i> }</button>
                    <button className={styles.btnDelete} onClick={onDelete}><i className="fa-solid fa-trash"></i></button>
                    <button className={styles.btnEdit} onClick={onEdit}><i className="fa-solid fa-pencil"></i></button>
                </div>
                
            </div>  

            <div>       
                <h1 className={styles.cardTitle}>{title}</h1>
                <h3 className={styles.cardSubtitle}>Pensato per: {subtitle}</h3>
            </div>

            <div className={styles.cardBtnBox}>
                    <Link className={styles.btnDetails} to={`/listaia/${details}`} >Vedi dettagli</Link>          
                    <button className={`${styles.btnCompare} ${disabledCompare ? `${styles.btnCompareDisabled}` : ''}`} onClick={toggle} disabled={disabledCompare}>{addRemCompare}</button>
            </div>                   
        </div>
        </>
    )
}