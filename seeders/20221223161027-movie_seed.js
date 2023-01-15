"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Movies", [
      {
        tittle: "Dead Poets Society",
        duration: "135",
        genre: "Drama",
      },
      {
        tittle: "Pretty Woman",
        duration: "100",
        genre: "Drama",
      },
      {
        tittle: "Good Will Hunting",
        duration: "150",
        genre: "Drama",
      },
      {
        tittle: "The Godfather",
        duration: "150",
        genre: "Crime",
      },
      {
        tittle: "Eyes wide shut",
        duration: "120",
        genre: "Thriller",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Movies", null, {});
  },
};
