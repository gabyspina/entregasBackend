let products = require('./prod.js');

class Manager {
	createProd = (producto) => {
		let id;
		if (products.length === 0) id = 1;
		else products[products.length - 1].id + 1;
		producto.price = parseInt(producto.price);
		producto = {
			id,
			...producto,
		};
		products.push(producto);
		return producto;
	};

	getAll = () => {
		return products;
	};
}

module.exports = Manager;
