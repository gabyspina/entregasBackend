const express = require('express');
const handlebars = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = HttpServer(app);
const io = new IOServer(httpServer);

const PORT = 8080;
httpServer.listen(PORT, () => {
	console.log(`Server up on port ${PORT}`);
});

const mensajes = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
	res.render('make');
});

app.get('/', (req, res) => {
	res.render('show');
});

app.get('/', (req, res) => {
	res.render('messages');
});

io.on('conection', (socket) => {
	console.log('new user');
	socket.emit('messages', mensajes);

	socket.on('new-message', (data) => {
		mensajes.push(data);

		io.sockets.emit('messages', mensajes);
	});
});
