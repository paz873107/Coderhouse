"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = /** @class */ (function () {
    function Product() {
        this.content = [];
    }
    Product.prototype.randomId = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    Product.prototype.addProduct = function (title, price, thumbnail) {
        var newProduct = {
            title: title,
            price: price,
            thumbnail: thumbnail,
            id: this.randomId(),
        };
        this.content.push(newProduct);
        return newProduct;
    };
    Product.prototype.getProducts = function () {
        return this.content;
    };
    Product.prototype.updateProduct = function (id, title, price, thumbnail) {
        var arrayPosition = this.getProducts()
            .map(function (product) { return product.id; })
            .indexOf(id);
        arrayPosition !== -1 &&
            (this.content[arrayPosition].title = title) + "\n\t\t" + (this.content[arrayPosition].price = price) + "\n\t\t" + (this.content[arrayPosition].thumbnail = thumbnail);
        return arrayPosition !== -1 ? this.content[arrayPosition] : arrayPosition;
    };
    Product.prototype.deleteProduct = function (id) {
        var arrayPosition = this.getProducts()
            .map(function (product) { return product.id; })
            .indexOf(id);
        var deletedProduct = this.content.filter(function (product) { return product.id == id; });
        arrayPosition !== -1 && this.content.splice(arrayPosition, 1);
        return arrayPosition !== -1 ? deletedProduct : arrayPosition;
    };
    return Product;
}());
exports.default = Product;