const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddlewares'); 

const router = express.Router();

router.get('/users',authMiddleware.authenticateToken, authMiddleware.isAdmin, async (req, res) => {
    try {
        const users = await userController.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs.' 
    });
    }  
});

router.get('/user/:id',authMiddleware.authenticateToken, authMiddleware.isAdmin, async (req, res) => { 
    try {
        const user = await userController.getOneById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de l\'utilisateur.' });
    }

});

// router.put('/user/:id', authMiddleware.authenticateToken, authMiddleware.isAdmin || authMiddleware.isIdRelatedToUser, userController.updateOneById);
router.delete('/user/:id', authMiddleware.authenticateToken, authMiddleware.isAdmin, async (req, res) => { 
    try {
        await userController.deleteOneById(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur.' });
    }
});

module.exports = router;