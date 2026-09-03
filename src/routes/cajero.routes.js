const {Router} = require('express');
const { getCajeros, 
    getCajeroById, 
    createCajero, 
    createCajeros, 
    updateCajero, 
    deleteCajero, } = require('../controllers/cajero.controller');

const router = Router();

router.get('/cajeros', getCajeros);
router.get('/cajeros/:id', getCajeroById);
router.post('/cajeros', createCajero);
router.post('/cajeros/bulk', createCajeros);
router.put('/cajeros/:id', updateCajero);
router.delete('/cajeros/:id', deleteCajero);
module.exports = router;