import React from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import styles from "./CSS/modalconfronto.module.css"; // Aggiornato all'uso dei moduli CSS in camelCase

const ModalConfronto = ({ isOpen, onClose, items }) => {

    // È aperto?
    if (!isOpen) return null;

    // Creo un massimo di oggetti comparabili
    const maxItemsComparable = items.slice(0, 3);

    // Rating da numerico trasformato in icone
    const ratingIcon = (rating) => {
        const icons = [];
        const fullIcon = Math.floor(rating);
        const halfIcon = rating % 1 >= 0.5;
        const emptyIcon = 5 - fullIcon - (halfIcon ? 1 : 0);

        for (let i = 0; i < fullIcon; i++) {
            icons.push(<i key={`full-${i}`} className="fa-solid fa-star"></i>);
        }

        if (halfIcon) {
            icons.push(<i key="half" className="fa-solid fa-star-half-stroke"></i>);
        }

        for (let i = 0; i < emptyIcon; i++) {
            icons.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>);
        }

        return icons;
    };

    const modalContent = (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalBoxTitle}>
                    <button className={styles.modalBtnClose} onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <h3 className={styles.modalTitle}>Risultati Comparazione</h3>
                <div className={styles.modalTableWrapper}>                   
                    <table className={styles.modalCompareTable}>
                        <thead>
                            <tr>
                                <th></th>
                                {maxItemsComparable.map((curElem) => (
                                    <th key={curElem.id}>{curElem.title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={styles.modalFeatureTitle}>Rating</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td className={styles.modalRating} key={`rating-${curElem.id}`}>
                                        {ratingIcon(curElem.rating)}
                                    </td>
                                ))}
                            </tr>
                            
                            <tr>
                                <td className={styles.modalFeatureTitle}>Brand</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`brand-${curElem.id}`}>{curElem.brand}</td>
                                ))}
                            </tr>

                            <tr>
                                <td className={styles.modalFeatureTitle}>Descrizione</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`desc-${curElem.id}`}>{curElem.description}</td>
                                ))}
                            </tr>
                            
                            <tr>
                                <td className={styles.modalFeatureTitle}>Usato per</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`useCases-${curElem.id}`}>{curElem.useCases.join(", ")}</td>
                                ))}
                            </tr>

                            <tr>
                                <td className={styles.modalFeatureTitle}>Prezzo</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`price-${curElem.id}`}>{curElem.price}</td>
                                ))}
                            </tr>
                            
                            <tr>
                                <td className={styles.modalFeatureTitle}>Privacy</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`privacy-${curElem.id}`}>{curElem.privacyLevel}</td>
                                ))}
                            </tr>

                            <tr>
                                <td className={styles.modalFeatureTitle}>Lingue supportate</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`lang-${curElem.id}`}>{curElem.supportedLanguages.join(", ")}</td>
                                ))}
                            </tr>

                            <tr>
                                <td className={styles.modalFeatureTitle}>Piattaforma</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`platform-${curElem.id}`}>{curElem.platforms.join(", ")}</td>
                                ))}
                            </tr>

                            <tr>
                                <td className={styles.modalFeatureTitle}>Integrazione</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`integ-${curElem.id}`}>{curElem.integrations.join(", ")}</td>
                                ))}
                            </tr>

                            <tr>
                                <td className={styles.modalFeatureTitle}>Anno di rilascio</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`year-${curElem.id}`}>{curElem.releaseYear}</td>
                                ))}
                            </tr>

                            <tr>
                                <td className={styles.modalFeatureTitle}>V. Gratuita?</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`free-${curElem.id}`}>
                                        {curElem.hasFreeVersion === true ? "Sì" : "No"}
                                    </td>
                                ))}
                            </tr>

                            <tr>
                                <td className={styles.modalFeatureTitle}>Sito Web</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`web-${curElem.id}`}>
                                        <Link className={styles.modalWebsiteAi} to={curElem.website}>
                                            {curElem.website}
                                        </Link>
                                    </td>
                                ))}
                            </tr>

                            <tr>
                                <td className={styles.modalFeatureTitle}>API</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`api-${curElem.id}`}>
                                        {curElem.apiAvailable === true ? "Sì" : "No"}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
};

export default ModalConfronto;