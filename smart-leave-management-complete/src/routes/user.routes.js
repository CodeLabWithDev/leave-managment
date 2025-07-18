const r = require("express").Router();
const c = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth");

r.post("/", c.create);
r.get("/", authMiddleware, c.list);
r.get("/managers", c.managers);
r.put("/:id", c.update);
r.delete("/:id", c.remove);

module.exports = r;
