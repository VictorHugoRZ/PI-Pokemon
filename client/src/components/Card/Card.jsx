import React from "react";
import { NavLink } from "react-router-dom";
import ditto from '../../img/ditto-pequeno.png';
import normal from '../../img/normalType.png';
import styles from './Card.module.css'

export default function Card({name, image, types, id}) {
    
    // console.log(name, image, types)
    return(
        <div>
            <NavLink className={styles.none} to={`/pokemon/${id}`}>
                <div>
                    <img className={styles.img} src={image ? image : ditto} alt="img not found" width="200px" height="250px" />
                    <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                    <div className={styles.types}>
                        {
                            types?.map((element, key) => {
                                return (
                                    <div className={styles.types} key={key}>
                                        <img className={styles.typesImg} src={normal} alt=""/>
                                        <p className={styles.text}>{element.name.charAt(0).toUpperCase() + element.name.slice(1)}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </NavLink>
        </div>
    );
};