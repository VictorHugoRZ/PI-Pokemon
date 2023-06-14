const axios = require('axios');
const { Pokemon, Type } = require('../db'); 

const getApiInfo = async () => { //Traemos datos de la API
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon/?limit=60'; //Limitamos la peticion
        let pokemones = [];
        let info = await axios.get(url);
            let pokemonsInfo = info.data.results;
            //console.log(pokemonsInfo);
            pokemones.push(...pokemonsInfo);
            //console.log(pokemones);
        let pokeData = await Promise.all(pokemones.map(async element => { //Extraemos la informacion de cada Pokemon
            let pokemon = await axios.get(element.url);
            return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                img: pokemon.data.sprites.front_shiny,
                types: pokemon.data.types.map(element => {
                    return ({
                        name: element.type.name,
                        img: null //Volver aqui para poner las imagenes de los tipos 
                    })
                }),
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
            }
        }));
        //console.log(pokesWithData);
        return pokeData;
    } catch (error) {
        console.log(error.response.data);
    };
};

const getDbInfo = async () => { //Traemos todos los pokemon de la base de datos 
    let pokemon = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
    return pokemon;
};

const getAllPokemon = async () => { //Traemos los pokemon de la API y de la DB
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = [...apiInfo, ...dbInfo];
    //console.log(infoTotal);
    return infoTotal;
};

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllPokemon
}