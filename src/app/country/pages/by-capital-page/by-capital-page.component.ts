import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { ICountry } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [CountryListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPageComponent {
  _countryService = inject(CountryService)

  isLoading = signal<boolean>(false)
  isError = signal<string | null>(null)
  countries = signal<ICountry[]>([])

  onSearch(query: string) {
    if ( this.isLoading() ) return

    this.isLoading.set(true)
    this.isError.set(null)

    this._countryService.searchByCapital(query)
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
