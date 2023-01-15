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
    await queryInterface.bulkInsert("Schedules", [
      {
        movie_sch_id: "1",
        auditorium_sch_id: "1",
        start_time: "21:00:00",
        end_time: "23:15:00",
        date: "2022-12-24",
      },
      {
        movie_sch_id: "2",
        auditorium_sch_id: "2",
        start_time: "12:00:00",
        end_time: "13:40:00",
        date: "2022-12-24",
      },
      {
        movie_sch_id: "3",
        auditorium_sch_id: "3",
        start_time: "15:00:00",
        end_time: "17:30:00",
        date: "2022-12-24",
      },
      {
        movie_sch_id: "4",
        auditorium_sch_id: "4",
        start_time: "18:00:00",
        end_time: "20:30:00",
        date: "2022-12-24",
      },
      {
        movie_sch_id: "5",
        auditorium_sch_id: "5",
        start_time: "18:00:00",
        end_time: "20:00:00",
        date: "2022-12-24",
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
    await queryInterface.bulkDelete("Schedules", null, {});
  },
};
