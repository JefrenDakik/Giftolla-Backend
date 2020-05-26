import { Router, Request, Response, NextFunction } from 'express'
import "reflect-metadata"
import { Container } from 'typedi'
import AuthService from '../../services/auth'
import { celebrate, Joi, Segments } from 'celebrate'
import winston from 'winston'
import { IUserInput } from '../../interfaces/IUser'

const route = Router()

export default (app: Router) => {
  app.use('/auth', route)

  route.get('/me', (req: Request, res: Response) => {
    const logger = Container.get('logger')
    
    const userModel  = Container.get('userModel')
    
    return res.json({ name: 'jaafar' }).status(200)
  })

  

  route.post(
    '/signup',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: winston.Logger  = Container.get('logger')
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body)
      try {
        const authServiceInstance = Container.get(AuthService)
        const { user, token } = await authServiceInstance.signUp(req.body as IUserInput)
        
        return res.status(201).json({ user, token });
      } catch (error) {
        logger.error('🔥 error: %o', error);
        return next(error);
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
        const { user, token } = await authServiceInstance.SignIn(email, password)

        return res.status(201).json({ user, token });
        
      } catch (error) {
        logger.error('🔥 error: %o', error);
        return next(error);
      }
    }
  )

}