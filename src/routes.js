const express = require('express');
const routes = express.Router();
const RecipesController = require('./controllers/RecipesController');

const recipesController = new RecipesController();

routes.get('/recipes', recipesController.index);
routes.post('/recipes', recipesController.createRecipe);

module.exports = routes;