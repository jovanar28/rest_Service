"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Schedule }) {
      this.hasMany(Schedule, { foreignKey: "movie_sch_id" });
    }
  }
  Movie.init(
    {
      tittle: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      genre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
