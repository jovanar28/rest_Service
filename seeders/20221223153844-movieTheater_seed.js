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
    await queryInterface.bulkInsert("Movietheaters", [
      {
        name: "Bioskop Delta",
        location_id: 1,
        manager_id: 1,
      },
      {
        name: "Bioskop Fontana",
        location_id: 2,
        manager_id: 2,
      },
      {
        name: "Bioskop Promenada",
        location_id: 3,
        manager_id: 3,
      },
      {
        name: "Bioskop Nis",
        location_id: 4,
        manager_id: 4,
      },
      {
        name: "Bioskop Mladost",

        location_id: 5,
        manager_id: 5,
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
    await queryInterface.bulkDelete("Movetheaters", null, {});
  },
};
