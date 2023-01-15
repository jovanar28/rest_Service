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
    await queryInterface.bulkInsert("Payments", [
      {
        user_pay_id: "1",
        seat_pay_id: "2",
        auditorium_pay_id: "1",
        movie_pay_id: "1",
        sch_pay_id: "1",
        res_pay_id: "1",
        amount: "10.0",
      },
      {
        user_pay_id: "2",
        seat_pay_id: "3",
        auditorium_pay_id: "2",
        movie_pay_id: "2",
        sch_pay_id: "2",
        res_pay_id: "2",
        amount: "20.0",
      },
      {
        user_pay_id: "1",
        seat_pay_id: "2",
        auditorium_pay_id: "2",
        movie_pay_id: "2",
        sch_pay_id: "1",
        res_pay_id: "3",
        amount: "10.0",
      },
      {
        user_pay_id: "4",
        seat_pay_id: "4",
        auditorium_pay_id: "4",
        movie_pay_id: "4",
        sch_pay_id: "4",
        res_pay_id: "4",
        amount: "40.0",
      },
      {
        user_pay_id: "5",
        seat_pay_id: "5",
        auditorium_pay_id: "5",
        movie_pay_id: "5",
        sch_pay_id: "5",
        res_pay_id: "5",
        amount: "10.0",
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
    await queryInterface.bulkDelete("Payments", null, {});
  },
};
