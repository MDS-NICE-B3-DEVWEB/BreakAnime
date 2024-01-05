const Anime = require('../models/Anime');

class AnimeService {
    
    // Récupérer tous les animes
    static async getAllAnimes() {
        try {
            return await Anime.findAll();
        } catch (error) {
            throw new Error('Erreur lors de la récupération des animes');
        }
    }

    // Récupérer un anime par son ID
    static async getAnimeById(id) {
        try {
            const anime = await Anime.findByPk(id);
            if (!anime) {
                throw new Error('Anime non trouvé');
            }
            return anime;
        } catch (error) {
            throw new Error('Erreur lors de la récupération de l\'anime');
        }
    }

    // Créer un nouvel anime
    static async createAnime(data) {
        try {
            return await Anime.create(data);
        } catch (error) {
            throw new Error('Erreur lors de la création de l\'anime');
        }
    }

    // Mettre à jour un anime existant
    static async updateAnime(id, data) {
        try {
            const anime = await Anime.findByPk(id);
            if (!anime) {
                throw new Error('Anime non trouvé');
            }
            await anime.update(data);
            return anime;
        } catch (error) {
            throw new Error('Erreur lors de la mise à jour de l\'anime');
        }
    }

    // Supprimer un anime
    static async deleteAnime(id) {
        try {
            const anime = await Anime.findByPk(id);
            if (!anime) {
                throw new Error('Anime non trouvé');
            }
        } catch (error) {
            throw new Error('Erreur lors de la suppression de l\'anime');
        }
    }
}