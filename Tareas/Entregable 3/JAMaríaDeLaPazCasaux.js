function conteoPalabras(palabras) {
    console.log('Proceso terminado. Cantidad total de palabras: ', palabras);
}

function mostrarPalabras(texto, fn, time = 1000) {
    const dividirPalabras = texto.split(' ');
    let contador = 0;
    return new Promise((resolve, reject) => {
        const int = setInterval(() => {
        if (contador >= dividirPalabras.length) {
            clearInterval(int);
            fn(contador);
            resolve();
        } else {
            console.log(dividirPalabras[contador]);
            contador++;
        }
    }, time);
    });
}

mostrarPalabras('El más grande sigue siendo River Plate', conteoPalabras, 400)
    .then(() => mostrarPalabras('el campeón más poderoso de la historia', conteoPalabras, 500))
    .then(() => mostrarPalabras('Y eso quedó claro el 9 de diciembre de 2018', conteoPalabras, 300));