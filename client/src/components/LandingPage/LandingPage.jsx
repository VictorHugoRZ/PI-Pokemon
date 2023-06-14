import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={styles.bg}>
            <Link to='/home'>
                <button className={styles.buttonIng}>Press Start</button>
            </Link>
        </div>
    )
}