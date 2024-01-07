const express = require('express');
const authMiddleware = require('../middlewares/authMiddlewares');
const AnimeService = require('../services/animeService');

const router = express.Router();

// Récupérer tous les animes
router.get('/animes', async (req, res) => {
  try {
    const animes = await AnimeService.getAllAnimes();
    res.status(200).json(animes);
  } catch (error) {
    if(error.name = 'NOT_FOUND') {
      res.status(404).json({ message: error.message });  
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Récupérer un anime par son ID
router.get('/animes/:id', async (req, res) => {
  try {
    const anime = await AnimeService.getAnimeById(req.params.id);
    res.status(200).json(anime);
  } catch (error) {
    if(error.name = 'NOT_FOUND') {
      res.status(404).json({ message: error.message });  
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Créer un nouvel anime
router.post('/animes', authMiddleware.authenticateToken, async (req, res) => {
  try {
    const anime = await AnimeService.createAnime(req.body);
    res.status(201).json(anime);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Mettre à jour un anime
router.put('/animes/:id', authMiddleware.authenticateToken, async (req, res) => {
  try {
    const anime = await AnimeService.updateAnime(req.params.id, req.body);
    res.status(200).json(anime);
  } catch (error) {
    if(error.name = 'NOT_FOUND') {
      res.status(404).json({ message: error.message });  
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Supprimer un anime
router.delete('/animes/:id',authMiddleware.authenticateToken, async (req, res) => {
  try {
    await AnimeService.deleteAnime(req.params.id);
    res.status(204).send(); // Pas de contenu à renvoyer après suppression
  } catch (error) {
    if(error.name = 'NOT_FOUND') {
      res.status(404).json({ message: error.message });  
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

module.exports = router;
