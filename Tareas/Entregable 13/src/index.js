import express from 'express';
import path from 'path';
import routerApi from './routes/api.js';
import handlebars from 'express-handlebars';
import { productos } from './modules/data.js';
import * as http from 'http';
import { initWsServer } from './services/websocket.js';

/** Configuración para EXPRESS */
const app = express();
const puerto = 8080;

//Iniciando la carpeta public
const publicPath = path.resolve(__dirname, './../public');
app.use(express.static(publicPath));

// Módulos usados para aceptar el método post con JSON o urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Configurando Handlebars */
//Estableciendo los path de los views para Handlebars
const layoutDirPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/layouts/index.hbs');
const partialDirPath = path.resolve(__dirname, '../views/partials');

//Configurando el engine con Handlerbars y los path personalizados
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutDirPath,
    extname: 'hbs',
    defaultLayout: defaultLayerPth,
    partialsDir: partialDirPath,
  })
);

/**
 * INICIALIZACION DEL SERVER y SERVICIOS
 */
//Creando el objeto http ára usar websocket
const myServer = http.Server(app);

//Init SocketIo Server
initWsServer(myServer);

//El server se inicia escuchando
myServer.listen(puerto, () => console.log('Server up en puerto', puerto));

/**
 * DEFINICION DE LOS ROUTERS
 */
app.use('/api', routerApi);

// Render de la pagina vista
app.get('/', (req, res) => {
  const data = { mostrarForm: true, mostrarList: true, productos };
  res.render('main', data);
});

// Render de la pagina vista
app.get('/productos/vista', (req, res) => {
  const data = { mostrarVista: true, productos };
  res.render('main', data);
});