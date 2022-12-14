const fs = require('fs');

const pathFile = './productos.txt';

class Producto {
	constructor(title, price, thumbnail) {
		this.title = title;
		this.price = '$ ' + Number(price);
		this.thumbnail = thumbnail;
	}
}

let producto1 = new Producto(
	'tijera',
	200,
	'https://http2.mlstatic.com/D_NQ_NP_782391-MLA48591212214_122021-V.jpg'
);
let producto2 = new Producto(
	'Escuadra',
	300,
	'https://upload.wikimedia.org/wikipedia/commons/3/3c/Squadra_45.jpg'
);
let producto3 = new Producto(
	'Compas',
	50,
	'https://plantec.com.ar/wp-content/uploads/19111-Compas-Profesional-Metalico-Bronce-Plantec-min-1.jpg'
);

class Contenedor {
	save = async (prod) => {
		try {
			if (fs.existsSync(pathFile)) {
				// fs.appendFile
				let data = await fs.promises.readFile(pathFile, 'utf-8');
				let products = JSON.parse(data);
				let id = products[products.length - 1].id + 1;
				prod.id = id;
				products.push(prod);
				await fs.promises.writeFile(
					pathFile,
					JSON.stringify(products, null, 2)
				);
				return { status: 'Objeto creado', message: prod };
			} else {
				prod.id = 1;
				await fs.promises.writeFile(pathFile, JSON.stringify([prod], null, 2));
				return { status: 'Objeto creado', message: prod };
			}
		} catch (err) {
			return { status: 'error', message: err.message };
		}
	};

	getById = async (id) => {
		if (fs.existsSync(pathFile)) {
			let data = await fs.promises.readFile(pathFile, 'utf-8');
			let products = JSON.parse(data);
			let product = products.find((product) => product.id === id);
			if (product) return { status: 'Se encontro producto', message: product };
			return { status: 'error', message: 'Producto no entontrado' };
		} else {
			return { status: 'error', message: err.message };
		}
	};

	getAll = async () => {
		let data = await fs.promises.readFile(pathFile, 'utf-8');
		let products = JSON.parse(data);
		return {
			status: 'Productos encontrados',
			message: products,
		};
	};

	deleteById = async (id) => {
		let data = await fs.promises.readFile(pathFile, 'utf-8');
		let products = JSON.parse(data);
		let newProduct = products.filter((prod) => prod.id !== id);
		await fs.promises.writeFile(pathFile, JSON.stringify(newProduct, null, 2));
		return { status: 'Exitoso', message: 'Producto eliminado' };
	};

	deleteAll = async () => {
		await fs.promises.unlink(pathFile);
		return { status: 'Exitoso', message: 'Productos eliminados' };
	};
}

const contenedor = new Contenedor();

contenedor.save(producto1	).then((result) => console.log(result));

//contenedor.getById(1).then((result) => console.log(result));

//contenedor.getAll().then((result) => console.log(result));

//contenedor.deleteById(3).then((result) => console.log(result));

//contenedor.deleteAll().then((result) => console.log(result));
