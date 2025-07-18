module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define('Leave', {
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    status: DataTypes.STRING
  });
  Leave.associate = models => {
    Leave.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Leave;
};
