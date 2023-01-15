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
    await queryInterface.bulkInsert("Tickets", [
      {
        ticket_res_id: "1",
        price: "10.0",
        user_tk_id: "1",
        seat_tk_id: "2",
        auditorium_tk_id: "1",
        movie_tk_id: "1",
        sch_tk_id: "1",
      },
      {
        ticket_res_id: "2",
        price: "10.0",
        user_tk_id: "2",
        seat_tk_id: "3",
        auditorium_tk_id: "2",
        movie_tk_id: "2",
        sch_tk_id: "2",
      },
      {
        ticket_res_id: "3",
        price: "10.0",
        user_tk_id: "1",
        seat_tk_id: "2",
        auditorium_tk_id: "2",
        movie_tk_id: "2",
        sch_tk_id: "1",
      },
      {
        ticket_res_id: "4",
        price: "10.0",
        user_tk_id: "4",
        seat_tk_id: "4",
        auditorium_tk_id: "4",
        movie_tk_id: "4",
        sch_tk_id: "4",
      },
      {
        ticket_res_id: "5",
        price: "10.0",
        user_tk_id: "5",
        seat_tk_id: "5",
        auditorium_tk_id: "5",
        movie_tk_id: "5",
        sch_tk_id: "5",
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
    await queryInterface.bulkDelete("Tickets", null, {});
  },
};
