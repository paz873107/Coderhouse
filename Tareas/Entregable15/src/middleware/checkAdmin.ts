import { Request, Response, NextFunction } from "express"

const admin: boolean = true

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (admin)
        next()
    else {
        res.status(401).json({
            msg: "No estas autorizado"
        })
    }
}