"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
var CartItem = /** @class */ (function () {
    function CartItem(productname, productdescription, productid, price, thumbnail, stock) {
        this.productname = productname;
        this.productdescription = productdescription;
        this.productid = productid;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
    }
    return CartItem;
}());
var Cart = /** @class */ (function () {
    function Cart(cartid, timestamp, client, product) {
        this.cartid = cartid,
            this.timestamp = timestamp,
            this.client = client,
            this.product = product;
    }
    return Cart;
}());
exports.Cart = Cart;