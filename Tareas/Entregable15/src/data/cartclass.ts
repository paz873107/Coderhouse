import { readFile, writeFile } from '../utils/fs'
import { v4 as uuidv4 } from "uuid"
const filePathcart = './dist/data/cart.json'
import moment from 'moment'
let arrayCart: any[] = []
var timeStamp: string = moment().format()

interface ProductCart {
    productname: string
    productdescription: string
    productid: string
    price: number
    thumbnail: string
    stock: number
}

interface NewCart {
    cartid: string
    timestamp: string
    client: number
    product: [ProductCart]
}

class Cart {

    async find(id: string) {
        arrayCart = await this.get()
        const cartFind = arrayCart.findIndex(
            (idCart) => idCart.cartid == id)
        return cartFind
    }

    async get(id: string | undefined = undefined) {
        const read: any = await readFile(filePathcart)
        arrayCart = JSON.parse(read)
        return arrayCart
    }

    async add(data: NewCart) {

        arrayCart = await this.get()

        const newCart = {
            cartid: uuidv4(),
            timestamp: timeStamp,
            client: data.client,
            product: data.product
        }
        arrayCart.push(newCart)
        const arrayString = JSON.stringify(arrayCart, null, '\t')
        await writeFile(arrayString, filePathcart)
        return arrayCart
    }

    async delete(id: string) {
        let arrayUpdate = await this.find(id)
        arrayCart = await this.get()
        arrayCart.splice(arrayUpdate, 1)
        const arrayString = JSON.stringify(arrayCart, null, '\t')
        await writeFile(arrayString, filePathcart)
    }
}

export const cartClass = new Cart()