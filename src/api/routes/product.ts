import { Router, Request, Response, NextFunction } from 'express'
import Middlewares from '../middlewares'
import { Container } from 'typedi'
import ProductService from '../../services/productService'
const route = Router()

export default (app: Router) => {
  app.use('/products', route)

  route.get('',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const productService = Container.get(ProductService)
        const products = await productService.getProducts()

        return res.json(products).status(200)
      } catch (error) {
        return next(error)
      }
    })
}
