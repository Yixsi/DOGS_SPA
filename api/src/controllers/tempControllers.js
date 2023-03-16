const { Temper } = require('/..db');

const tempers = [  'Stubborn', 'Curious', 'Playful', 'Adventurous', 'Active', 'Fun-loving',  'Aloof', 'Clownish', 'Dignified', 'Independent', 'Happy',  'Wild', 'Hardworking', 'Dutiful',  'Outgoing', 'Friendly', 'Alert', 'Confident', 'Intelligent', 'Courageous',  'Loyal', 'Independent', 'Intelligent', 'Brave',  'Docile', 'Alert', 'Responsive', 'Dignified', 'Composed', 'Friendly', 'Receptive', 'Faithful', 'Courageous',  'Loving', 'Protective', 'Trainable', 'Dutiful', 'Responsible',  'Energetic', 'Loyal', 'Gentle', 'Confident',  'Affectionate', 'Devoted', 'Dignified', 'Playful', 'Assertive', 'Dominant',  'Strong Willed', 'Stubborn', 'Clownish', 'Affectionate', 'Obedient', 'Intelligent', 'Courageous',  'Reserved', 'Protective',  'Kind', 'Sweet-Tempered', 'Independent', 'Loving',  'Tenacious', 'Devoted', 'Attentive',  'Steady', 'Bold', 'Proud',  'Reliable', 'Fearless', 'Lively', 'Self-assured',  'Cautious', 'Protective', 'Brave',  'Eager',  'Good-natured', 'Active',  'Spirited', 'Companionable', 'Even Tempered', 'Courageous',  'Rugged', 'Fierce', 'Refined',  'Joyful',  'Curious',  'Agile',  'Sweet-Tempered',  'Excitable', 'Determined',  'Self-confidence', 'Hardy',  'Sensitive',  'Watchful',  'Faithful',  'Feisty', 'Cheerful',  'Easygoing', 'Adaptable', 'Trusting', 'Lovable',  'Obedient',  'Territorial',  'Keen', 'Responsive'];

module.exports = {

  addTemper: async (tempers) =>{
    const result = await Temper.bulkCreate(tempers);
    
  }
}


