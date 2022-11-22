//Server
const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => console.log(`Server up on ${PORT}`));

//Router
const { Router } = require('express');
const router = express.Router;
const productRouter = new Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/productos', productRouter);

const productos = [];

productRouter.get('/', (req, res) => {
	res.send(productos);
});

productRouter.get('/:id', (req, res) => {
	let id = req.params.id;
	id = parseInt(id);
	const prod = productos.find((res) => res.id == id);
	if (!prod) {
		res.json(`Producto ${id} no encontrado`);
	} else {
		res.json(prod);
	}
});

productRouter.post('/', (req, res) => {
	const products = productos.length;
	const id = products + 1;
	productos.push({ ...req.body, ...{ id: id } });
	res.json({ id: id });
});

productRouter.put('/:id', (req, res) => {
	let id = req.params.id;
	const prod = productos.find((res) => res.id == id);
	const producto = productos.splice(parseInt(id - 1), 1);
	productos.push({ ...req.body, ...{ id: id } });
	res.json({ old: prod, new: producto });
});

productRouter.delete('/:id', (req, res) => {
	let id = req.params.id;
	const prod = productos.filter((res) => res.id !== id);
	console.log(prod);
	const producto = productos.splice(parseInt(id - 1), 1);
	productos.push({ ...req.body, ...{ id: id } });
	res.json({ producto });
});
