import express from 'express'
import routeproduct from './routes/productroute'
import routecart from './routes/cartroute'

// Inicializacion Servidor
const app = express()
const port = 8080 || process.env.PORT
const server = app.listen(port, () => console.log('Servidor escuchando en puerto', port))

server.on('error', (err) => {
    console.log('Server Error', err)
})

// Routes

// Carpeta Public
app.use(express.static('public'))
app.use(express.json())
app.use(
    express.urlencoded({ extended: true }))

    // Rutas
app.use("/product", routeproduct)
app.use("/cart", routecart)

// Pagina Principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + "../public/index.html")
})