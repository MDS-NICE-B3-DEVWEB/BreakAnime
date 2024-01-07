
const User = require('../models/userModel');

exports.getAll = async (req, res) => {
    try {
        // Code pour récupérer tous les utilisateurs depuis la base de données
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.log(error);
    }
}

exports.getOneById = async (req, res) => {  
    try {
        // Code pour récupérer un utilisateur depuis la base de données
        const user = await User.findById(req.params.id);
        return user;
    } catch (error) {
        console.log(error);
    }
}

// Méthode pour mettre à jour un utilisateur existant
 exports.updateUser = async(req, res) => {
    try {
        // Code pour mettre à jour un utilisateur dans la base de données
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur.' });
    }
}

// Méthode pour supprimer un utilisateur
exports.deleteUser = async(req, res) => {
    try {
        // Code pour supprimer un utilisateur de la base de données
        const user = await  User.findById(req.params.id);
        if(user) {
            await user.destroy();
        }
    } catch (error) {
        console.log(error);
    }
}