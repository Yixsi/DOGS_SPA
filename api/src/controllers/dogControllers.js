const axios = require('axios');
require("dotenv").config();
const { Dog, Temper } = require('../db');
const { Op } = require('sequelize');

const { API_KEY } = process.env;

module.exports = {
    
    listDogs: async () =>{
        const result = await axios(
          `https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`
        );
        let dbDogs = await Dog.findAll({
          include: {
            model: Temper,
            attributes: ['name'],
            through: {
              attributes: []
            }
          }
        });

        if(!result && !dbDogs) throw new Error('Nothing to show');

        let data = [...result.data];

        data = data.map(dog => { return {
                id: dog.id,
                image: dog.image.url,
                name: dog.name,
                temper: dog.temperament, 
                weight: dog.weight.metric,
                origin: 'api'
            }
        });

        dbDogs = dbDogs.map(dog => {
              return {
                id: dog.id,
                image: dog.image,
                name: dog.name,
                weight: dog.weight,
                temper: dog.tempers,
                origin: dog.origin
              }
          });

          data = [...dbDogs, ...data];

          //Sending elements in a random order
          const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          };

          data = shuffleArray(data);
        return data;
    },

    createDog: async (name, image, height, weight, life_span, temper) => {

        if(!name || !image || !height || !weight || !life_span || !temper.length) throw new Error('Missing data');

        const newDog = await Dog.create({name, image, height, weight, life_span});
        await newDog.addTemper(temper);
        
        return newDog;
    },

    getDetail: async (id) => {

        try {
          const dogDB = await Dog.findByPk(id, {
            include: {
              model: Temper,
              attributes: ['name'],
              through: {
                attributes: []
              }
            }
          });

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
              idImage: dogApi.data.reference_image_id,
              name: dogApi.data.name,
              height: dogApi.data.height.metric,
              weight: dogApi.data.weight.metric,
              temper: dogApi.data.temperament,
              life_span: dogApi.data.life_span,
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
        },
        include: {
          model: Temper,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      });
      
      const dogsApi = await axios(`https://api.thedogapi.com/v1/breeds/search?name=${name}&api_key=${API_KEY}`);

      let data = [...dogsApi.data];
      
      dogs = dogs.map(dog => {
              return {
                id: dog.id,
                image: dog.image,
                name: dog.name,
                temper: dog.tempers, 
                weight: dog.weight,
                origin: dog.origin

              }
          });
      
      data = data.map(dog => {
              return {
                id: dog.id,
                idImage: dog.reference_image_id,
                name: dog.name,
                temper: dog.temperament, 
                weight: dog.weight.metric,
                origin: 'api'
              }
          });


      if(dogs && data){
        dogs = [...dogs, ...data];

        return dogs
      } else if(dogs.error && data){

        return [...data];

      }else if(dogs && dogsApi.error) return dogs;
      
      if(!dogs && !data) throw Error('Something went wrong');
    }
}
