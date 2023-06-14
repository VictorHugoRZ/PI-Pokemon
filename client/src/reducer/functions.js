
if(action.payload === 'asc'){
    sortedArray = state.pokemons.sort(function (a, b){
            if(a.name > b.name){
                return 1;
            }
            if(b.name > a.name){
                return -1;
                        }
            return 0;
        }) 
}

if(action.payload === 'desc'){
    sortedArray = state.pokemons.sort(function (a, b){
            if(a.name > b.name){
                return -1;
            }
            if(b.name > a.name){
                return 1;
            }
            return 0;
        }) 
}