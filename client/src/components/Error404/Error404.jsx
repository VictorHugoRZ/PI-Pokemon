import React from "react";
import ditto from '../../img/Ditto-Pokemon-PNG-HD-Quality.png'
import styles from './Error404.module.css'


const Error404 = () => {
    return ( 
        <div>
            <img className={styles.img} src={ditto} alt="img not found" />
            <h1 className={styles.h1}>ERROR 404</h1>
            <h2 className={styles.h2} >Not found</h2>
        </div>
     );
}
 
export default Error404;