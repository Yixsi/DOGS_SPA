const { Router } = require("express");
const router = Router();

const dogControllers = require("../controllers/dogControllers");

router.get("/dogs", async (req, res) => {
  try {
    const listDogs = await dogControllers.listDogs();
    res.status(200).json(listDogs);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/dogs', async (req, res) =>{
  const { name, image, height, weight, life_span } = req.body;

    try {
      const newDog = await dogControllers.createDog(
        name,
        image,
        height,
        weight,
        life_span
      );
      res.status(200).json(newDog);
      
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;
