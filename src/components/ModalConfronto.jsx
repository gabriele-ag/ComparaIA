import "./CSS/ModalConfronto.css"
import { Link } from "react-router-dom"
import ReactDOM from "react-dom";

import styles from "./CSS/modalmodifica.module.css"

const ModalConfronto = ({isOpen, onClose, items}) => {

    // È aperto?
    if(!isOpen) return null

    // Creo un massimo di oggetti comparabili
    const maxItemsComparable = items.slice(0, 3)

    // Rating da numerico trasformato in icone
    const ratingIcon = (rating) => {
        const icons = []
        const fullIcon = Math.floor(rating)
        const halfIcon = rating % 1 >= 0.5
        const emptyIcon = 5 - fullIcon - (halfIcon ? 1 : 0)

        for (let i = 0; i < fullIcon; i++) {
            icons.push(<i key={`full-${i}`} className="fa-solid fa-star"></i>)
        }

        if (halfIcon) {
            icons.push(<i key={halfIcon} className="fa-solid fa-star-half-stroke"></i>)
        }

        for (let i = 0; i < emptyIcon; i++) {
            icons.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>)
        }

        return icons
    }

    const modalContent = (
        
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-box-title">
                    <button className="modal-btn-close" onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
                </div>
                <h3 className="modal-title">Risultati Comparazione</h3>
                <div className="modal-ai modal-table-wrapper">                   
                            <table className="modal-compare-table">
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
                                <td className="modal-feature-title">Rating</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td className="modal-rating" key={`rating-${curElem.id}`}>{ratingIcon(curElem.rating)}</td>
                                ))}

                                </tr>
                                
                                <tr>
                                <td className="modal-feature-title">Brand</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`desc-${curElem.id}`}>{curElem.brand}</td>
                                    ))}
                                </tr>

                                <tr>
                                <td className="modal-feature-title">Descrizione</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`desc-${curElem.id}`}>{curElem.description}</td>
                                    ))}
                                </tr>
                                <tr>

                                <td className="modal-feature-title">Usato per</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`lang-${curElem.id}`}>{curElem.useCases.join(", ")}</td>
                                ))}
                                </tr>

                                <tr>
                                <td className="modal-feature-title">Prezzo</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`price-${curElem.id}`}>{curElem.price}</td>
                                ))}
                                </tr>
                                
                                <tr>
                                <td className="modal-feature-title">Privacy</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`privacy-${curElem.id}`}>{curElem.privacyLevel}</td>
                                ))}
                                </tr>

                                <tr>
                                <td className="modal-feature-title">Lingue supportate</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`lang-${curElem.id}`}>{curElem.supportedLanguages.join(", ")}</td>
                                ))}
                                </tr>

                                <tr>
                                <td className="modal-feature-title">Piattaforma</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`lang-${curElem.id}`}>{curElem.platforms.join(", ")}</td>
                                ))}
                                </tr>

                                <tr>
                                <td className="modal-feature-title">Integrazione</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`lang-${curElem.id}`}>{curElem.integrations.join(", ")}</td>
                                ))}
                                </tr>

                                <tr>
                                <td className="modal-feature-title">Anno di rilascio</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`lang-${curElem.id}`}>{curElem.releaseYear}</td>
                                ))}
                                </tr>

                                <tr>
                                <td className="modal-feature-title">V. Gratuita?</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`lang-${curElem.id}`}>{curElem.hasFreeVersion === true ? "Sì" : "No"}</td>
                                ))}
                                </tr>

                                <tr>
                                <td className="modal-feature-title">Sito Web</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`lang-${curElem.id}`}><Link className="modal-website-ai" to={curElem.website}>{curElem.website}</Link></td>
                                ))}
                                </tr>

                                <tr>
                                <td className="modal-feature-title">API</td>
                                {maxItemsComparable.map((curElem) => (
                                    <td key={`lang-${curElem.id}`}>{curElem.apiAvailable === true ? "Sì" : "No"}</td>
                                ))}
                                </tr>

                                
                            </tbody>
                            </table>
                                       
                </div>
            </div>
        </div>
    )


    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
}

export default ModalConfronto