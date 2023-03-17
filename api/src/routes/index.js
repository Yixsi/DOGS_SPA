const { Router } = require('express');
const dogRoute = require('./dogsRoutes');
const tempRoute = require('./temperRoutes');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', dogRoute);
router.use('/', tempRoute);



module.exports = router;
