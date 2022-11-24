const express = require('express');
const router = express.Router();

const Manager = require('../manager.js');
const manager = new Manager();

router.get('/', (req, res) => {
	res.render('show', {
		productos: manager.getAll(),
	});
});

router.post('/', (req, res) => {
	manager.createProd(req.body);
	res.redirect('/');
});

module.exports = router;
