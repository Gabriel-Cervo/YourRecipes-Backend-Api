const express = require('express');
const routes = express.Router();
const RecipesController = require('./controllers/RecipesController');

const recipesController = new RecipesController();


// users
// routes.post('/register', )

// recipes
routes.get('/recipes', recipesController.index);
routes.post('/recipes', recipesController.createRecipe);
routes.put('/recipes', recipesController.updateRecipe);
routes.delete('/recipes', recipesController.deleteRecipe);

module.exports = routes;