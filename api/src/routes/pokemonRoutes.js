const express = require('express');
const { Pokemon, Type } = require('../db');
const { getAllPokemon } = require('./functions');
const router = express.Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    //console.log(name);
    const allPokesName = await getAllPokemon();
    try {
        if (name) {
            let poke = allPokesName.filter(pokemon => pokemon.name.toLowerCase() === name.toLowerCase());
            poke.length ? res.status(200).send(poke) : res.status(404).send('Pokemon not found'); 
        } else {
            let pokemons = await getAllPokemon();
            return res.status(200).send(pokemons);
        }
    } catch (error) {
        console.log(error.response.data);
    }
});

router.get('/:id', async (req, res) => { //Volver aqui
    const { id } = req.params;
    const allPokesId = await getAllPokemon(); 
    try {
        if(id) {
            let pokemonById = allPokesId.filter(element => element.id == id);
            pokemonById.length ? res.status(200).send(pokemonById) : res.status(404).send('Pokemon not found')
        } 
    } catch (error) {
        console.log(error.response.data);
    }
});


router.post('/', async (req, res) => { //Volver aqui
    const { name, hp, attack, defense, speed, height, weight, img, types } = req.body;
    try {
        if(name) {
            const allPoke = await getAllPokemon();
            const isPoke = allPoke.find(element => element.name === name.toLowerCase());
            if (!isPoke) {
                const pokemon = await Pokemon.create({
                        name,
                        hp,
                        attack,
                        defense,
                        speed,
                        height,
                        weight,
                        img 
                });
                const typeDb = await Type.findAll({
                    where: {
                        name: types,
                    }
                });
                pokemon.addType(typeDb);
                return res.status(201).send(pokemon);
            }
            return res.status(404).send('Pokemon name already exist')
        } 
        if(!name) return res.status(404).send('Pokemon name is obligatory');
    } catch (error) {
        console.log(error.response.data);
    }
});

module.exports = router;