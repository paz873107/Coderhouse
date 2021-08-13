export default class Product {
	constructor() {
		this.content = [];
	}

	randomId() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	addProduct(title, price, thumbnail) {
		const newProduct = {
			title: title,
			price: price,
			thumbnail: thumbnail,
			id: this.randomId(),
		};
		this.content.push(newProduct);
		return newProduct;
	}

	getProducts() {
		return this.content;
	}

	updateProduct(id, title, price, thumbnail) {
		const arrayPosition = this.getProducts()
			.map((product) => product.id)
			.indexOf(id);
		arrayPosition !== -1 &&
			`${(this.content[arrayPosition].title = title)}
		${(this.content[arrayPosition].price = price)}
		${(this.content[arrayPosition].thumbnail = thumbnail)}`;
		return arrayPosition !== -1 ? this.content[arrayPosition] : arrayPosition;
	}

	deleteProduct(id) {
		const arrayPosition = this.getProducts()
			.map((product) => product.id)
			.indexOf(id);
		const deletedProduct = this.content.filter((product) => product.id == id);
		arrayPosition !== -1 && this.content.splice(arrayPosition, 1);
		return arrayPosition !== -1 ? deletedProduct : arrayPosition;
	}
}
