// const Contenedor = require('./Contenedor');
const express = require('express');
const productRouter = require('./Routes/productos');

//const contenedor = new Contenedor();

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use('/api/productos', productRouter);

const server = app.listen(8080, () => console.log('Server Up'));
server.on('error', (error) => console.log(`Error en servidor ${error}`));
