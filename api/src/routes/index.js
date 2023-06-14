const { Router } = require('express');
const typesRoutes = require('./typesRoutes');
const pokemonRoutes = require('./pokemonRoutes');
const router = Router();

// Configurar los routers

router.use('/types', typesRoutes);
router.use('/pokemons', pokemonRoutes)




module.exports = router;
