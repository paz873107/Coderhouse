"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var http = _interopRequireWildcard(require("http"));

var _products = require("./routes/products");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = 8080;
var app = (0, _express["default"])();

var layoutDirPath = _path["default"].resolve(__dirname, '../views/layouts');

var defaultLayerPth = _path["default"].resolve(__dirname, '../views/main.hbs');

var server = http.Server(app);
(0, _products.ioServer)(server); // Setear el uso del engine de handlebars

app.set('view engine', 'hbs'); // Configuraciones de handlebars como la extension y los directorios del layout y default

app.engine('hbs', (0, _expressHandlebars["default"])({
  layoutsDir: layoutDirPath,
  defaultLayout: defaultLayerPth,
  extname: 'hbs'
}));

var publicPath = _path["default"].resolve(__dirname, '../public');

app.use(_express["default"]["static"](publicPath)); // Indica que el servidor esta levantado y corriendo en puerto especificado

server.listen(port, function () {
  console.log("Server running in port:  ".concat(port));
}); // Indicar un error que de el servidor.

server.on('error', function (err) {
  console.error("There was an error: ".concat(err));
});
app.set('json spaces', 2); // Hace una indentacion de la respuesta JSON en el navegador

app.use(_express["default"].json()); // Indica que el body viene como JSON

app.use(_express["default"].urlencoded({
  extended: true
})); // Indica que el body puede tener un informacion como no string
// Router de la API Productos

app.use('/api', _products.router);