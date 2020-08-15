const db = require('../db/connection');
const Users = require('../models/users');

module.exports = class UsersController {
    async register(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(500).json({ message: 'Preencha todos os campos!' });
    }
}