import { Link } from 'react-router'; 
import styles from "./CSS/home.module.css"; 

const Home = () => {
    return (
        <main>     
            {/* <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className={styles.videoBg}
            >
                <source src="/Home-video.mp4" type="video/mp4" />
            </video> */}

            <section className={styles.homeSection}>
                <div className={styles.homeFlex}>
                    
                    <div className={`container ${styles.homeBox}`}>
                        <h1 className={styles.homeTitle}>_comparaIA</h1>
                        <h3 className={styles.homeSubtitle}>SEMPLICE. VELOCE. AFFIDABILE</h3>
                        
                        <div className={styles.descriptionBox}>
                            <p className={styles.descriptionHome}>
                                Sfoglia il nostro catalogo costantemente aggiornato sulle intelligenze artificiali più utilizzate. 
                                Che si tratti di scrittura, design o editing video, troverai lo strumento perfetto per te! 
                            </p>
                        </div>
                        
                        <div className={styles.btnFlex}>
                            <Link to="/listaia" className={styles.homeBtn}>
                                Sfoglia il catalogo!
                            </Link>
                        </div>
                    </div>

                </div>
            </section>  
        </main>       
    );
};

export default Home;