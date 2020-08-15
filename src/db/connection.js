const mongoose = require('mongoose');
const Recipes = require('../models/recipes');

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.once('open', async () => {
    if (await Recipes.countDocuments().exec() > 0) return;


    // default config para testes
    Promise.all([
        Recipes.create({
            name: 'Marmelada',
            img: 'https://avatars3.githubusercontent.com/u/56052678?s=460&u=92c7b9e7ebac7c4a7caee2cd2b67165b460678dd&v=4',
            description: 'Marmeladona basica',
            steps: ['vai na cozinha', 'faz a marmelada', 'ta pronto']
        }),
        Recipes.create({
            name: 'batata',
            img: 'https://avatars3.githubusercontent.com/u/56052678?s=460&u=92c7b9e7ebac7c4a7caee2cd2b67165b460678dd&v=4',
            description: 'batatona basica',
            steps: ['vai na cozinha', 'faz a bata', 'ta pronto']
        }),
        Recipes.create({
            name: 'Frango',
            img: 'https://avatars3.githubusercontent.com/u/56052678?s=460&u=92c7b9e7ebac7c4a7caee2cd2b67165b460678dd&v=4',
            description: 'frangao basica',
            steps: ['vai na cozinha', 'faz o frango', 'ta pronto']
        }),
        Recipes.create({
            name: 'Jiboia',
            img: 'https://avatars3.githubusercontent.com/u/56052678?s=460&u=92c7b9e7ebac7c4a7caee2cd2b67165b460678dd&v=4',
            description: 'Jiboiona frita basica',
            steps: ['vai na cozinha', 'faz a jiboia', 'ta pronto']
        }),
        Recipes.create({
            name: 'cacau',
            img: 'https://avatars3.githubusercontent.com/u/56052678?s=460&u=92c7b9e7ebac7c4a7caee2cd2b67165b460678dd&v=4',
            description: 'Cacau basico',
            steps: ['vai na cozinha', 'faz o cacau', 'ta pronto']
        })
    ]).then(() => console.log('Recipes added.'))
})

module.exports = db;