import { readFile, writeFile } from '../utils/fs'
import { v4 as uuidv4 } from "uuid"
import moment from 'moment'
const filePathProduct = './dist/data/product.json'
let arrayProducts: any[] = []
var timeStamp = moment().format()


interface NewProduct {
    productname: string
    productdescription: string
    productid: string
    timestamp: string
    price: number
    thumbnail: string
    stock: number
}

class Product {

    async find(id: string) {
        arrayProducts = await this.get()
        const productFind = await arrayProducts.findIndex(
            (idProd) => idProd.productid == id)
        return productFind
    }

    async get(id: string | undefined = undefined) {
        const read: any = await readFile(filePathProduct)
        arrayProducts = JSON.parse(read)
        return arrayProducts;
    }

    async add(data: NewProduct) {

        arrayProducts = await this.get()

        const newProduct = {
            productname: data.productname,
            productdescription: data.productdescription,
            productid: uuidv4(),
            timestamp: timeStamp,
            price: data.price,
            thumbnail: data.thumbnail,
            stock: data.stock
        }
        arrayProducts.push(newProduct)
        const arrayString = JSON.stringify(arrayProducts, null, '\t')
        await writeFile(arrayString, filePathProduct)
        return arrayProducts
    }

    async update(id: string, data: NewProduct) {
        let arrayUpdate = await this.find(id)
        arrayProducts = await this.get()
        const newProduct: NewProduct = {
            productname: data.productname,
            productdescription: data.productdescription,
            productid: id,
            timestamp: timeStamp,
            price: data.price,
            thumbnail: data.thumbnail,
            stock: data.stock
        }
        arrayProducts.splice(arrayUpdate, 1, newProduct);
        const arrayString = JSON.stringify(arrayProducts, null, '\t')
        await writeFile(arrayString, filePathProduct)
    }

    async delete(id: string) {
        let arrayUpdate = await this.find(id)
        arrayProducts = await this.get()
        arrayProducts.splice(arrayUpdate, 1)
        const arrayString = JSON.stringify(arrayProducts, null, '\t')
        await writeFile(arrayString, filePathProduct)
    }
}

export const productClass = new Product()