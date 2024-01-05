const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Anime = sequelize.define('Anime', {
  titre: { type: DataTypes.STRING, allowNull: false, unique: true},
  description: {type: DataTypes.TEXT, allowNull: true},
  genre: {type: DataTypes.STRING, allowNull: true},
  nb_episode: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
  nb_saison: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
  date_sortie: {type: DataTypes.DATE, allowNull: true},
  duree: {type: DataTypes.DateTime, allowNull: true},
  image: {type: DataTypes.STRING, allowNull: true},
  note_moyenne: {type: DataTypes.FLOAT, allowNull: true},
  status: {type: DataTypes.STRING, allowNull: true, defaultValue: 'en cours'}
});

module.exports = Anime;