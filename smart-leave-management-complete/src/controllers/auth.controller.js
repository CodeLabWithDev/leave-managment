const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const config = require("../config");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await db.User.findOne({ where: { email } });
  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid email or password" });

  // create token
  const token = jwt.sign({ id: user.id, role: user.role }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  let manager = null;
  if (user.role === "Employee" && user.managerId) {
    manager = await db.User.findByPk(user.managerId, {
      attributes: ["id", "name", "email", "role"],
    });
  }

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      manager: manager, // null if not employee
    },
  });
};

exports.me = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    const user = await db.User.findByPk(decoded.id, {
      attributes: ["id", "name", "email", "role", "managerId"],
    });

    let manager = null;
    if (user.role === "Employee" && user.managerId) {
      manager = await db.User.findByPk(user.managerId, {
        attributes: ["id", "name", "email", "role"],
      });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        manager,
      },
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
