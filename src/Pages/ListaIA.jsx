import { GlobalContext } from "../contexts/GlobalContext"
import { useNotification } from "../contexts/Notification";

import { useState, useMemo, useContext, useEffect, useCallback } from "react"

// Import della card
import CardAI from "../components/CardAI"

// CSS
import styles from "./CSS/listaia.module.css"

// Import dei modali
import ModalConfronto from "../components/ModalConfronto"
import ModalModifica from "../components/ModalModifica"

// Funzione di Debounce
const debounce = (callback, delay = 500) => {
    let timer;

    return (value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }
}

export default function ListaIA() {

    // GlobalContext per richiamo degli elementi dal back-end
    const { getListAI, listAI, getSingleAI, updateAI, deleteAI } = useContext(GlobalContext)
    const { showNotification } = useNotification();

    useEffect(() => {
        getListAI();
    }, []);

    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [sorted, setSorted] = useState(true)
    const [selectedAI, setSelectedAI] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailedAI, setDetailedAI] = useState([]);

    // Variabili di stato per cancellazione
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [aiToDelete, setAiToDelete] = useState(null);

    // Variabili di stato per modifica IA
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [toEdit, setToEdit] = useState(null)

    // debounce
    const debouncedSearch = useCallback(debounce((value) => setSearch(value)), [])
    
    const handleForm = (event) => {
        event.preventDefault()
    };

    // Filtri per ricerca e ordinamento
    const filteredAI = useMemo(() => {
        // Filtri per ricerca titolo e per selezione categoria
        const filtered = listAI.filter((elem) => {
            const matchText = typeof elem.title === "string" && elem.title.toLowerCase().includes(search.toLowerCase());
            const matchSelectedCategory = selectedCategory === "" || elem.category === selectedCategory;
            return matchText && matchSelectedCategory
        })

        // Ordinamento A-Z || Z-A
        const sortedByTitle = [...filtered].sort((a,b) => {
            return sorted ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        })

        return sortedByTitle
    }, [listAI, selectedCategory, sorted, search])

    const toggleAISelected = (elemAI) => {
        if (selectedAI.find(curItem => curItem.id === elemAI.id)) {
            setSelectedAI(selectedAI.filter(curItem => curItem.id !== elemAI.id));
        } else {
            setSelectedAI([...selectedAI, elemAI]);
        }
    };

    // Eseguo chiamata per prendere le info aggiuntive da mettere nel comparatore
    const fetchDetailsForCompare = async () => {
        const promises = selectedAI.map(curElem => getSingleAI(curElem.id));
        const results = await Promise.all(promises)
        setDetailedAI(results)
        setIsModalOpen(true)
    };

    // Funzioni per la cancellazione e modifica della IA
    const confirmDeleteAI = (ai) => {
        setAiToDelete(ai);
        setIsDeleteModalOpen(true);
    };

    const confirmEditAI = (ai) => {
        setToEdit(ai)
        setIsEditModalOpen(true)     
    };

    // Gestione della cancellazione
    const handleDeleteAI = async () => {
        if (!aiToDelete) return;

        try {
            await deleteAI(aiToDelete.id);
            showNotification("L'elemento è stato rimosso dalla dashboard. 🗑️", "delete");
            setIsDeleteModalOpen(false);
            setAiToDelete(null);
        } catch (error) {
            console.error("Errore nell'eliminazione della IA:", error.message);
            alert("Errore durante l'eliminazione della IA.");
        }
    };

    // Gestione della modifica
    const handleEditAI = async (editedAI) => {
        try {
            await updateAI(toEdit.id, editedAI)
            await getListAI()
            showNotification("Modifiche salvate correttamente. 💾", "modify");       
            setIsEditModalOpen(false)
            setToEdit(null);
        } catch(error) {
            console.error("Errore nella modifica:", error.message)
            alert("Errore durante la modifica della IA")
        }
    };

    return (
        <>
            <main>
                <section className={styles.sectionListaIA}>        

                    {/* Pulsante per il confronto */}
                    {selectedAI.length >= 2 && (
                        <button
                            className={styles.btnConfronta}
                            onClick={fetchDetailsForCompare}
                        >
                            Confronta ora!
                        </button>
                    )}

                    {/* Container */}
                    <div className="container">

                        <div className={styles.boxTitle}>
                            <h2 className={styles.titleSection}>_EsploraLeMiglioriIA</h2>
                            <p className={styles.subtitleSection}>Trova, filtra e seleziona le IA per confrontarle in tempo reale.</p>
                        </div>

                        {/* Input per i filtri */}
                        
                            <form className={styles.boxInput} onSubmit={handleForm}>
                                <div>
                                    <input 
                                        type="text"
                                        placeholder="Cerca qui la tua IA..."
                                        onChange={(e) => debouncedSearch(e.target.value)}
                                        className={styles.searchInput} 
                                    />
                                    
                                    <select 
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className={styles.categoryInput}
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
                                </div>

                                {/* Pulsante per ordinamento */}
                                <div className={styles.sortOrderBox}>
                                    <span className={styles.sortedBy}>Ordina da:</span> 
                                    <button 
                                        className={styles.btnSort} 
                                        onClick={() => setSorted(!sorted)}
                                    >
                                        {sorted ? <i className={`fa-solid fa-arrow-up-a-z ${styles.sortOrderButton}`}></i> : <i className={`fa-solid fa-arrow-down-z-a ${styles.sortOrderButton}`}></i>}
                                    </button>
                                </div>
                            </form>
                        
                        {/* Elenco delle IA */}
                        <ul className={styles.listContainer}>
                            {filteredAI.length === 0 ? (
                                <p className={styles.noResultSearch}>Nessun risultato. Cosa stai cercando? 🤔</p>
                            ) : (
                                filteredAI.map((curElem) => (  
                                                
                                    <li key={curElem.id}>                                        
                                        <CardAI
                                            id={curElem.id}
                                            title={curElem.title}
                                            subtitle={curElem.category}
                                            details={curElem.id}
                                            toggle={() => toggleAISelected(curElem)}
                                            addRemCompare={selectedAI.find((curItem) => curItem.id === curElem.id)? "Rimuovi": "Metti a confronto"}
                                            disabledCompare={selectedAI.length >= 3 && !selectedAI.find((curItem) => curItem.id === curElem.id)}
                                            onDelete={() => confirmDeleteAI(curElem)}
                                            onEdit={() => confirmEditAI(curElem)}
                                        />
                                    </li>
                                ))
                            )}
                        </ul>
                        


                        {/* Modale Eliminazione */}
                        {isDeleteModalOpen && (
                            <div className={styles.modalOverlayDelete}>
                                <div className={styles.modalContentDelete}>
                                    <h3>Conferma eliminazione</h3>
                                    <p className={styles.modalP}>Vuoi davvero eliminare <span>{aiToDelete?.title}</span>?</p>
                                    <div className={styles.modalBoxBtn}>
                                        <button onClick={handleDeleteAI} className={styles.btnConfirmDelete}>Conferma</button>
                                        <button onClick={() => setIsDeleteModalOpen(false)} className={styles.btnCancelDelete}>Annulla</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <ModalConfronto
                            items={detailedAI}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                        />

                        {isEditModalOpen && (
                            <ModalModifica
                                elemAI={toEdit}
                                onClose={() => setIsEditModalOpen(false)}
                                onSubmit={handleEditAI}
                            />
                        )}

                    </div>
                </section>
            </main>
        </>
    )
}