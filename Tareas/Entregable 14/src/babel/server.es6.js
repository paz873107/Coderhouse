import express from 'express';
import * as http from 'http';
import { router, ioServer } from './routes/allroutes';

const port = process.env.PORT || 8080;
const app = express();
const server = http.Server(app);

ioServer(server);

// Indica que el servidor esta levantado y corriendo en puerto especificado
server.listen(port, () => {
	console.log(`Server running in port:  ${port}`);
});

// Indicar un error que de el servidor.
server.on('error', (err) => {
	console.error(`There was an error: ${err}`);
});

app.set('json spaces', 2); // Hace una indentacion de la respuesta JSON en el navegador

app.use(express.json()); // Indica que el body viene como JSON
app.use(express.urlencoded({ extended: true })); // Indica que el body puede tener un informacion como no string

// Mensaje de bienvenida
app.get('/', (req, res) => {
	res.json({
		message: 'Hi, you are connected to the api',
	});
});

// Router de la API Productos
app.use('/api', router);