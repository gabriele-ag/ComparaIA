import { useState } from "react"
import { NavLink } from "react-router-dom"

import styles from "./CSS/burgermenu.module.css"

export default function BurgerMenu({links}) {

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <>
            <div className={styles.burgerContainer}>
                <button className={styles.btnBurger} onClick={() => setOpenMenu(!openMenu)}><i className="fa-solid fa-ellipsis-vertical"></i></button>
            </div>

            <div className={ `${styles.burgerNav} ${openMenu ? `${styles.burgerNavOpen}` : "" }`}>
                <ul>
                    {links.map((curLink, index) => (
                        <li key={index}>
                            <NavLink 
                            className={styles.burgerLink}
                            to={curLink.url} 
                            onClick={() => setOpenMenu(false)}>
                                {curLink.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}