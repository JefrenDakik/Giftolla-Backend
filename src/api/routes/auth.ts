import { Router, Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import AuthService from '../../services/authService'
import { celebrate, Joi, Segments } from 'celebrate'
import winston from 'winston'
import { ICustomerInput, IFacebookCustomerInput } from '../../interfaces/ICustomer'

const route = Router()

export default (app: Router) => {
  app.use('/auth', route)

  route.get('/me', (req: Request, res: Response) => {
    // const logger = Container.get('logger')
    
    // const customerModel  = Container.get('customerModel')
    
    return res.json({}).status(200)
  })

  route.post(
    '/signup',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password')),
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: winston.Logger  = Container.get('logger')
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body)
      try {
        const authServiceInstance = Container.get(AuthService)

        const customerInput = req.body as ICustomerInput

        const { customer, token } = await authServiceInstance.signUp(customerInput)
        
        return res.status(201).json({ customer, token })
      } catch (error) {
        logger.error('🔥 error: %o', error)
        return next(error)
      }
  })

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: winston.Logger = Container.get('logger')
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)

      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService)
        const { customer, token } = await authServiceInstance.SignIn(email, password)
        console.log(customer)
        return res.status(201).json({ customer, token });
        
      } catch (error) {
        logger.error('🔥 error: %o', error);
        return next(error);
      }
    }
  )

  route.post(
    '/facebook',
    celebrate({
      body: Joi.object({
        facebookId: Joi.string().required(),
        email: Joi.string().required(),
        name: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: winston.Logger = Container.get('logger')
      logger.debug('Calling Facebook-Login endpoint with body: %o', req.body)

      try {
        const authServiceInstance = Container.get(AuthService)

        const customerInput = req.body as IFacebookCustomerInput
        
        const { customer, token } = await authServiceInstance.loginWithFacebook(customerInput)
        
        return res.status(201).json({ customer, token });
        
      } catch (error) {
        logger.error('🔥 error: %o', error);
        return next(error);
      }
    }
  )

}