import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IRESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';
import { ICountry } from '../interfaces/country.interface';

const apiUrl = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient)

  searchByCapital( query: string ): Observable<ICountry[]> {
    query = query.toLowerCase()

    return this.http.get<IRESTCountry[]>(`${apiUrl}/capital/${query}`)
      .pipe(
        map((resp) => CountryMapper.restCountryMapArray(resp)),
        catchError((error) => {
          console.log(error);

          return throwError(() => new Error(`No se pudo obtener países con esa capital: ${ query }`))
        })
      )
  }

  searchByCountry( query: string ): Observable<ICountry[]> {
    query = query.toLowerCase()

    return this.http.get<IRESTCountry[]>(`${apiUrl}/name/${query}`)
      .pipe(
        map((resp) => CountryMapper.restCountryMapArray(resp)),
        delay(2000),
        catchError((error) => {
          console.log(error);

          return throwError(() => new Error(`No se pudo obtener países con ese nombre: ${ query }`))
        })
      )
  }

  searchCountryByAlphaCode( code: string ) {
    return this.http.get<IRESTCountry[]>(`${apiUrl}/alpha/${code}`)
      .pipe(
        map((resp) => CountryMapper.restCountryMapArray(resp)),
        map((countries) => countries.at(0)),
        catchError((error) => {
          console.log(error);

          return throwError(() => new Error(`No se pudo obtener países con ese código: ${ code }`))
        })
      )
  }
}
