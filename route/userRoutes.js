const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddlewares'); 

const router = express.Router();

router.get('/users', authMiddleware.isAdmin, async (req, res) => {
    try {
        const users = await userController.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs.', error: error.message});
    }  
});

router.get('/user/:id', authMiddleware.isAdmin, async (req, res) => { 
    try {
        const user = await userController.getOneById(req.params.id, res);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'utilisateur.', error: error.message });
    }

});

router.put('/user/:id', authMiddleware.isAdminOrIdRelatedToUser, async (req, res) => {
    try {
        const updatedUser = await userController.updateUser(req.params.id, req.body, res);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la mise à jour de l\'utilisateur.', error: error.message });
    }
});

router.delete('/user/:id', authMiddleware.isAdminOrIdRelatedToUser, async (req, res) => { 
    try {
        await userController.deleteUser(req.params.id, res);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur.', error: error.message });
    }
});

module.exports = router;