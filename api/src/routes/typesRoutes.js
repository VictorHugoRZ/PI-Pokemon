const express = require("express");
const axios = require("axios");
const { Type } = require("../db");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let apiType = await axios.get('https://pokeapi.co/api/v2/type');
        let apiTypeInfo = apiType.data.results;
        //console.log(apiTypeInfo);
        let types = apiTypeInfo.map(element => element.name);
        //console.log(types);
        types.forEach(type => {
            Type.findOrCreate({
                where: {
                    name: type,
                }
            });
        });
        const allTypes = await Type.findAll();
        //console.log(allTypes);
        return res.status(200).send(allTypes);
    } catch (error) {
        console.log(error.response.data);
    };
});

module.exports = router;