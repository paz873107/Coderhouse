"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _claseProductos = _interopRequireDefault(require("./../models/claseProductos.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var productos = new _claseProductos["default"]();

var router = _express["default"].Router();

router.get('/listar', [], /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return productos.leer();

          case 2:
            data = _context.sent;

            if (data.length == 0) {
              data = {
                error: 'no hay productos cargados'
              };
            }

            return _context.abrupt("return", res.json({
              data: data
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/listar/:id', [], /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var idBuscado, producto;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log(req.params);
            idBuscado = parseInt(req.params.id);
            _context2.next = 4;
            return productos.leerUno(idBuscado);

          case 4:
            producto = _context2.sent;

            if (producto) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              error: 'Producto no encontrado'
            }));

          case 7:
            return _context2.abrupt("return", res.json({
              data: producto
            }));

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/guardar', [], /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, title, price, thumbnail, nuevoProducto;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, price = _req$body.price, thumbnail = _req$body.thumbnail;
            _context3.next = 3;
            return productos.guardar(title, Number(price), thumbnail);

          case 3:
            nuevoProducto = _context3.sent;
            return _context3.abrupt("return", res.status(201).json({
              data: nuevoProducto
            }));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.put('/actualizar/:id', [], /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, title, price, thumbnail, id, nuevoProducto;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, title = _req$body2.title, price = _req$body2.price, thumbnail = _req$body2.thumbnail;
            id = req.params.id;
            _context4.next = 4;
            return productos.actualizar(Number(id), title, Number(price), thumbnail);

          case 4:
            nuevoProducto = _context4.sent;
            return _context4.abrupt("return", res.status(201).json({
              data: nuevoProducto
            }));

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]('/borrar/:id', [], /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var idBuscado, producto;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log(req.params);
            idBuscado = parseInt(req.params.id);
            _context5.next = 4;
            return productos.borrarUno(idBuscado);

          case 4:
            producto = _context5.sent;

            if (producto) {
              _context5.next = 7;
              break;
            }

            return _context5.abrupt("return", res.status(404).json({
              error: 'Producto no encontrado'
            }));

          case 7:
            return _context5.abrupt("return", res.json({
              data: producto
            }));

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;