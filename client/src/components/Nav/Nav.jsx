import React from "react";
import {Link} from 'react-router-dom';
import pokeball from '../../img/Poké_Ball_icon.svg.png'
import styles from './Nav.module.css'

const Nav = () => {
    return (
        <header>
            <nav className={styles.nav}>
                <div>
                    <img src={pokeball} alt="img not found" className={styles.img} /> 
                </div>
                <h2 className={styles.text}>Pokédex</h2>
                <div>  
                    <Link to='/create'>
                        <button className={styles.btn}>New Pokemon</button>
                    </Link>
                </div>
            </nav> 
        </header>
    )
}
 
export default Nav;