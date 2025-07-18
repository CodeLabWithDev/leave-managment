const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config').development;
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
fs.readdirSync(__dirname).filter(file => file !== basename && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });
Object.keys(db).forEach(name => db[name].associate && db[name].associate(db));
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
