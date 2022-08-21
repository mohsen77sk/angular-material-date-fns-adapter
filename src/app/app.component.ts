import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import packageJson from '../../projects/ngx-material-date-fns-adapter/package.json';

import { enUS, faIR, ar, fr, ja, ru } from 'date-fns/esm/locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  date = new Date();
  version = packageJson.version;

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
    switch (value) {
      case 'en-US':
        this.locale = enUS;
        break;
      case 'fa-IR':
        this.locale = faIR;
        break;
      case 'ar':
        this.locale = ar;
        break;
      case 'fr':
        this.locale = fr;
        break;
      case 'ja':
        this.locale = ja;
        break;
      case 'ru':
        this.locale = ru;
        break;
    }
    this._adapter.setLocale(this.locale);
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
}
