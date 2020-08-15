const mongoose = require('mongoose');
const Recipes = require('../models/recipes');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const db = mongoose.connection;

db.once('open', async () => {
    console.log('Connected to the database');
})

module.exports = db;