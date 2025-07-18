require('dotenv').config();
module.exports = {
  port: process.env.PORT || 5000,
  jwt: { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES },
  roles: { ADMIN: 'Admin', MANAGER: 'Manager', EMPLOYEE: 'Employee' },
  defaultLeaveBalance: 20
};
