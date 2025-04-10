import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { ICountry } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['code']
  _countryService = inject(CountryService)

  isLoading = signal<boolean>(false)
  isError = signal<string | null>(null)
  countries = signal<ICountry[]>([])


  onCode(code: string) {
    if (this.isLoading()) return

    this.isLoading.set(true)
    this.isError.set(null)

    this._countryService.searchCountryByAlphaCode(code)
      .subscribe({
        next: (code) => {
          this.isLoading.set(false)
          this.countryCode.set(code)
        },
        error: (err) => {
          this.isLoading.set(false)
          this.countryCode.set([])
          this.isError.set(err)
        },
      })
  }
}
