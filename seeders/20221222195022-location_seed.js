"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Locations",
      [
        {
          street_name: "Gandijeva",
          city_name: "Beograd",
        },
        {
          street_name: "Bulevar Milutina Milankovica",
          city_name: "Beograd",
        },
        {
          street_name: "Dunavska",
          city_name: "Novi Sad",
        },
        {
          street_name: "Zemunska",
          city_name: "Nis",
        },
        {
          street_name: "Bulevar mladosti",
          city_name: "Palic",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Locations", null, {});
  },
};
