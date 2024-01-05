const Anime = require('../models/Anime');

// Afficher tous les animes
exports.getAllAnimes = async (req, res) => {
  try {
    const animes = await Anime.findAll();
    res.status(200).json(animes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des animes', error: error.message });
  }
};

// Afficher un anime spécifique par son ID
exports.getAnimeById = async (req, res) => {
  try {
    const anime = await Anime.findByPk(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime non trouvé' });
    }
    res.status(200).json(anime);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'anime', error: error.message });
  }
};

// Créer un nouvel anime
exports.createAnime = async (req, res) => {
  try {
    const anime = await Anime.create(req.body);
    res.status(201).json(anime);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'anime', error: error.message });
  }
};

// Mettre à jour un anime existant
exports.updateAnime = async (req, res) => {
  try {
    const anime = await Anime.findByPk(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime non trouvé' });
    }
    await anime.update(req.body);
    res.status(200).json(anime);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'anime', error: error.message });
  }
};

// Supprimer un anime
exports.deleteAnime = async (req, res) => {
  try {
    const anime = await Anime.findByPk(req.params.id);
    if (!anime) {
      return res.status(404).json({ message: 'Anime non trouvé' });
    }
    await anime.destroy();
    res.status(204).send(); // Pas de contenu à renvoyer après suppression
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'anime', error: error.message });
  }
};
