import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { ICountry } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  standalone: true,
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
   _countryService = inject(CountryService)

    isLoading = signal<boolean>(false)
    isError = signal<string | null>(null)
    countries = signal<ICountry[]>([])

    onSearch(query: string) {
      if ( this.isLoading() ) return

      this.isLoading.set(true)
      this.isError.set(null)

      this._countryService.searchByCountry(query)
        .subscribe({
          next: (countries) => {
              this.isLoading.set(false)
              this.countries.set(countries)
          },
          error: (err) => {
              this.isLoading.set(false)
              this.countries.set([])
              this.isError.set(err)
          },
        })
    }
 }
