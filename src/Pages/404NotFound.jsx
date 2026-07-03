import { Link } from "react-router-dom"
import styles from "./CSS/notfound.module.css"

import { useNavigate } from "react-router-dom"

export default function NotFound() {
    
    const navigate = useNavigate();

    return (
        <>
            <div className={`container ${styles.notfoundBox}`}>
                <h1 className={`${styles.notfoundTitle} ${styles.mBottom}`}>Ti sei perso? ⛔️ </h1>
                <p className={`${styles.notfoundP} ${styles.mBottom}`}>La pagina che stai cercando non esiste</p>
                <div className={styles.notfoundBtnBox}>
                    <Link className={`${styles.notfoundBtnHome} ${styles.btn}`} to={"/"}>
                        Torna alla Home
                    </Link>
                    <Link className={`${styles.notfoundBtnPP} ${styles.btn}`} onClick={() => navigate(-1)}>
                        Torna alla pagina precedente
                    </Link>
                </div>
            </div>
        </>
    );
};