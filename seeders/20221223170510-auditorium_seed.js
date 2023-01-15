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
    await queryInterface.bulkInsert("Auditoria", [
      {
        movietheater_id: "1",
        number_of_seats: "5",
      },
      {
        movietheater_id: "2",
        number_of_seats: "15",
      },
      {
        movietheater_id: "3",
        number_of_seats: "20",
      },
      {
        movietheater_id: "4",
        number_of_seats: "10",
      },
      {
        movietheater_id: "5",
        number_of_seats: "12",
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
    await queryInterface.bulkDelete("Auditoria", null, {});
  },
};
