import { ICountry } from "../interfaces/country.interface";
import { IRESTCountry } from "../interfaces/rest-countries.interface";


export class CountryMapper {
  static restCountryMap(country: IRESTCountry): ICountry {
    return {
      cca2: country.cca2,
      flag: country.flag,
      flagSvg: country.flags.svg,
      name: country.translations["spa"].common,
      capital: country.capital,
      population: country.population
    }
  }

  static restCountryMapArray(countries: IRESTCountry[]): ICountry[] {
    return countries.map(this.restCountryMap)
  }
}
