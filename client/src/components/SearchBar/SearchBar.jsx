import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByData, cleanPokemons } from '../../actions';
import styles from './SearchBar.module.css'

const SearchBar = () => {
    
    const dispatch = useDispatch();
    const [data, setData] = useState('');
    
    const handleInputChange = (event) => {
        event.preventDefault();
        setData(event.target.value);
        console.log(data);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(cleanPokemons(dispatch));
        dispatch(getPokemonByData(data));
        setData('');
    }

    return ( 
        <div className={styles.search} >
            <form onSubmit={event => {handleSubmit(event)}}>
                <input type="text" placeholder="Search..." onChange={event => {handleInputChange(event)}} value={data} className={styles.input} />
                <button type="submit" className={styles.btn}>Search</button>   
            </form>
        </div>
     );
}
 
export default SearchBar;