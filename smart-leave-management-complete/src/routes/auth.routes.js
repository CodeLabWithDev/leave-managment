const r = require("express").Router();
const c = require("../controllers/auth.controller");
r.post("/login", c.login);
r.get("/me", c.me);
module.exports = r;
