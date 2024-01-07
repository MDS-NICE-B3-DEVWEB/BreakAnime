const Anime = require('../models/animeModel');

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
                const error = new Error('Anime non trouvé');
                error.name = 'NOT_FOUND';
                throw error;
            }
            return anime;
        } catch (error) {
            throw error;
        }
    }

    // Créer un nouvel anime
    static async createAnime(data) { 
        try {
            data.date_sortie = new Date(data.date_sortie).toISOString();
            return await Anime.create(data);
        } catch (error) {
            throw error;
        }
    }

    // Mettre à jour un anime existant
    static async updateAnime(id, data) {
        try {
            const anime = await Anime.findByPk(id);
            if (!anime) {
                const error = new Error('Anime non trouvé');
                error.name = 'NOT_FOUND';
                throw error;
            }
            await anime.update(data);
            return anime;
        } catch (error) {
            throw error;
        }
    }

    // Supprimer un anime
    static async deleteAnime(id) {
        try {
            const anime = await Anime.findByPk(id);
            if (!anime) {
                const error = new Error('Anime non trouvé');
                error.name = 'NOT_FOUND';
                throw error;
            } else {
                anime.destroy();
            }
        } catch (error) {
            throw error;
        }        
    }
}

module.exports = AnimeService;