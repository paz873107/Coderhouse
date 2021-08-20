"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guardarFromForm = guardarFromForm;
exports.guardarNewMessage = guardarNewMessage;

var _producto = _interopRequireDefault(require("../class/producto.js"));

var _message = _interopRequireDefault(require("../class/message.js"));

var _moment = _interopRequireDefault(require("moment"));

var _data = require("./data.js");

var _app = require("./../modules/app.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Funcion encargada de validad y guardar el form cuando se llama desde el websocket
function guardarFromForm(data) {
  var flagError = false;
  var msgErrorParametros = 'Parámetros no validos';

  if (data.title === undefined || data.title === '') {
    flagError = true;
  }

  if (data.price === undefined || data.price === '') {
    flagError = true;
  }

  if (isNaN(parseFloat(data.price))) {
    flagError = true;
  }

  if (data.thumbnail === undefined || data.thumbnail === '') {
    flagError = true;
  }

  if (flagError) {
    return 400;
  } else {
    _data.lastID.lastID = _data.lastID.lastID + 1; // Se incrementa el lastID por que se va a guarda un nuevo valor.

    var objProducto = new _producto["default"](data.title, data.price, data.thumbnail, _data.lastID.lastID);

    _data.productos.push(objProducto);

    _data.dbIDs.push(_data.lastID.lastID);

    return 200;
  }
} //Funcion que se encarga de guardar los mensajes en tanto en la variable dinámica como en el archivo


function guardarNewMessage(data) {
  var now = new Date();
  var date = (0, _moment["default"])(now).format('DD/MM/YYYY HH:MM:SS');
  var newMessage = new _message["default"](data.email, date, data.text);

  _data.messages.push(newMessage);

  (0, _app.guardarMessages)(_data.messages);
}