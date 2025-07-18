const cron = require('node-cron');
const db = require('../models');
const config = require('../config');
cron.schedule('0 0 1 1 *', async () => {
  await db.LeaveBalance.update({ balance: config.defaultLeaveBalance }, { where: {} });
});
