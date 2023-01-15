"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      user_pay_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      seat_pay_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      auditorium_pay_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      movie_pay_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      sch_pay_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      res_pay_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable("Payments");
  },
};
