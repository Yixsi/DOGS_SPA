const { Router } = require("express");
const router = Router();

const dogControllers = require("../controllers/dogControllers");

router.get('/dogs', async (req, res) => {
  const { name } = req.query;

  try {
    if(!name){
      const listDogs = await dogControllers.listDogs();
      res.status(200).json(listDogs);

    }else{
      const dogs = await dogControllers.getDogByName(name);
      res.status(200).json(dogs);
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/dogs', async (req, res) =>{
  
  const { name, image, height, weight, lifeSpan, temper } = req.body;

  try {
    const newDog = await dogControllers.createDog(name, image, height, weight,
      lifeSpan, temper);
      
    res.status(201).json(newDog);

  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

router.get('/dogs/:idRaza', async (req, res) =>{

  const { idRaza } = req.params;

  try {
    const detail = await dogControllers.getDetail(idRaza);
    res.status(200).json(detail);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }

});



module.exports = router;
