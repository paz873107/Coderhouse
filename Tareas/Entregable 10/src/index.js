import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import Productos from './routes/products';

const port = 8080;
const app = express();
const layoutDirPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/main.hbs');

// Setear el uso del engine de handlebars
app.set('view engine', 'hbs');

// Configuraciones de handlebars como la extension y los directorios del layout y default
app.engine(
	'hbs',
	handlebars({
		layoutsDir: layoutDirPath,
		defaultLayout: defaultLayerPth,
		extname: 'hbs',
	})
);

// Indica que el servidor esta levantado y corriendo en puerto especificado
const server = app.listen(port, () => {
	console.log(`Server running in port:  ${port}`);
});

// Indicar un error que de el servidor.
server.on('error', (err) => {
	console.error(`There was an error: ${err}`);
});

app.set('json spaces', 2); // Hace una indentacion de la respuesta JSON en el navegador

app.use(express.json()); // Indica que el body viene como JSON
app.use(express.urlencoded({ extended: true })); // Indica que el body puede tener un informacion como no string

// Router de la API Productos
app.use('/api', Productos);