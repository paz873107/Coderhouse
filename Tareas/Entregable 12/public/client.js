let socket = io();
let form = document.getElementById('form');
let title = document.getElementById('title');
let price = document.getElementById('price');
let thumbnail = document.getElementById('thumbnail');
socket.emit('askCurrentData');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	socket.emit('add products', {
		title: title.value,
		price: price.value,
		thumbnail: thumbnail.value,
	});
	title.value = '';
	price.value = '';
	thumbnail.value = '';
});

const renderProducts = (data) => {
	let productshtml = data
		.map((product) => {
			return `<tr>
						<td>${product.title}</td>
						<td>${product.price}</td>
						<td>
							<img
							    style='width: 50px; height: auto'
								src='${product.thumbnail}'
								alt='products'
							/>
						</td>
					</tr>`;
		})
		.join(' ');

	document.getElementById('products').innerHTML = productshtml;
};

socket.on('products', (data) => {
	renderProducts(data);
});