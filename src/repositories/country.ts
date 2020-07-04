import Container, { Service } from "typedi"
import { Repository, EntityRepository } from "typeorm"
import winston from "winston"
import Country from "../models/mysql/country"
import { ICountryDto } from "../interfaces/ICountry"
import Factory from "../factory"

@Service()
@EntityRepository(Country)
export class CountryRepository extends Repository<Country>{
  constructor(
    private logger: winston.Logger,
  ){
    super()
    this.logger = Container.get('logger')
  }

  public async getCountries(): Promise<ICountryDto[]> {
    const countries = await this.find({})
      .then(countries => {
        return countries
      })
      .catch(error => {
        throw new Error(error)
      })
    const countriesDto = Factory.countryDtoFactory.createCountriesDto(countries)

    return countriesDto
  }

}