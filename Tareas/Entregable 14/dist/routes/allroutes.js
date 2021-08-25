"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ioServer = exports.router = void 0;

var _express = _interopRequireDefault(require("express"));

var _socket = _interopRequireDefault(require("socket.io"));

var _productclass = _interopRequireDefault(require("../services/productclass"));

var _messageclass = _interopRequireDefault(require("../services/messageclass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

exports.router = router;
var products = new _productclass["default"]();
var messages = new _messageclass["default"](); // Endpoint GET para listar todos los productos

router.get('/productos/listar', function (req, res) {
  var getProducts = products.getProducts();
  getProducts.length !== 0 ? res.json({
    products: getProducts
  }) : res.status(404).json({
    error: 'No hay productos cargados'
  });
}); // Endpoint GET para listar todos los messages

router.get('/mensajes/listar', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var listMessages;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return messages.getMessages();

          case 3:
            listMessages = _context.sent;
            listMessages.length !== 0 ? res.json({
              messages: listMessages
            }) : res.status(404).json({
              error: 'No hay mensajes cargados'
            });
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Endpoint GET para pedir un producto especifico por ID

router.get('/productos/listar/:id', function (req, res) {
  var specificId = req.params.id;
  var getProducts = products.getProducts();
  var product = getProducts.find(function (product) {
    return product.id == specificId;
  });
  product ? res.json({
    product: product
  }) : res.status(404).json({
    error: 'Producto no encontrado'
  });
}); // Endpoint POST para agregar un producto

router.post('/productos/guardar', function (req, res) {
  var body = req.body;
  var product = products.addProduct(body.title, body.price, body.thumbnail);
  res.json({
    product: product
  });
}); // Endpoint POST para agregar un producto

router.post('/mensajes/guardar', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var body;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            body = req.body;
            _context2.next = 4;
            return messages.newMessage(body.email, body.date, body.time, body.message);

          case 4:
            res.json({
              mensaje: body
            });
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // Endpoint PUT para actualizar un producto por ID

router.put('/productos/actualizar/:id', function (req, res) {
  var specificId = req.params.id;
  var body = req.body;
  var updatedProduct = products.updateProduct(specificId, body.title, body.price, body.thumbnail);
  updatedProduct === -1 ? res.status(404).json({
    error: 'Producto no encontrado'
  }) : res.status(201).json({
    product: updatedProduct
  });
}); // Endpoint DELETE para borrar un producto por ID

router["delete"]('/productos/borrar/:id', function (req, res) {
  var specificId = req.params.id;
  var deletedProduct = products.deleteProduct(specificId);
  deletedProduct === -1 ? res.status(404).json({
    error: 'Producto no encontrado o ya eliminado'
  }) : res.json({
    deletedProduct: deletedProduct
  });
}); // Socket Server

var ioServer = function ioServer(server) {
  var io = (0, _socket["default"])(server);
  io.on('connection', /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(socket) {
      var getMessages;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log('Client Connected');
              socket.on('addProduct', function (data) {
                products.addProduct(data.title, data.price, data.thumbnail);
                io.emit('products', products.getProducts());
              });
              socket.emit('products', products.getProducts());
              _context4.prev = 3;
              _context4.next = 6;
              return messages.getMessages();

            case 6:
              getMessages = _context4.sent;
              socket.on('sendMessage', /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(message) {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.prev = 0;
                          _context3.next = 3;
                          return messages.newMessage(message.email, message.date, message.time, message.message);

                        case 3:
                          _context3.next = 8;
                          break;

                        case 5:
                          _context3.prev = 5;
                          _context3.t0 = _context3["catch"](0);
                          console.log(_context3.t0);

                        case 8:
                          io.emit('messages', getMessages);

                        case 9:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, null, [[0, 5]]);
                }));

                return function (_x6) {
                  return _ref4.apply(this, arguments);
                };
              }());
              socket.emit('messages', getMessages);
              _context4.next = 14;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](3);
              console.log(_context4.t0);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[3, 11]]);
    }));

    return function (_x5) {
      return _ref3.apply(this, arguments);
    };
  }());
  return io;
};

exports.ioServer = ioServer;