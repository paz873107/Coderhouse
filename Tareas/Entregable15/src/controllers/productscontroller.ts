import { Request, Response } from "express"
import { productClass } from "../data/productclass"

export class Product {

    async getProducts(req: Request, res: Response) {
        try {
            let productGet: any = await productClass.get()
            if (req.params.id !== undefined) {
                let productFind: any = await productClass.find(req.params.id)
                productGet = productGet[productFind]
            } else {
                productGet = await productClass.get(req.params.id)
            }
            if (productGet === undefined)
                return res.status(204).json({ msg: "Error, el listado esta vacio" })
            res.status(200).json(productGet)
        }
        catch (error) {
            res.status(400).json({ "Error": error })
        }
    }

    async addProduct(req: Request, res: Response) {
        try {
            const body = productClass.add(req.body);
            res.status(201).json({ msg: "Producto ingresado con exito" })
        } catch (error) {
            res.status(400).json({ "Error": error })
        }
    };

    async updateProduct(req: Request, res: Response) {
        try {
            let productGet = await productClass.update(req.params.id, req.body)
            res.status(200).json({ msg: "El producto fue actualizado" })
        } catch (error) {
            res.status(400).json({ "Error": error })
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            let productDel = await productClass.delete(req.params.id)
            res.status(200).json({ msg: "El producto fue eliminado" })
        } catch (error) {
            res.status(400).json({ "Error": error })
        }
    };
}

export const productController = new Product()