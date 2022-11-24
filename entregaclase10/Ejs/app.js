const express = require('express');

const productRouter = require('./routes/productos');
const app = express();

const server = app.listen(8080, () => console.log('Server up'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('make');
});

app.use('/productos', productRouter);
