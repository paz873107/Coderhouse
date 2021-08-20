const socket = io.connect();

// Cuando Iniciamos pedimos la data que hay actualmente enviando un socket
socket.emit('askProducts');
socket.emit('askMessages');

// WebSocket que recibe mensajes desde le backend si el form no es correcto
socket.on('messages', (data) => {
  console.log('RECIBI MENSAJE');
  alert(data);
});

// WebSocket que recibe mensajes desde le backend para pintar un nuevo producto
socket.on('update', (products) => {
  products.forEach((product) => {
    render(product);
  });
});

// // WebSocket que recibe mensajes desde le backend para pintar un nuevo mensaje del chat
socket.on('updateChat', (messages) => {
  messages.forEach((message) => {
    renderChat(message);
  });
});

//Formularios
let submit = document.getElementById('form-product');
let submitChat = document.getElementById('form-Chat');

//Eventlistener para el form del submit de Producto y lo enviá al backend
submit.addEventListener('submit', (e) => {
  let form = e.target;
  let inputs = new Object();
  e.preventDefault();
  form = submit.getElementsByTagName('input');

  for (let index = 0; index < form.length; index++) {
    inputs[form[index].name] = form[index].value;
  }
  console.log(inputs);
  socket.emit('new-product', inputs);
  submit.reset();
});

//Eventlistener para el form del submit de Mensajes del chat y lo enviá al backend
submitChat.addEventListener('submit', (e) => {
  let form = submitChat.getElementsByTagName('input');
  let inputText = document.getElementById('text');
  let inputs = new Object();
  e.preventDefault();

  for (let index = 0; index < form.length; index++) {
    inputs[form[index].name] = form[index].value;
  }
  socket.emit('new-message', inputs);
  inputText.value = '';
});

//Funcion para pintar un producto
render = (data) => {
  let listProduct = document.getElementById('list-Product');
  let newElement = document.createElement('tr');
  let htmlProducto = `
    <td>${data.title}</td>
    <td>${data.price}</td>
    <td>
      <div class='text-center wd-100'>
        <div
          class='card'
          style='width: 4rem; margin-left: auto; margin-right: auto;'
        >
          <img
            src='${data.thumbnail}'
            class='card-img-top mx-auto d-block'
            alt='...'
          />
        </div>
      </div>
    </td>
    `;
  newElement.innerHTML = htmlProducto;
  listProduct.appendChild(newElement);
};

//Funcion para pintar un mensaje en el chat
renderChat = (data) => {
  let chatUl = document.getElementById('messages');
  let newElement = document.createElement('li');
  newElement.className = 'message left appeared';
  let htmlMessage = `
  <div class="avatar"></div>
  <div class="text_wrapper">
      <span class="email">${data.email}</span>
      <span class="date"> [ ${data.date} ]: </span>
      <span class="text">${data.text}</span>
  </div>`;
  newElement.innerHTML = htmlMessage;
  chatUl.appendChild(newElement);
  chatUl.scrollTo(0, document.body.scrollHeight);
};