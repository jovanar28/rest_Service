"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reservations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_res_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      seat_res_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      auditorium_res_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      movie_res_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      schedule_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reservations");
  },
};
