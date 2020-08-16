const express = require('express');
const routes = express.Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const RecipesController = require('./controllers/RecipesController');
const UsersController = require('./controllers/UsersController');

const recipesController = new RecipesController();
const usersController = new UsersController();


// users
// routes.post('/register', )

// recipes
routes.get('/recipes', recipesController.index);
routes.post('/recipes', multer(multerConfig).single('file'), recipesController.createRecipe);
routes.put('/recipes/:id',  multer(multerConfig).single('file'), recipesController.updateRecipe);
routes.delete('/recipes/:id', recipesController.deleteRecipe);

// users
routes.post('/users/register', usersController.register);
routes.post('/users/login', usersController.login);

module.exports = routes;