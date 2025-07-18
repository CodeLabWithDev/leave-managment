module.exports = (sequelize, DataTypes) => {
  const LeaveBalance = sequelize.define('LeaveBalance', { balance: DataTypes.INTEGER });
  LeaveBalance.associate = models => {
    LeaveBalance.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return LeaveBalance;
};
