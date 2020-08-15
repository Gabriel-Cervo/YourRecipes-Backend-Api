const db = require('../db/connection');
const Recipes = require('../models/recipes');

module.exports = class RecipesController {
    async index(req, res){

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {}

        if (endIndex < Recipes.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        
        try {
            results.recipes = await Recipes.find().limit(limit).skip(startIndex).exec();
            res.json(results);
        } catch (err) {   
            res.status(500).json({ message: err.message });
        }
    }

    async createRecipe(req, res) {
        const { name, img, description, steps } = req.body;
        
        if (!name || !img || !description || !steps) return res.status(400).json({ message: 'Preencha todos os campos!' });

        try {
            await Recipes.create({ name, img, description, steps });
            res.send();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}