import { Router, Request, Response, NextFunction } from 'express';
import Middlewares from '../middlewares';
import { Container } from 'typedi';
import CartService from '../../services/cartService';
import { ICartInput } from '../../interfaces/ICart';
const route = Router();

export default (app: Router) => {
  app.use('/cart', route)

  route.post('', Middlewares.isAuth, Middlewares.attachCurrentCustomer,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const cartService = Container.get(CartService)

        const customerCartId = req.currentCustomer.cart.id

        const cartInputs = req.body as ICartInput[]
        console.log(cartInputs)
        const cartItems = await cartService.saveCart(customerCartId, cartInputs)

        return res.json(cartItems).status(200);
      } catch (error) {
        console.log(error)
        return next(error)
      }
      
    })

  route.get('', Middlewares.isAuth, Middlewares.attachCurrentCustomer,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const cartService = Container.get(CartService)

        const customerCartId = req.currentCustomer.cart.id

        const cart = await cartService.getCart(customerCartId)

        return res.json(cart).status(200);
      } catch (error) {
        console.log(error)
        return next(error)
      }
      
    })

  route.delete('/product', Middlewares.isAuth, Middlewares.attachCurrentCustomer,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const cartService = Container.get(CartService)

        const customerCartId = req.currentCustomer.cart.id

        const { productId }  = req.body

        await cartService.deleteProductToCart(customerCartId, productId)

        return res.json({}).status(200)
      } catch (error) {
        console.log(error)
        return next(error)
      }
      
    })
};
