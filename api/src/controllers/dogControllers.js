const axios = require('axios');
require("dotenv").config();
const { Dog } = require('../db');
const { Op } = require('sequelize');

const { API_KEY } = process.env;

module.exports = {
    
    listDogs: async () =>{
        const result = await axios(
          `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`
        );
        let dbDogs = await Dog.findAll();

        if(!result && !dbDogs) throw new Error('Nothing to show');

        let data = [...result.data];

        data = data.map(dog => { return {
                image: dog.image.url,
                name: dog.name,
                temper: dog.temperament, 
                weight: dog.weight.metric

            }
        });

        dbDogs = dbDogs.map(dog => {
              return {
                image: dog.image,
                name: dog.name,
                temper: dog.temper, 
                weight: dog.weight

              }
          });

          data = [...data, ...dbDogs];
        return data;
    },

    createDog: async (name, image, height, weight, life_span, temper) => {

        if(!name || !image || !height || !weight || !life_span || !temper) throw new Error('Missing data');

        const newDog = await Dog.create({name, image, height, weight, life_span, temper});
        return newDog;
    },

    getDetail: async (id) => {
        try {
          const dogDB = await Dog.findByPk(id);

          if (dogDB) {
            return dogDB;

          } else {
            throw new Error('Dog not found in database');
          }
        } catch (error) {
          // If the search in the DB fails, then we look in the API.

          const dogApi = await axios(`https://api.thedogapi.com/v1/breeds/${id}/?api_key=${API_KEY}`);

          if (Object.keys(dogApi.data).length !== 0) {
            const detail = {
              id: dogApi.data.id,
              image: dogApi.data.image,
              name: dogApi.data.name,
              height: dogApi.data.height.metric,
              weight: dogApi.data.weight.metric,
              temper: dogApi.data.temperament,
              life_span: dogApi.data.life_span
            }
            return detail;

          } else {
            throw new Error('Dog not found');
          }
        }

      },

    getDogByName: async (name) =>{

      let dogs = await Dog.findAll({
        where: {
          name:{
            [Op.iLike]: `%${name}%` 
          }
        }
      });
      
      const dogsApi = await axios(`https://api.thedogapi.com/v1/breeds/search?name=${name}&api_key=${API_KEY}`);
      

      dogs = [...dogs, ...dogsApi.data]

      return dogs;
    }
}
