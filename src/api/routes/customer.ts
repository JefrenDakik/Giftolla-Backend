import { Router, Request, Response } from 'express';
import Middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
  app.use('/user', route)

  route.get('/me', Middlewares.isAuth, Middlewares.attachCurrentCustomer,
    async (req: Request, res: Response) => {
      return res.json({ customer: req.currentCustomer }).status(200);
    })
};
