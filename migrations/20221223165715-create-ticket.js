"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tickets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DECIMAL,
      },
      user_tk_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      seat_tk_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      auditorium_tk_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      movie_tk_id:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      sch_tk_id:{
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ticket_res_id:{
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable("Tickets");
  },
};
