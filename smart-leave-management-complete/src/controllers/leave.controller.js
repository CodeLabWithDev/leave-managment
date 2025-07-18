const db = require('../models');
exports.apply = async (req, res) => {
  const leave = await db.Leave.create({ ...req.body, userId: req.user.id, status: 'Pending' });
  res.json(leave);
};
exports.cancel = async (req, res) => {
  await db.Leave.destroy({ where: { id: req.params.id, userId: req.user.id } });
  res.json({ message: 'Cancelled' });
};
