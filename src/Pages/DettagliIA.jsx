import { GlobalContext } from "../contexts/GlobalContext"
import { useState, useContext, useEffect } from "react"

import { useParams, Link, useNavigate } from "react-router-dom"

import styles from "./CSS/dettagli.module.css"

const DettagliIA = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const { getSingleAI } = useContext(GlobalContext)

    const [singleAI, setSingleAI] = useState(null)

   useEffect(() => {
        const fetchAIdata = async () => {
            const data = await getSingleAI(id)
            setSingleAI(data)         
        }

        fetchAIdata()
    }, [id, getSingleAI, navigate])


    const ratingIcon = (rating) => {
        const icons = []
        const fullIcon = Math.floor(rating)
        const halfIcon = rating % 1 >= 0.5
        const emptyIcon = 5 - fullIcon - (halfIcon ? 1 : 0)

        for (let i = 0; i < fullIcon; i++) {
            icons.push(<i key={`full-${i}`} className="fa-solid fa-star"></i>)
        }

        if (halfIcon) {
            icons.push(<i key="half" className="fa-solid fa-star-half-stroke"></i>)
        }

        for (let i = 0; i < emptyIcon; i++) {
            icons.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>)
        }

        return icons
    }

    return (
        <main>
            {singleAI === undefined ? (
                <p className={styles.loading}>Caricamento...</p>
            ) : singleAI === null ? (
                <>
                    <div className={`container ${styles.noAiBox}`}>
                        <h2 className={styles.noAiTitle}>Ops! ⚠️</h2>
                        <p className={styles.noAiP}>L'intelligenza artificiale che stai cercando non esiste</p>
                        <Link className={styles.noAiBtn} onClick={() => navigate(-1)}>Torna indietro</Link>
                    </div>
                </>
            ) : (
                <>
                {/* Sezione logo e rating */}
                <section className={styles.sectionLogoTitle}>
                    <div className={`container ${styles.detailsFlexTitle}`}>
                        <img className={styles.detailsLogo} src={singleAI.logoUrl} alt="logo della AI" />
                        <h2 className={styles.detailsTitle}>{singleAI.title}</h2>
                    </div>
                    <div className={`container ${styles.detailsLogoSection}`}>
                        <div>              
                            <p>Voto: {ratingIcon(singleAI.rating)}</p>
                            <p className={styles.year}>Anno di rilascio: {singleAI.releaseYear}</p>
                        </div> 

                        <div>
                            <Link className={styles.linkWebsite} to={singleAI.website}>{singleAI.website}</Link>
                        </div>
                    </div>
                </section>
            
                {/* Sezione sito web */}
                          
                <section className={styles.sectionDetails}>
                    <div className={`container ${styles.details}`}>
                        <div className={styles.flexBoxDetails}>
                            <div className={styles.boxDetailsTitle}>
                                <div className={styles.iconBox}>
                                    <i className={`fa-regular fa-pen-to-square ${styles.iconCustom}`}></i>
                                </div>
                                <h3 className={styles.detailsTitleInfo}>_CosaFa?</h3>    
                            </div>
                                <p className={styles.detailsDescription}>{singleAI.description}</p>
                        </div>
                        <div className={styles.flexBoxDetails}>
                            <div className={styles.boxDetailsTitle}>
                                <div className={styles.iconBox}>
                                    <i className={`fa-solid fa-layer-group ${styles.iconCustom}`}></i>
                                </div>
                                <h3 className={styles.detailsTitleInfo}>_SpecificheTecniche</h3>    
                            </div>
                            <div className={styles.boxDetails}>

                                <div>
                                    <div className="mb-20">
                                        <h4>PIATTAFORME SUPPORTATE</h4>
                                        <p className={styles.detailsDescription}>{singleAI.platforms.join(", ")}</p>
                                    </div>
                                    <div className="mb-20">
                                        <h4>INTEGRAZIONI DISPONIBILI</h4>
                                        <p className={styles.detailsDescription}>{singleAI.integrations.join(", ")}</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="mb-20">
                                        <h4>LINGUE SUPPORTATE</h4>
                                        <p className={styles.detailsDescription}>{singleAI.supportedLanguages.join(", ")}</p>
                                    </div>
                                    <div className="mb-20">
                                        <h4>LIVELLO DI PRIVACY</h4>
                                        <p className={styles.detailsDescription}>{singleAI.privacyLevel}</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className={styles.flexBoxDetails}>
                            <div className={styles.boxDetailsTitle}>
                                <div className={styles.iconBox}>
                                    <i className={`fa-solid fa-coins ${styles.iconCustom}`}></i>
                                </div>
                                <h3 className={styles.detailsTitleInfo}>_Costi&Modelli</h3>
                            </div> 
                                                          
                            <div className={styles.boxDetails}>
                                <div>
                                    <h4>Costo</h4>
                                    <p className={styles.detailsDescription}>{singleAI.price}</p>
                                </div>
                                <div>
                                    <h4>HA UNA VERSIONE GRATUITA ?</h4>
                                    <p className={styles.detailsDescription}>{singleAI.hasFreeVersion === true ? "Sì" : "No"}</p>
                                </div>
                            </div>
                        </div>
                    </div>                     
                </section>
            
                </>
            )}
        </main>
    )
}

export default DettagliIA