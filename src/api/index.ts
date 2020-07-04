import { Router } from 'express';
import auth from './routes/auth';
import customer from './routes/customer'
import product from './routes/product'
import staticData from './routes/static'
import address from './routes/address'
import wishlist from './routes/wishlist'
import cart from "./routes/cart";

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app)
  customer(app)
  product(app)
  staticData(app)
  address(app)
  wishlist(app)
  cart(app)

	return app
}