"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var filePath = _path["default"].resolve(__dirname, '../file/messageslog.txt');

var Message = /*#__PURE__*/function () {
  function Message() {
    _classCallCheck(this, Message);

    this.messages = [];
  }

  _createClass(Message, [{
    key: "getMessages",
    value: function () {
      var _getMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var txtFile;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.t0 = JSON;
                _context.next = 4;
                return _fs.promises.readFile(filePath, 'utf-8');

              case 4:
                _context.t1 = _context.sent;
                txtFile = _context.t0.parse.call(_context.t0, _context.t1);
                this.messages = txtFile;
                return _context.abrupt("return", this.messages);

              case 10:
                _context.prev = 10;
                _context.t2 = _context["catch"](0);
                console.log(_context.t2);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      function getMessages() {
        return _getMessages.apply(this, arguments);
      }

      return getMessages;
    }()
  }, {
    key: "newMessage",
    value: function () {
      var _newMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email, date, time, message) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                this.messages.push({
                  email: email,
                  date: date,
                  time: time,
                  message: message
                });
                _context2.next = 4;
                return _fs.promises.writeFile(filePath, JSON.stringify(this.messages, null, 2));

              case 4:
                return _context2.abrupt("return", this.messages);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      function newMessage(_x, _x2, _x3, _x4) {
        return _newMessage.apply(this, arguments);
      }

      return newMessage;
    }()
  }]);

  return Message;
}();

exports["default"] = Message;