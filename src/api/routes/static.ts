import { Router, Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import CountryService from '../../services/countryService'
const route = Router();

export default (app: Router) => {
  app.use('/static', route)

  route.get('/countries',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const countryService = Container.get(CountryService)
        const countries = await countryService.getCountries()

        return res.json(countries).status(200)
      } catch (error) {
        return next(error)
      }
    })
}
