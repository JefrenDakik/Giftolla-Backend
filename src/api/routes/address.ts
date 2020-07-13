import { Router, Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import AddressService from '../../services/addressService'
import Middlewares from '../middlewares';
import { IAddressInput } from '../../interfaces/IAddress'
import winston from 'winston';

const route = Router()

export default (app: Router) => {
  app.use('/addresses', route)

  const logger: winston.Logger = Container.get('logger')

  route.post('', Middlewares.isAuth, Middlewares.attachCurrentCustomer,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const addressService = Container.get(AddressService)

        const customerId = req.currentCustomer.id
        const addressInput = req.body as IAddressInput

        const address = await addressService.saveAddress(customerId, addressInput)

        return res.json(address).status(200)
      } catch (error) {
        console.log(error)
        return next(error)
      }
    })

  route.get('', Middlewares.isAuth, Middlewares.attachCurrentCustomer,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const addressService = Container.get(AddressService)

        const customerId = req.currentCustomer.id

        const addresses = await addressService.getAddresses(customerId)

        return res.json(addresses).status(200)
      } catch (error) {
        console.log(error)
        return next(error)
      }
    })

  route.delete('', Middlewares.isAuth, Middlewares.attachCurrentCustomer,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling Delete-Address endpoint with body: %o', req.body)
      try {
        const addressService = Container.get(AddressService)

        const customerId = req.currentCustomer.id

        const { addressId } = req.body

        await addressService.deleteAddress(customerId, addressId)

        return res.json({}).status(200)
      } catch (error) {
        console.log(error)
        return next(error)
      }
    })
}
