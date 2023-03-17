const { Router } = require("express");
const router = Router();
const tempControllers = require('../controllers/tempControllers');


router.get('/tempers', async (req, res) => {

    try{
        const tempers = await tempControllers.listTempers();
        res.status(200).json(tempers);

    } catch (error){
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;