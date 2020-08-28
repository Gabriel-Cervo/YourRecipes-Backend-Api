const express = require('express');
const routes = express.Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const RecipesController = require('./controllers/RecipesController');
const UsersController = require('./controllers/UsersController');
const authenticateToken = require('./config/auth');

const recipesController = new RecipesController();
const usersController = new UsersController();

// recipes
routes.get('/recipes', authenticateToken, recipesController.index);
routes.get('/recipe/:id', authenticateToken, recipesController.getRecipe);
routes.post('/recipes', multer(multerConfig).single('file'), authenticateToken, recipesController.createRecipe);
routes.put('/recipes/:id', multer(multerConfig).single('file'), authenticateToken, recipesController.updateRecipe);
routes.delete('/recipes/:id', authenticateToken, recipesController.deleteRecipe);

// users
routes.post('/users/register', usersController.register);
routes.post('/users/login', usersController.login);

module.exports = routes;