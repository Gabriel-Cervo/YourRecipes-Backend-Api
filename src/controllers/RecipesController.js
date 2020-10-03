const db = require('../db/connection');
const Recipes = require('../models/recipes');
const aws = require('aws-sdk');
const s3 = new aws.S3();

module.exports = class RecipesController {
    async index(req, res){
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const userId = req.user._id;

        const results = {}

        Recipes.countDocuments({ userId }, (err, count) => {
            if (err) return res.status(500).json({ message: err.message });


            results.total = count;

            if (endIndex < count) {
                results.next = {
                    page: page + 1
                }
            }
        });

        if (startIndex > 0) {
            results.previous = {
                page: page - 1
            }
        }

        try {
            results.recipes = await Recipes.find({ userId }).limit(limit).skip(startIndex).exec();
            res.json(results);
        } catch (err) {   
            res.status(500).json({ message: err.message });
        }
    }

    async getRecipe(req, res) {
        const id = req.params.id;

        if (!id) return res.status(500).json({ message: 'Insira um id' });

        const recipe = await Recipes.findOne({ _id: id });
        
        return res.json(recipe);
    }

    async createRecipe(req, res) {
        const { name, description } = req.body;
        const { location: img, key: imgKey } = req.file;
        const steps = req.body.steps;
        const userId = req.user._id;

        if (!name || !description || !steps || !req.file) return res.status(400).json({ message: 'Preencha todos os campos!' });

        try {
            await Recipes.create({ userId, name, img, description, steps, imgKey });
            res.status(201).send();
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async updateRecipe(req, res) {
        const id = req.params.id;
        
        if (!id) return res.status(500).json({ message: 'Insira um id' });

        const oldDoc = await Recipes.findOne({ _id: id });

        const img = !req.file ? req.body.img : req.file.location;
        const imgKey = !req.file ? req.body.imgKey : req.file.key;

        const { name, description, steps } = req.body;
        
        if (!name || !description || !steps || !img || !imgKey) return res.status(400).json({ message: 'Preencha todos os campos!' });

        try {
            await Recipes.findOneAndUpdate({ _id: id }, { name, img, imgKey, description, steps }); 
           
            if (oldDoc.imgKey !== imgKey) {
                    s3.deleteObject({
                        Bucket: process.env.AWS_BUCKET,
                        Key: oldDoc.imgKey
                    }).promise();
            }
            
            return res.send();
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async deleteRecipe(req, res) {
        const id = req.params.id;

        if (!id) return res.status(400).json({ message: 'Insira um id!'});

        try {
            const post = await Recipes.findById(id);
            await post.remove();
            return res.send();
        } catch (err) {
            return res.status(500).json({ message: err.message});
        }
        
    }
}