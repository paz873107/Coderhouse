"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Productos = /*#__PURE__*/function () {
  function Productos() {
    _classCallCheck(this, Productos);

    this.elementos = [];
  } //funcion para leer mis productos


  _createClass(Productos, [{
    key: "leer",
    value: function () {
      var _leer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                return _context.abrupt("return", this.elementos);

              case 4:
                _context.prev = 4;
                _context.t0 = _context["catch"](0);
                console.log('No hay productos en el listado');

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 4]]);
      }));

      function leer() {
        return _leer.apply(this, arguments);
      }

      return leer;
    }() //funcion para agregar productos

  }, {
    key: "guardar",
    value: function () {
      var _guardar = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(title, price, thumbnail) {
        var elemento;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!(typeof title !== 'string')) {
                  _context2.next = 3;
                  break;
                }

                throw new Error('Titulo tiene que ser string');

              case 3:
                if (!(typeof price !== 'number')) {
                  _context2.next = 5;
                  break;
                }

                throw new Error('Price tiene que ser un nro');

              case 5:
                if (!(typeof thumbnail !== 'string')) {
                  _context2.next = 7;
                  break;
                }

                throw new Error('Thumbnail tiene que ser string de url');

              case 7:
                elemento = {
                  title: title,
                  price: price,
                  thumbnail: thumbnail,
                  id: this.elementos.length + 1
                };
                this.elementos.push(elemento);
                return _context2.abrupt("return", elemento);

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);
                console.log('ERROR: No se pudo agregar un producto. ' + _context2.t0.message);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 12]]);
      }));

      function guardar(_x, _x2, _x3) {
        return _guardar.apply(this, arguments);
      }

      return guardar;
    }()
  }, {
    key: "leerUno",
    value: function () {
      var _leerUno = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
        var producto;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                producto = this.elementos.find(function (aProduct) {
                  return aProduct.id == id;
                });
                return _context3.abrupt("return", producto);

              case 5:
                _context3.prev = 5;
                _context3.t0 = _context3["catch"](0);
                console.log('Producto no encontrado');

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 5]]);
      }));

      function leerUno(_x4) {
        return _leerUno.apply(this, arguments);
      }

      return leerUno;
    }()
  }, {
    key: "actualizar",
    value: function () {
      var _actualizar = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
        var title,
            price,
            thumbnail,
            index,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                title = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : null;
                price = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : null;
                thumbnail = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : null;
                _context4.prev = 3;

                if (!(typeof title !== 'string')) {
                  _context4.next = 6;
                  break;
                }

                throw new Error('Titulo tiene que ser string');

              case 6:
                if (!(typeof price !== 'number')) {
                  _context4.next = 8;
                  break;
                }

                throw new Error('Price tiene que ser un nro');

              case 8:
                if (!(typeof thumbnail !== 'string')) {
                  _context4.next = 10;
                  break;
                }

                throw new Error('Thumbnail tiene que ser string de url');

              case 10:
                index = this.elementos.map(function (aProduct) {
                  return aProduct.id;
                }).indexOf(id);

                if (!(index == -1)) {
                  _context4.next = 13;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  msg: 'Product not found'
                }));

              case 13:
                this.elementos[index].title = title;
                this.elementos[index].price = price;
                this.elementos[index].thumbnail = thumbnail;
                return _context4.abrupt("return", this.elementos[index]);

              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4["catch"](3);
                console.log('Producto no encontrado');

              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[3, 19]]);
      }));

      function actualizar(_x5) {
        return _actualizar.apply(this, arguments);
      }

      return actualizar;
    }()
  }, {
    key: "borrarUno",
    value: function () {
      var _borrarUno = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
        var idBuscado, productoEliminado;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                idBuscado = Number(id);
                productoEliminado = this.elementos.find(function (aProduct) {
                  return aProduct.id == idBuscado;
                });
                this.elementos = this.elementos.filter(function (aProduct) {
                  return aProduct.id !== idBuscado;
                });
                return _context5.abrupt("return", productoEliminado);

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                console.log("Producto no encontrado");

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 7]]);
      }));

      function borrarUno(_x6) {
        return _borrarUno.apply(this, arguments);
      }

      return borrarUno;
    }()
  }]);

  return Productos;
}();

exports["default"] = Productos;