import { Service, Inject } from 'typedi'
import winston from 'winston'
import { InjectRepository } from 'typeorm-typedi-extensions';
import Country from '../models/mysql/country'
import { CountryRepository } from '../repositories/country'
import { ICountryDto } from '../interfaces/ICountry';

@Service()
export default class CountryService {

  constructor(
    @Inject('logger') private logger: winston.Logger,
    @InjectRepository() private readonly countryRepository: CountryRepository,
  ){}

  public async getCountries(): Promise<ICountryDto[]> {
    try {
      const countries = await this.countryRepository.getCountries()

      return countries
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }
}
