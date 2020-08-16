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
        const { name, description, steps } = req.body;
        const { location: img, key: imgKey } = req.file;

        if (!name || !description || !steps || !req.file) return res.status(400).json({ message: 'Preencha todos os campos!' });

        try {
            await Recipes.create({ name, img, description, steps, imgKey });
            res.send();
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

        if (!id) return res.status(500).json({ message: 'Documento inválido'});

        try {
            const post = await Recipes.findById(id);
            await post.remove();
            return res.send();
        } catch (err) {
            return res.status(500).json({ message: err.message});
        }
        
    }
}