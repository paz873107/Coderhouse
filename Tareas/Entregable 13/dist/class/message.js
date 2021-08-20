"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function Message(email, date, text) {
  _classCallCheck(this, Message);

  this.email = email;
  this.date = date;
  this.text = text;
};

exports["default"] = Message;