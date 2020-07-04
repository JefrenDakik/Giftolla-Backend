import { Router, Request, Response, NextFunction } from 'express';
import Middlewares from '../middlewares';
import Container from 'typedi';
import WishlistService from '../../services/wishlistService';
import { IWishlistInput } from '../../interfaces/IWishlist';
const route = Router();

export default (app: Router) => {
  app.use('/wishlist', route)

  route.post('/product', Middlewares.isAuth, Middlewares.attachCurrentCustomer,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const wishlistService = Container.get(WishlistService)

        const customerWishlistId = req.currentCustomer.wishlist.id

        const wishlistInput = req.body as IWishlistInput

        const wishlistProduct = await wishlistService.saveProductToWishlist(customerWishlistId, wishlistInput)

        return res.json(wishlistProduct).status(200);
      } catch (error) {
        console.log(error)
        return next(error)
      }
      
    })

  route.post('', Middlewares.isAuth, Middlewares.attachCurrentCustomer,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const wishlistService = Container.get(WishlistService)

        const customerWishlistId = req.currentCustomer.wishlist.id

        const wishlistInputs = req.body as IWishlistInput[]

        const wishlistItems = await wishlistService.saveWishlist(customerWishlistId, wishlistInputs)

        return res.json(wishlistItems).status(200);
      } catch (error) {
        console.log(error)
        return next(error)
      }
      
    })

  route.get('', Middlewares.isAuth, Middlewares.attachCurrentCustomer,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const wishlistService = Container.get(WishlistService)

        const customerWishlistId = req.currentCustomer.wishlist.id

        const wishlist = await wishlistService.getWishlist(customerWishlistId)

        return res.json(wishlist).status(200);
      } catch (error) {
        console.log(error)
        return next(error)
      }
      
    })

  route.delete('/product', Middlewares.isAuth, Middlewares.attachCurrentCustomer,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const wishlistService = Container.get(WishlistService)

        const customerWishlistId = req.currentCustomer.wishlist.id

        const { productId }  = req.body

        await wishlistService.deleteProductToWishlist(customerWishlistId, productId)

        return res.json().status(200);
      } catch (error) {
        console.log(error)
        return next(error)
      }
      
    })
}
