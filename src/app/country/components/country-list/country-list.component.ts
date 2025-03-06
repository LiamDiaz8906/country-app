import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'country-list',
  standalone: true,
  imports: [],
  templateUrl: './country-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent { }
