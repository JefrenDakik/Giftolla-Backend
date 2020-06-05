import { Router } from 'express';
import auth from './routes/auth';
import customer from './routes/customer'

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app)
  customer(app)

	return app
}