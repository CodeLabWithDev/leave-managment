"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // insert manager first so we get its ID
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin User",
          email: "admin@example.com",
          password: bcrypt.hashSync("P@ssw0rd", 10),
          role: "Admin",
          managerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Manager One",
          email: "manager@example.com",
          password: bcrypt.hashSync("P@ssw0rd", 10),
          role: "Manager",
          managerId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // get Manager's ID (you can use raw query or find)
    const [manager] = await queryInterface.sequelize.query(
      "SELECT id FROM Users WHERE email = 'manager@example.com' LIMIT 1;"
    );

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Employee One",
          email: "employee@example.com",
          password: bcrypt.hashSync("P@ssw0rd", 10),
          role: "Employee",
          managerId: manager[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
