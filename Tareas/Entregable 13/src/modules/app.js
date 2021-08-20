const fs = require('fs');
import path from 'path';
const publicPathFolder = path.resolve(__dirname, './../../public/');
const publicPathFileName = path.resolve(
  __dirname,
  './../../public/messages.txt'
);

//Función para generar un numero aleatorio partiendo de un intervalo.
const random = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

//Generando el contenido de la Item.
const contenido = () => {
  let obj = {
    title: `Producto ${Math.floor(random(1, 10))}`,
    price: `${random(0.0, 9999.99).toFixed(2)}`,
    thumbnail: `https://picsum.photos/id/${Math.floor(random(1, 200))}/200/200`,
    id: ``,
  };
  return obj;
};

//stringify el contenido para el Item.
const objToJSON = (contenido) => {
  return JSON.stringify(contenido, undefined, 2);
};

//Esta funcion se encarga de leer y devolver los mensajes de existir el archivo de mensajes.
function leerMessages() {
  let filenames = fs.readdirSync(publicPathFolder);
  const found = filenames.find((element) => 'messages.txt' === element);
  if (found === 'messages.txt') {
    const data = fs.readFileSync(publicPathFileName, 'utf-8');
    return data;
  } else {
    return -1;
  }
}

// Esta función guarda el array de mensajes en un archivo con formato JSON
function guardarMessages(messages) {
  fs.writeFileSync(publicPathFileName, objToJSON(messages), 'utf-8');
}

export { random, contenido, objToJSON, leerMessages, guardarMessages };