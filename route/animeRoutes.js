const express = require('express');
const authMiddleware = require('../middlewares/authMiddlewares');
const AnimeService = require('../services/animeService');

const router = express.Router();


/**
 * @api {get} /animes Get All animes information
 * @apiName GetAnimes
 * @apiGroup Anime
 *
 */
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
/**
 * @api {get} /animes Get one anime information by id
 * @apiName GetAnimeById
 * @apiGroup Anime
 *
 */
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
/**
 * @api {post} /animes create anime
 * @apiName createAnime
 * @apiGroup Anime
 *  @apiParam {String} titre Titre de l'anime. 
 *  @apiParam {String} description Description de l'anime.
 *  @apiParam {String} image Image de l'anime.
 * @apiParam {Date} date_sortie Date de sortie de l'anime.
 * @apiParam {String} type Type de l'anime.
 * @apiParam {String} status Status de l'anime.
 * @apiParam {String} genre Genre de l'anime.
 * @apiParam {Integer} nb_episode Nombre d'épisode de l'anime.
 * @apiParam {Integer} nb_saison Nombre de saison de l'anime.
 * @apiParam {Integer} note Note de l'anime.
 * @apiParam {Integer} duree Durée de l'anime.
 */
router.post('/animes', authMiddleware.isAdmin, async (req, res) => {
  try {
    const anime = await AnimeService.createAnime(req.body);
    res.status(201).json(anime);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});


/**
 * @api {put} /animes mettre à jour les information d'un anime
 * @apiName modifyAnimeById
 * @apiGroup Anime
 *  @apiParam {String} titre Titre de l'anime. 
 *  @apiParam {String} description Description de l'anime.
 *  @apiParam {String} image Image de l'anime.
 * @apiParam {Date} date_sortie Date de sortie de l'anime.
 * @apiParam {String} type Type de l'anime.
 * @apiParam {String} status Status de l'anime.
 * @apiParam {String} genre Genre de l'anime.
 * @apiParam {Integer} nb_episode Nombre d'épisode de l'anime.
 * @apiParam {Integer} nb_saison Nombre de saison de l'anime.
 * @apiParam {Integer} note Note de l'anime.
 * @apiParam {Integer} duree Durée de l'anime.
 */
router.put('/animes/:id', authMiddleware.isAdmin, async (req, res) => {
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
/**
 * @api {delete} /animes delete anime by id
 * @apiName deleteAnimeById
 * @apiGroup Anime
 *
 */
router.delete('/animes/:id',authMiddleware.isAdmin, async (req, res) => {
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
