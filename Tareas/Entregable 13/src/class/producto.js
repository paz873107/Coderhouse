import { random } from '../modules/app.js';

export default class Producto {
  constructor(title, price, thumbnail, id) {
    this.title = title;
    this.price = parseFloat(price);
    this.thumbnail = thumbnail;
    this.id = id;
  }
}