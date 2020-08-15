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
            res.statusCode(500).json({ message: err.message });
        }
    }
}