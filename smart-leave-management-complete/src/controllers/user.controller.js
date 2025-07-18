const bcrypt = require("bcryptjs");
const db = require("../models");

// Create user
exports.create = async (req, res) => {
  try {
    if (req.body.role !== "Employee") {
      req.body.managerId = null;
    }

    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const user = await db.User.create(req.body);

    // fetch full user with manager info
    const fullUser = await db.User.findByPk(user.id, {
      attributes: ["id", "name", "email", "role", "managerId"],
      include: [
        {
          model: db.User,
          as: "manager",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.json(fullUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create user" });
  }
};

// Get all users
exports.list = async (req, res) => {
  try {
    const loggedInUserId = req.user.id; // this comes from your auth middleware after verifying JWT

    const users = await db.User.findAll({
      where: {
        id: { [db.Sequelize.Op.ne]: loggedInUserId }, // exclude current user
      },
      attributes: ["id", "name", "email", "role", "managerId"],
      include: [
        {
          model: db.User,
          as: "manager",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Get all managers
exports.managers = async (req, res) => {
  try {
    const managers = await db.User.findAll({
      where: { role: "Manager" },
      attributes: ["id", "name", "email"],
    });
    res.json(managers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch managers" });
  }
};

// Update user
exports.update = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updateData = { ...req.body };

    // Only hash password if provided; else keep existing
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      updateData.password = user.password; // keep existing hashed password
    }

    // If role isn't Employee, clear managerId
    if (updateData.role && updateData.role !== "Employee") {
      updateData.managerId = null;
    }

    await user.update(updateData);

    // Fetch updated user with manager info
    const fullUser = await db.User.findByPk(user.id, {
      attributes: ["id", "name", "email", "role", "managerId"],
      include: [
        {
          model: db.User,
          as: "manager",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    res.json(fullUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Remove user
exports.remove = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
