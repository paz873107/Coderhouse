"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _api = _interopRequireDefault(require("./routes/api.js"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _data = require("./modules/data.js");

var http = _interopRequireWildcard(require("http"));

var _websocket = require("./services/websocket.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** Configuración para EXPRESS */
var app = (0, _express["default"])();
var puerto = 8080; //Iniciando la carpeta public

var publicPath = _path["default"].resolve(__dirname, './../public');

app.use(_express["default"]["static"](publicPath)); // Módulos usados para aceptar el método post con JSON o urlencoded

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
/** Configurando Handlebars */
//Estableciendo los path de los views para Handlebars

var layoutDirPath = _path["default"].resolve(__dirname, '../views/layouts');

var defaultLayerPth = _path["default"].resolve(__dirname, '../views/layouts/index.hbs');

var partialDirPath = _path["default"].resolve(__dirname, '../views/partials'); //Configurando el engine con Handlerbars y los path personalizados


app.set('view engine', 'hbs');
app.engine('hbs', (0, _expressHandlebars["default"])({
  layoutsDir: layoutDirPath,
  extname: 'hbs',
  defaultLayout: defaultLayerPth,
  partialsDir: partialDirPath
}));
/**
 * INICIALIZACION DEL SERVER y SERVICIOS
 */
//Creando el objeto http ára usar websocket

var myServer = http.Server(app); //Init SocketIo Server

(0, _websocket.initWsServer)(myServer); //El server se inicia escuchando

myServer.listen(puerto, function () {
  return console.log('Server up en puerto', puerto);
});
/**
 * DEFINICION DE LOS ROUTERS
 */

app.use('/api', _api["default"]); // Render de la pagina vista

app.get('/', function (req, res) {
  var data = {
    mostrarForm: true,
    mostrarList: true,
    productos: _data.productos
  };
  res.render('main', data);
}); // Render de la pagina vista

app.get('/productos/vista', function (req, res) {
  var data = {
    mostrarVista: true,
    productos: _data.productos
  };
  res.render('main', data);
});