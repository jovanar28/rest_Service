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
    await queryInterface.bulkInsert("Reservations", [
      {
        user_res_id: "1",
        seat_res_id: "2",
        auditorium_res_id: "1",
        movie_res_id: "1",
        schedule_id: "1",
      },
      {
        user_res_id: "2",
        seat_res_id: "3",
        auditorium_res_id: "2",
        movie_res_id: "2",
        schedule_id: "2",
      },
      {
        user_res_id: "1",
        seat_res_id: "2",
        auditorium_res_id: "2",
        movie_res_id: "2",
        schedule_id: "1",
      },
      {
        user_res_id: "4",
        seat_res_id: "4",
        auditorium_res_id: "4",
        movie_res_id: "4",
        schedule_id: "4",
      },
      {
        user_res_id: "5",
        seat_res_id: "5",
        auditorium_res_id: "5",
        movie_res_id: "5",
        schedule_id: "5",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */ queryInterface.bulkDelete("Reservations", null, {});
    awa;
  },
};
