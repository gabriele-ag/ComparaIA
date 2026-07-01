import { useState, useEffect, useCallback } from "react"

const useList = () => {

    const [listAI, setListAI] = useState([])
    const [favorites, setFavorites] = useState(() => {
        const saved = window.localStorage.getItem("favorites")
        return saved ? JSON.parse(saved) : [];
    });

        useEffect(() => {
            window.localStorage.setItem("favorites", JSON.stringify(favorites))
        }, [favorites]);
       
        // Importo l'URL dal .env
        const urlList = import.meta.env.VITE_API_URL;
    
    
        // Chiamata API per tutta la lista delle IA
        const getListAI = useCallback(async () => {
            
            try {
    
                const response = await fetch(`${urlList}`)
                const data = await response.json()
    
                if(!response.ok) {
                    throw new Error(`Errore nella risposta: ${response.status}`)
                }
                
                setListAI(data)
                return data
            } catch(error) {
                throw new Error("Impossibile recuperari i dati:", error.message)
            } finally {
                console.log("Dati ricevuti con successo!")
            }
        }, [urlList]);
    
    
        
        // Chiamata API per la singola IA
        const getSingleAI = useCallback(async (id) => {
            
            try {
                
                const response = await fetch(`${urlList}/${id}`)
                const data = await response.json()
                
                if(!response.ok) {
                    throw new Error(`Errore nella risposta: ${response.status}`)
                }
                
                
                return data.aiproduct
            } catch(error) {
                throw new Error(`Impossibile recuperari i dati: ${error.message}`)
            } finally {
                console.log("Dati ricevuti con successo!")
            }
        }, [urlList]);


        // CRUD 
        
        const createNewAI = useCallback(async (newAI) => {
            try {
                const response = await fetch(`${urlList}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newAI)
                })

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Errore dal backend:", errorData);
                    throw new Error(errorData.message || "Errore nella richiesta");
                }

                const dataCreated = await response.json()
                setListAI(curElem => [...curElem, dataCreated])
                return dataCreated

            } catch(error) {
                throw new Error(`Errore nella creazione del nuovo elemento: ${error.message}`);
            }

        }, [urlList]);


        const updateAI = useCallback(async (id, updatedAI) => {
            try {
                const response = await fetch(`${urlList}/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify(updatedAI)
                })

                if (!response.ok) {
                    throw new Error(`Errore nella creazione del nuovo elemento: ${response.status}`)
                }

                const { aiproduct } = await response.json();
                setListAI(curElem => curElem.map(curAI => curAI.id === id ? aiproduct : curAI ))
                setFavorites(curElem => curElem.map(curFav => curFav.id === id ? aiproduct : curFav));
                return aiproduct


            } catch(error) {
                throw new Error(`Errore nella creazione del nuovo elemento: ${error.message}`)
            }

        }, [urlList]);


        const deleteAI = useCallback(async (id) => {
            try {
                const response = await fetch(`${urlList}/${id}`, {
                    method: "DELETE"
                })

                if (!response.ok) {
                    throw new Error(`Errore nella creazione del nuovo elemento: ${response.status}`)
                }

                setListAI(curElem => curElem.filter(curIA => curIA.id !== id))
                setFavorites(curElem => curElem.filter(curFav => curFav.id !== id));
                return true
            } catch(error) {
                throw new Error(`Errore nella creazione del nuovo elemento: ${error.message}`)
            }

        }, [urlList]);



        useEffect(() => {
            getListAI()
        }, [getListAI]);


        // Funzioni per l'aggiunzione e la rimozione dei preferiti

        const addToFavorites = (curElem) => {
            setFavorites((prev) => {
            const alreadyExists = prev.some((item) => item.id === curElem.id);
            return alreadyExists ? prev : [...prev, curElem];
            });
        };

        const removeFromFavorites = (curElem) => {
            setFavorites((prev) => prev.filter((curFav) => curFav.id !== curElem.id))
        };
        
        return {
            listAI,
            getListAI,
            getSingleAI,
            addToFavorites,
            removeFromFavorites,
            favorites,
            createNewAI,
            updateAI,
            deleteAI
        };
}

export default useList