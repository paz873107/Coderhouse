import Producto from '../class/producto.js';
import Message from '../class/message.js';
import moment from 'moment';
import { productos, dbIDs, lastID, messages } from './data.js';
import { guardarMessages } from './../modules/app.js';

//Funcion encargada de validad y guardar el form cuando se llama desde el websocket
export function guardarFromForm(data) {
  let flagError = false;
  const msgErrorParametros = 'Parámetros no validos';

  if (data.title === undefined || data.title === '') {
    flagError = true;
  }

  if (data.price === undefined || data.price === '') {
    flagError = true;
  }

  if (isNaN(parseFloat(data.price))) {
    flagError = true;
  }

  if (data.thumbnail === undefined || data.thumbnail === '') {
    flagError = true;
  }

  if (flagError) {
    return 400;
  } else {
    lastID.lastID = lastID.lastID + 1; // Se incrementa el lastID por que se va a guarda un nuevo valor.

    const objProducto = new Producto(
      data.title,
      data.price,
      data.thumbnail,
      lastID.lastID
    );
    productos.push(objProducto);
    dbIDs.push(lastID.lastID);
    return 200;
  }
}

//Funcion que se encarga de guardar los mensajes en tanto en la variable dinámica como en el archivo
export function guardarNewMessage(data) {
  let now = new Date();
  let date = moment(now).format('DD/MM/YYYY HH:MM:SS');
  const newMessage = new Message(data.email, date, data.text);
  messages.push(newMessage);
  guardarMessages(messages);
}