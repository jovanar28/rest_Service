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
    await queryInterface.bulkInsert(
      "Managers",
      [
        {
          first_name: "Donna",
          last_name: "Puzic",
          username: "dpuzic",
          password: "fjf",
        },
        {
          first_name: "Dusan",
          last_name: "Lazic",
          username: "dlazic",
          password: "fmaskf",
        },
        {
          first_name: "Marko",
          last_name: "Santic",
          username: "dlazic",
          password: "fmaskf",
        },
        {
          first_name: "Srdjan",
          last_name: "Lakic",
          username: "dlazic",
          password: "fmaskf",
        },
        {
          first_name: "Anita",
          last_name: "Maric",
          username: "dlazic",
          password: "fmaskf",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Managers", null, {});
  },
};
