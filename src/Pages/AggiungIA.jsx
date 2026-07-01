import { GlobalContext } from "../contexts/GlobalContext"

import { useContext, useState, useRef, useEffect } from "react"

import styles from "./CSS/aggiungiia.module.css"

const AggiungiIA = () => {

    const [errors, setErrors] = useState({})

    const { createNewAI } = useContext(GlobalContext)


    const titleRef = useRef(null);
    const brandRef = useRef(null);
    const descriptionRef = useRef(null);
    const platformsRef = useRef(null);
    const languagesRef = useRef(null);
    const priceRef = useRef(null);
    const releaseYearRef = useRef(null);
    const integrationsRef = useRef(null);
    const useCasesRef = useRef(null);
    const categoryRef = useRef(null);
    const privacyLevelRef = useRef(null);
    const websiteRef = useRef(null);
    const ratingRef = useRef(null);
    const logoUrlRef = useRef(null);
    const hasFreeVersionRef = useRef(null);
    const apiAvailableRef = useRef(null);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!titleRef.current.value.trim()) newErrors.title = "Il nome è obbligatorio.";
        if (!categoryRef.current.value) newErrors.category = "La categoria è obbligatoria.";
        if (!descriptionRef.current.value.trim()) newErrors.description = "La descrizione è obbligatoria.";
        if (!privacyLevelRef.current.value) newErrors.privacyLevel = "Il livello di privacy è obbligatorio.";

        const releaseYearValue = Number(releaseYearRef.current.value)
        if (!releaseYearRef.current.value.trim() || isNaN(releaseYearValue) || releaseYearValue < 2018 || releaseYearValue > 2025) {
            newErrors.releaseYear = "L'anno di rilascio deve essere compreso tra 2018 e 2025"
        }

        const ratingValue = Number(ratingRef.current.value)
        if (!ratingRef.current.value.trim() || isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
            newErrors.rating = "Il voto deve essere un numero tra 0 e 5"
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const newAI = {
            title: titleRef.current.value.trim(),
            category: categoryRef.current.value,
            description: descriptionRef.current.value.trim(),
            brand: brandRef.current.value.trim() || "🤔",
            website: websiteRef.current.value.startsWith("https://") ? websiteRef.current.value.trim() : "🤔",
            logoUrl: logoUrlRef.current.value.startsWith("https://") ? logoUrlRef.current.value.trim() : "🤔",
            price: priceRef.current.value.trim() || "🤔",
            hasFreeVersion: hasFreeVersionRef.current.checked,
            apiAvailable: apiAvailableRef.current.checked,
            supportedLanguages: languagesRef.current.value
            ? languagesRef.current.value.split(",").map(e => e.trim())
            : ["🤔"],
            platforms: platformsRef.current.value
            ? platformsRef.current.value.split(",").map(e => e.trim())
            : ["🤔"],
            releaseYear: releaseYearRef.current.value
            ? Number(releaseYearRef.current.value)
            : 2025,
            rating: ratingRef.current.value
            ? Number(ratingRef.current.value)
            : 0,
            integrations: integrationsRef.current.value
            ? integrationsRef.current.value.split(",").map(e => e.trim())
            : ["🤔"],
            privacyLevel: privacyLevelRef.current.value,
            useCases: useCasesRef.current.value
            ? useCasesRef.current.value.split(",").map(e => e.trim())
            : ["🤔"]
        };

        try {
            await createNewAI(newAI);
            alert("IA aggiunta con successo!");
            setErrors({});
            event.target.reset();
        } catch (error) {
            const msg = error?.message || JSON.stringify(error);
            console.error("Errore nella creazione della IA:", msg);
            alert("Errore durante la creazione della IA");
        }
    };

    


    return (
    <section className={styles.sectionAddAi}>
    <div className="container">
        <h1 className={styles.addAiTitle}>
            Aggiungi una IA <i className="fa-solid fa-plus"></i>
        </h1>
        <form className={styles.addAiFormFlex} onSubmit={handleSubmit}>
            
            <div className={styles.inputBox}>         
                <label>Nome</label>
                <input
                    ref={titleRef}
                    className={styles.addAiInput}
                    type="text"
                    placeholder="Gemini, Copilot..."
                />
                {errors.title && <p className={styles.errorMsg}>{errors.title}</p>}
            </div>

            <div className={styles.inputBox}>
                <label>Categoria</label>
                <select
                    ref={categoryRef}
                    className={styles.addAiInput}
                    defaultValue=""
                >
                    <option value="">Tutte le categorie</option>
                    <option value="Multimedia & Editing">Multimedia & Editing</option>
                    <option value="Design & Presentazioni">Design & Presentazioni</option>
                    <option value="Assistenti Generali">Assistenti Generali</option>
                    <option value="Scrittura & Contenuti">Scrittura & Contenuti</option>
                    <option value="Performance Management">Performance Management</option>
                    <option value="Ricerca AI">Ricerca AI</option>
                    <option value="Marketing & SEO">Marketing & SEO</option>
                </select>
                {errors.category && <p className={styles.errorMsg}>{errors.category}</p>}
            </div>

            <div className={styles.inputBox}>
                <label>Brand</label>
                <input
                    ref={brandRef}
                    className={styles.addAiInput}
                    type="text"
                    placeholder="Google, OpenAI..."
                />
            </div>

            <div className={styles.inputBox}>
                <label>Descrizione</label>
                <textarea
                    ref={descriptionRef}
                    className={styles.addAiInput}
                    placeholder="ES: crea immagini partendo da un modello dato dall'utente..."
                />
                {errors.description && <p className={styles.errorMsg}>{errors.description}</p>}
            </div>

            <div className={styles.inputBox}>
                <label>Piattaforme supportate</label>
                <input
                    ref={platformsRef}
                    className={styles.addAiInput}
                    type="text"
                    placeholder="Android, Windows..."
                />
            </div>

            <div className={styles.inputBox}>
                <label>Linguaggi supportati</label>
                <input
                    ref={languagesRef}
                    className={styles.addAiInput}
                    type="text"
                    placeholder="EN, IT, FR..."
                />
            </div>

            <div className={styles.inputBox}>
                <label>Prezzo</label>
                <input
                    ref={priceRef}
                    className={styles.addAiInput}
                    type="text"
                    placeholder="Mensile? Annuale? Freemium?..."
                />
                {errors.price && <p className={styles.errorMsg}>{errors.price}</p>}        
            </div>

            <div className={styles.inputBox}>
                <label>Anno di rilascio</label>
                <input
                    ref={releaseYearRef}
                    defaultValue="2018"
                    className={styles.addAiInput}
                    type="number"
                />
                {errors.releaseYear && <p className={styles.errorMsg}>{errors.releaseYear}</p>}        
            </div>

            <div className={styles.inputBox}>
                <label>Integrata in:</label>
                <input
                    ref={integrationsRef}
                    className={styles.addAiInput}
                    type="text"
                    placeholder="Visual Studio, Discord..."
                />
            </div>

            <div className={styles.inputBox}>
                <label>Casi d'uso:</label>
                <input
                    ref={useCasesRef}
                    className={styles.addAiInput}
                    type="text"
                    placeholder="Presentazioni, Design, Codice..."
                />
            </div>

            <div className={styles.inputBox}>
                <label>Voto?</label>
                <input
                    ref={ratingRef}
                    defaultValue="0"
                    className={styles.addAiInput}
                    type="number"
                />
                {errors.rating && <p className={styles.errorMsg}>{errors.rating}</p>}    
            </div>

            <div className={styles.inputBox}>
                <label>URL del logo</label>
                <input
                    ref={logoUrlRef}
                    className={styles.addAiInput}
                    type="text"
                    placeholder="https://logoimmagine"
                />
            </div>

            <div className={styles.inputBox}>
                <label>Sito Web</label>
                <input
                    ref={websiteRef}
                    className={styles.addAiInput}
                    type="text"
                    placeholder="Immetti il link del sito..."
                />
            </div>

            <div className={styles.inputBox}>
                <label>Livello Privacy</label>
                <select
                    ref={privacyLevelRef}
                    className={styles.addAiInput}
                    defaultValue=""
                >
                    <option value="">Seleziona il livello</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                {errors.privacyLevel && <p className={styles.errorMsg}>{errors.privacyLevel}</p>}
            </div>

            <div className={styles.checkboxBox}>
                <label>Ha una versione gratuita?</label>
                <input
                    ref={hasFreeVersionRef}
                    className={styles.checkbox}
                    type="checkbox"
                />   
            </div>

            <div className={styles.checkboxBox}>
                <label>API disponibile?</label>
                <input
                    ref={apiAvailableRef}
                    className={styles.checkbox}
                    type="checkbox"
                />
            </div>

            <button type="submit" className={styles.addAiBtnConfirm}>Conferma</button>
        </form>
    </div>
    </section>
    )
}

export default AggiungiIA;