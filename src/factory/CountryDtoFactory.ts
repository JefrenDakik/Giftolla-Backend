import { ICountryDto } from '../interfaces/ICountry'
import Country from '../models/mysql/country'

export class CountryDtoFactory {

  public createCountriesDto(countries: Country[]): ICountryDto[] {
    let countriesDto: ICountryDto[] = []

    countries.forEach(country => {
      let countryDto = {} as ICountryDto

      delete country.createdAt
      delete country.updatedAt
      delete country.deletedAt
      delete country.code

      countryDto = country

      countriesDto.push(countryDto)

    })

    return countriesDto
  }
}