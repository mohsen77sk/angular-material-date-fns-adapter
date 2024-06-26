import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import packageJson from '../../projects/ngx-material-date-fns-adapter/package.json';

import { enUS, faIR, ar, fr, ja, ru } from 'date-fns/locale';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
})
export class AppComponent {
  date = new Date();
  version = packageJson.version;

  locales = [
    {
      label: 'English Gregorian',
      locale: enUS,
      localeId: 'en-US',
    },
    {
      label: 'Persian Jalali',
      locale: faIR,
      localeId: 'fa-IR',
    },
    {
      label: 'Arabian Gregorian',
      locale: ar,
      localeId: 'ar',
    },
    {
      label: 'French Gregorian',
      locale: fr,
      localeId: 'fr',
    },
    {
      label: 'Japan Gregorian',
      locale: ja,
      localeId: 'ja',
    },
    {
      label: 'Russian Gregorian',
      locale: ru,
      localeId: 'ru',
    },
  ];

  /**
   * constructor
   */
  constructor(
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) public locale: any
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Change locale to input value
   *
   * @param value
   */
  changeLocale(value: any): void {
    this.locale = value;
    this._adapter.setLocale(this.locale);
    //
    this.changeDate(this.date);
  }

  /**
   * Check is current locale
   *
   * @param value
   */
  isLocale(value: string | string[]): boolean {
    const locale =
      typeof this.locale === 'string' ? this.locale : this.locale?.code;

    return Array.isArray(value)
      ? value.some((x) => x === locale)
      : locale === value;
  }

  /**
   * Change datepicker
   *
   * @param value
   */
  changeDate(value: Date) {
    const locale =
      typeof this.locale === 'string' ? this.locale : this.locale?.code;

    console.log(
      `Change:
      Date: ${value}
      ISO : ${value?.toISOString()}
      Local(${locale}): ${value.toLocaleString(locale)}`
    );

    this.date = value;
  }
}
