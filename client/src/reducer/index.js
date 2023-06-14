import { 
    GET_POKEMONS, 
    GET_ALL_TYPES, 
    FILTER_CREATED, 
    ORDER_NAME, 
    FILTER_TYPE,
    ORDER_STR,
    GET_POKEMON_NAME,
    GET_POKEMON_BY_ID,
    POST_POKEMON,
    GET_DETAILS,
    CLEAN_DETAIL,
    CLEAN_POKEMONS
} from "../actions/actionTypes";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    pokeDetail: []
}

const Reducer = (state = initialState, action) => {
    
    switch(action.type) {

        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            };

        case CLEAN_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            };

        case GET_ALL_TYPES:
            return {
                ...state,
                types: action.payload
            }; 

        case FILTER_CREATED: //Filtra los pokemon para traer los de la API, los de la DB o Ambos
            const allPokemons = state.allPokemons
            const statusFiltered = action.payload === "Created" ? allPokemons.filter(element => element.createdInDb) : allPokemons.filter(element => !element.createdInDb);
            return {
                ...state,
                pokemons: action.payload === 'All' ? allPokemons : statusFiltered.length ? statusFiltered : allPokemons
            };

        case FILTER_TYPE: //Filtra por tipo, se pueden aplicar dos filtros seguidos
            let copy = state.pokemons;
            let typeFiltered = action.payload === 'All' ? copy : copy.filter(element => element.types.some(element => element.name === action.payload));
            if(typeFiltered.length <= 0){
                typeFiltered = copy;   
                alert('There are no pokemon of the indicated type');
            }; 
            return {
                ...state,
                pokemons: typeFiltered
            };

        case ORDER_NAME: //Ordena los nombres en Ascendente y Descendente
        let pokemons = state.allPokemons;
            if(action.payload === 'asc'){ //Ordena en Ascendente
                pokemons = pokemons.sort((a, b) => {
                        if(a.name > b.name){
                            return 1;
                        }
                        if(b.name > a.name){
                            return -1;
                        }
                        return 0;
                    }) 
            }
            if(action.payload === 'desc'){ //Ordena en Descendente
                pokemons = pokemons.sort((a, b) => {
                        if(a.name > b.name){
                            return -1;
                        }
                        if(b.name > a.name){
                            return 1;
                        }
                        return 0;
                    }) 
            }
            return {
                ...state,
                pokemons: pokemons
            }; 

        case ORDER_STR: //Ordena el ataque de los pokemon en Ascendente o Descendente
            let copy2 = state.pokemons;
            let sortedStr = action.payload === 'asc' ?
                copy2.sort((a, b) => a.attack - b.attack) :
                copy2.sort((a, b) => b.attack - a.attack);   
            return {
                ...state,
                pokemons: sortedStr
            };

        case GET_POKEMON_NAME:
            return {
                ...state,
                pokemons: action.payload
            };

        case GET_POKEMON_BY_ID:
            return {
                ...state,
                pokemons: action.payload
            };

        case GET_DETAILS:
            return {
                ...state,
                pokeDetail: action.payload
            };

        case CLEAN_DETAIL:
            return {
                ...state,
                pokeDetail: action.payload
            };

        case POST_POKEMON:
            return {
                ...state
            };

        default: 
            return {...state};
    };
    
};

export default Reducer;