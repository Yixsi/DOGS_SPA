const axios = require('axios');
require("dotenv").config();
const { Dog } = require('../db')

const { API_KEY } = process.env;

module.exports = {
    
    listDogs: async () =>{
        const result = await axios(`https://api.thedogapi.com/v1/breeds/?api_key=${API_KEY}`);
        
        const dbDogs = await Dog.findAll();

        if(!result && !dbDogs) throw Error('Nothing to show');

        const data = [...result.data, ...dbDogs];

        const format = data.map(dog => { return {
                id: dog.id,
                name: dog.name,
                life_span: dog.life_span,
                image: dog.image
            }
        });
        console.log(format.length);
        return format;
    },

    createDog: async (name, image, height, weight, life_span) =>{

        if(!name || !image || !height || !weight || !life_span) throw Error('Missing data');

        const newDog = await Dog.create({
          name,
          image,
          height,
          weight,
          life_span,
        });

        return newDog;
    }
}

// const data = result.data;

// const format = data.map((dog) => {
//   return {
//     name: dog.name,
//     age: dog.age,
//     img: dog.img,
//   };
// });
// return format;

//OBJECT DOG

// {
// 		"weight": {
// 			"imperial": "6 - 13",
// 			"metric": "3 - 6"
// 		},
// 		"height": {
// 			"imperial": "9 - 11.5",
// 			"metric": "23 - 29"
// 		},
// 		"id": 1,
// 		"name": "Affenpinscher",
// 		"bred_for": "Small rodent hunting, lapdog",
// 		"breed_group": "Toy",
// 		"life_span": "10 - 12 years",
// 		"temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
// 		"origin": "Germany, France",
// 		"reference_image_id": "BJa4kxc4X",
// 		"image": {
// 			"id": "BJa4kxc4X",
// 			"width": 1600,
// 			"height": 1199,
// 			"url": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
// 		}
// 	},