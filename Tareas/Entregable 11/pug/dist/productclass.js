"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Product = /*#__PURE__*/function () {
  function Product() {
    _classCallCheck(this, Product);

    this.content = [];
  }

  _createClass(Product, [{
    key: "randomId",
    value: function randomId() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
  }, {
    key: "addProduct",
    value: function addProduct(title, price, thumbnail) {
      var newProduct = {
        title: title,
        price: price,
        thumbnail: thumbnail,
        id: this.randomId()
      };
      this.content.push(newProduct);
      return newProduct;
    }
  }, {
    key: "getProducts",
    value: function getProducts() {
      return this.content;
    }
  }, {
    key: "updateProduct",
    value: function updateProduct(id, title, price, thumbnail) {
      var arrayPosition = this.getProducts().map(function (product) {
        return product.id;
      }).indexOf(id);
      arrayPosition !== -1 && "".concat(this.content[arrayPosition].title = title, "\n\t\t").concat(this.content[arrayPosition].price = price, "\n\t\t").concat(this.content[arrayPosition].thumbnail = thumbnail);
      return arrayPosition !== -1 ? this.content[arrayPosition] : arrayPosition;
    }
  }, {
    key: "deleteProduct",
    value: function deleteProduct(id) {
      var arrayPosition = this.getProducts().map(function (product) {
        return product.id;
      }).indexOf(id);
      var deletedProduct = this.content.filter(function (product) {
        return product.id == id;
      });
      arrayPosition !== -1 && this.content.splice(arrayPosition, 1);
      return arrayPosition !== -1 ? deletedProduct : arrayPosition;
    }
  }]);

  return Product;
}();

exports["default"] = Product;