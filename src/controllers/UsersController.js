const db = require('../db/connection');
const Users = require('../models/users');
const bcrypt = require('bcrypt');

module.exports = class UsersController {
    async register(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).json({ message: 'Preencha todos os campos!' });

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const user = { name, email, password: hashedPassword }
            
            await Users.create(user);
            
            res.send();
        } catch(err) {
            return res.status(500).send();
        }
    }
    
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: 'Preencha todos os campos!' });

        const user = await Users.findOne({ email }).exec();

        if (!user) return res.status(400).json({ message: 'Email não encontrado' })

        try {
            if (await bcrypt.compare(password, user.password)) {
                res.send();
            } else {
                return res.status(400).json({ message: 'Senha incorreta' })
            }
        } catch (err) {
            return res.status(500).send();
        }

    }
}