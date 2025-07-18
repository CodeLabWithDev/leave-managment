const app = require('./app');
const db = require('./models');
const config = require('./config');
require('./jobs/resetBalances');
db.sequelize.sync().then(() => {
  app.listen(config.port, () => console.log('Server running'));
});
