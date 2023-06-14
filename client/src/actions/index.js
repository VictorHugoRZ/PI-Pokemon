import axios from 'axios';
import { 
    GET_POKEMONS, 
    GET_ALL_TYPES, 
    FILTER_CREATED, 
    ORDER_NAME, 
    FILTER_TYPE, 
    ORDER_STR, 
    GET_POKEMON_NAME,
    GET_POKEMON_BY_ID,
    GET_DETAILS, 
    CLEAN_DETAIL, 
    CLEAN_POKEMONS
} from './actionTypes';

export const getPokemons = () => { //Trae a los pokemon cuando regresamos del Detail
    return async (dispatch) => {
        try {
            let url = 'http://localhost:3001/pokemons';
            let json = await axios.get(url);
            //console.log(json);
            return dispatch({
                type: GET_POKEMONS,
                payload: json.data
            });
        } catch (error) {
            console.log(error);
        };     
    };
};

export const cleanPokemons = (dispatch) => { //Borra los filtros aplicados
    return dispatch({
        type: CLEAN_POKEMONS,
        payload: []
    })
};

export const getAlltypes = () => { //Trae todos los tipos al selector para filtrar
    return async (dispatch) => {
        try {
            let url = 'http://localhost:3001/types';
            let json = await axios.get(url);
            return dispatch({
                type: GET_ALL_TYPES,
                payload: json.data
            });
        } catch (error) {
          console.log(error);  
        };
    };
};

export const filterCreated = (payload) => {
    return {
        type: FILTER_CREATED,
        payload
    };
};

export const orderName = (payload) => {
    return {
        type: ORDER_NAME,
        payload
    };
};

export const filterType = (payload) => {
    return {
        type: FILTER_TYPE,
        payload
    };
};

export const filterStr = (payload) => {
    return {
        type: ORDER_STR,
        payload
    }
}

export const getPokemonByData = (data) => { //Evalua el dato que buscamos en la SearchBar
    return async (dispatch) => {
        try {
            if(data.length > 2) {
                let json = await axios.get(`http://localhost:3001/pokemons?name=${data}`) //Filtra el pokemon por nombre en la SearchBar
            return dispatch({
                type: GET_POKEMON_NAME,
                payload: json.data
            })
            } else {
                let json = await axios.get(`http://localhost:3001/pokemons/${data}`); //Filtra el pokemon por id en la SearchBar
            return dispatch({
                type: GET_POKEMON_BY_ID,
                payload: json.data
            })
            }
        } catch (error) {
            alert('Pokemon not found, try another name or id.');
            window.location.href = "http://localhost:3000/home";
            console.log(error);
        };
    };    
};

export function getDetailPromise(id) { //Accede al Detail del Pokemon por Id
    return function (dispatch) {
        axios.get(`http://localhost:3001/pokemons/${id}`)
        .then(res => res.data)
        .then(res => dispatch({
            type: GET_DETAILS,
            payload: res
        }))
        .catch(error => console.log(error))
    }
}

export const cleanDetail = (dispatch) => {
    return dispatch({
        type: CLEAN_DETAIL,
        payload: []
    })
};

export const postPokemon = (payload) => { //Crea un Pokemon
    return async () => {
        try {
            let createPoke = await axios.post('http://localhost:3001/pokemons', payload);
            console.log(createPoke);
            alert('The Pokemon was created!');
            return createPoke;
        } catch (error) {
            alert("This Pokemon already exists...")
            console.log(error);
        }
    };
};