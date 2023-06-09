import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetailPromise, cleanDetail, cleanPokemons } from "../../actions";
import { useEffect } from "react";
import ditto from '../../img/ditto-pequeno.png';
import normal from '../../img/normalType.png';
import Loading from "../Loading/Loading";
import styles from './Detail.module.css'

const Detail = (props) => {

    const dispatch = useDispatch();
    const myPokemon = useSelector((state) => state.pokeDetail)

    useEffect(() => {
        dispatch(getDetailPromise(props.match.params.id))
        return () => {
            dispatch(cleanDetail(dispatch), cleanPokemons(dispatch))
        }
    }, [dispatch, props.match.params.id])


    return ( 
        <div>
            {
                myPokemon.length > 0 ?
                <div className={styles.container}>
                    <div className={styles.card}>
                        <h2 className={styles.h2}>{myPokemon[0].name.charAt(0).toUpperCase() + myPokemon[0].name.slice(1)}</h2>
                        <p className={styles.p}>ID:{myPokemon[0].id}</p>
                        <img src={myPokemon[0].img ? myPokemon[0].img : ditto} alt="img not found" height="300px" width="250px" />
                        <div className={styles.types}>
                            <h3>{myPokemon[0].types?.map((element, key) => {
                                    return (
                                        <div className={styles.types} key={key}>
                                            <img className={styles.typesImg} src={normal} alt='img' />
                                            <p className={styles.text}>{element.name.charAt(0).toUpperCase() + element.name.slice(1)}</p>
                                        </div>
                                    )
                                })} </h3>
                        </div>
                        <h5 className={styles.h5}>HP:  {myPokemon[0].hp}</h5>
                        <h5 className={styles.h5}>Attack:  {myPokemon[0].attack}</h5>
                        <h5 className={styles.h5}>Defense:  {myPokemon[0].defense}</h5>
                        <h5 className={styles.h5}>Speed:  {myPokemon[0].speed}</h5>
                        <h5 className={styles.h5}>Height:  {myPokemon[0].height}</h5>
                        <h5 className={styles.h5}>Weight:  {myPokemon[0].weight}</h5>
                    </div>
                </div> : 
                <div>
                    <Loading />
                </div>
            }
            <div>
            <Link to='/home'>
                <button className={styles.btn}>Return Home</button>
            </Link>
            </div>
        </div>
        
     );
}
 
export default Detail;