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
      "Users",
      [
        {
          first_name: "Stanoje",
          last_name: "Radic",
          username: "sradic",
          password: "jradic",
          credit_card_num: "123",
          role_id: 3          
        },
        {
          first_name: "Mileva",
          last_name: "Stanisic",
          username: "mstanisic",
          password: "mstanica",
          credit_card_num: "1234",
          role_id:3
         
        },
        {
          first_name: "Rosa",
          last_name: "Milic",
          username: "rmilic",
          password: "jdiasd",
          credit_card_num: "1123",
          role_id:3
         
        },
        {
          first_name: "Ljubinka",
          last_name: "Bobic",
          username: "ljbobic",
          password: "jdjaksndkj",
          credit_card_num: "2123",
          role_id:3
         
        },
        {
          first_name: "Dragutin",
          last_name: "Jovic",
          username: "djovic",
          password: "jdjnakjs",
          credit_card_num: "3123",
          role_id:3
          
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

    await queryInterface.bulkDelete("Users", null, {});
  },
};
