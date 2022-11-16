const express = require('express');

const fs = require('fs');

//Servidor

const app = express();
const server = app.listen(8080, () => {
	console.log('servidor escuchando en 8080');
});

server.on('error', (error) => console.log('Hubo un error'));

// Ruta

const pathFile = './productos.txt';

// Clases

class Producto {
	constructor(title, price, thumbnail) {
		this.title = title;
		this.price = '$ ' + Number(price);
		this.thumbnail = thumbnail;
	}
}

//Productos
let producto1 = new Producto(
	'Tijera',
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

// Clase

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

	getAll = async () => {
		let data = await fs.promises.readFile(pathFile, 'utf-8');
		let products = JSON.parse(data);
		let nombres = products.map((nombres) => nombres.title);
		return `<h1 style= 'color:red'> Los productos son ${nombres} </h1>`;
	};

	getRandom = async () => {
		let data = await fs.promises.readFile(pathFile, 'utf-8');
		let products = JSON.parse(data);
		let nombres = products.map((nombres) => nombres.title);

		return `<h1 style= 'color: blue'>El objeto al azar es: ${
			nombres[Math.floor(Math.random() * nombres.length)]
		}</h1>`;
	};
}

const contenedor = new Contenedor();

//contenedor.save(producto3).then((result) => console.log(result));

app.get('/productos', (req, res) => {
	contenedor.getAll().then((result) => res.send(result));
});

app.get('/productoRandom', (req, res) => {
	contenedor.getRandom().then((result) => res.send(result));
});
