const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// my own recipe
const myRecipe = {
  title: 'Lime mascarpone mousse',
  level: 'Easy Peasy',
  ingredients: ['lime', 'sugar', 'mascarpone', 'liquid cream'],
  dishType: 'dessert',
  duration: 20,
  creator: 'Valéry',
}

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then( async () => {
    // iteration 2
    const newRecipe = await Recipe.create(myRecipe)
    console.log('title: ', newRecipe.title)

    // iteration 3
    const recipeDB = await Recipe.insertMany(data)
    recipeDB.forEach(recipe => {
      console.log(recipe.title)
    }) 
    // iteration 4
    const updateDuration = await Recipe.findOneAndUpdate(
      {
        title: 'Rigatoni alla Genovese',
      },
      { duration: 100 },
      { new: true },
    )
    console.log(`Rigatoni alla Genovese duration updated to ${updateDuration.duration}`)

    // iteration 5
    const deletedRecipe = await Recipe.deleteOne(
      {
        title: 'Carrot Cake',
      },
    )
    // iteration 6
  mongoose.connection.close()
  })
    

  .catch(error => {
    console.error('Error connecting to the database', error.message);
  });
