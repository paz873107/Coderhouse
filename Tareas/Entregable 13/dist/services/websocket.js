"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initWsServer = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

var _guardar = require("../modules/guardar.js");

var _data = require("../modules/data.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initWsServer = function initWsServer(server) {
  var io = (0, _socket["default"])(server);
  io.on('connection', function (socket) {
    console.log('Nueva Conexion establecida!');
    /*
    * PARA RESPONDER A UN SOLO CLIENTE
      socket.emit('websocket', messages);
    * PARA ENVIARLE EL MENSAJE A TODOS
      io.emit('websocket', messages);
    * PARA ENVIARLE MENSAJE A TODOS MENOS AL QUE ME LO MANDO
      socket.broadcast.emit('websocket', messages);//
    */
    //WebSocket que se encarga de avisar al front sobre nuevo productos agregados

    socket.on('new-product', function (data) {
      var res = (0, _guardar.guardarFromForm)(data);

      if (res === 400) {
        socket.emit('messages', 'Datos no validos en el formulario');
      } else {
        var product = [_data.productos[_data.productos.length - 1]];
        io.emit('update', product); //Es el cargado desde el front pintar ese nuevo producto
      }
    }); //WebSocket que se encarga de contestar al front sobre todos los productos

    socket.on('askProducts', function () {
      console.log('Envie los productos');

      if (_data.productos.length > 0) {
        socket.emit('update', _data.productos); //Es el cargado desde el front pintar ese nuevo producto
      }
    }); //Websocket que se encarga de avisar al front sobre nuevo messages del chat

    socket.on('new-message', function (data) {
      (0, _guardar.guardarNewMessage)(data);
      var message = [_data.messages[_data.messages.length - 1]];
      io.emit('updateChat', message); //Es el cargado desde el front pintar ese nuevo mensaje del chat
    }); //WebSocket que se encarga de contestar al front sobre todos los mensajes almacenado

    socket.on('askMessages', function () {
      console.log('Envie los Messages');

      if (_data.messages.length > 0) {
        socket.emit('updateChat', _data.messages); //Es el cargado desde el front pintar ese nuevo mensaje del chat
      }
    });
  });
  return io;
};

exports.initWsServer = initWsServer;