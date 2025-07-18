module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    managerId: DataTypes.INTEGER,
  });
  User.associate = (models) => {
    User.belongsTo(models.User, { as: "manager", foreignKey: "managerId" });
    User.hasMany(models.Leave, { foreignKey: "userId" });
    User.hasOne(models.LeaveBalance, { foreignKey: "userId" });
  };
  return User;
};
