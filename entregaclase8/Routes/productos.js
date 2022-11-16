const express = require('express');

const router = express.Router();

const productos = [];

// /api/productos
// get

router.get('/', (req, res) => {
	res.send({ productos });
});

router.post('/', (req, res) => {
	productos.push(req.body);
	res.json({ ok: 'ok' });
});

module.exports = router;
