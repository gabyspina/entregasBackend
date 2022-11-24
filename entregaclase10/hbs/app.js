const express = require('express');
const handlebars = require('express-handlebars');

const productRouter = require('./routes/productos');
const app = express();

const server = app.listen(8080, () => console.log('Server up'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
	res.render('make');
});

app.use('/productos', productRouter);
