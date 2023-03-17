require("dotenv").config();
const axios = require('axios');
const { Temper } = require('../db');
const { API_KEY } = process.env;

module.exports = {

  listTempers: async () => {
    
    const result = await axios(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`);


    const tempers = result.data.map(dog => dog.temperament? dog.temperament : '').map(str => str?.split(', '));

    const uniqueTemps = new Set(tempers.flat());


    Array.from(uniqueTemps).map( async temp => {

      await Temper.findOrCreate({
        where: { name: temp }
      })
    });

    const temps = await Temper.findAll({ order: [['id', 'ASC']] });

    if(temps) return temps;
   
    throw new Error('Something went wrong');
    
  }
}


