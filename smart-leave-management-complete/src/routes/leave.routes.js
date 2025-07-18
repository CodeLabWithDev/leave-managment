const r = require('express').Router();
const c = require('../controllers/leave.controller');
r.post('/', c.apply);
r.delete('/:id', c.cancel);
module.exports = r;
