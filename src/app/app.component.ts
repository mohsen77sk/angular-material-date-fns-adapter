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
import { MatTimepickerModule } from '@angular/material/timepicker';
import packageJson from '../../projects/ngx-material-date-fns-adapter/package.json';

import { enUS, faIR, ar, fr, ja, ru, Locale } from 'date-fns/locale';

@Component({
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
    MatTimepickerModule,
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
      dateLabel: 'Choose a date',
      timeLabel: 'Choose a time',
    },
    {
      label: 'Persian Jalali',
      locale: faIR,
      localeId: 'fa-IR',
      dateLabel: 'انتخاب تاریخ',
      timeLabel: 'انتخاب ساعت',
    },
    {
      label: 'Arabian Gregorian',
      locale: ar,
      localeId: 'ar',
      dateLabel: 'اختر تاريخًا',
      timeLabel: 'اختر وقتًا',
    },
    {
      label: 'French Gregorian',
      locale: fr,
      localeId: 'fr',
      dateLabel: 'Choisissez une date',
      timeLabel: 'Choisissez une heure',
    },
    {
      label: 'Japan Gregorian',
      locale: ja,
      localeId: 'ja',
      dateLabel: '日付を選択',
      timeLabel: '時間を選択',
    },
    {
      label: 'Russian Gregorian',
      locale: ru,
      localeId: 'ru',
      dateLabel: 'Выберите дату',
      timeLabel: 'Выберите время',
    },
  ];

  /**
   * constructor
   */
  constructor(private _adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) public locale: Locale) {}

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
    return Array.isArray(value) ? value.some((x) => x === this.locale.code) : this.locale.code === value;
  }

  /**
   * Get current locale date label
   */
  getDateLabel(): string {
    return this.locales.find((x) => x.localeId === this.locale.code)?.dateLabel ?? '';
  }

  /**
   * Get current locale time label
   */
  getTimeLabel(): string {
    return this.locales.find((x) => x.localeId === this.locale.code)?.timeLabel ?? '';
  }

  /**
   * Change datepicker
   *
   * @param value
   */
  changeDate(value: Date) {
    console.log(
      `Change:
      Date: ${value}
      ISO : ${value?.toISOString()}
      Local(${this.locale.code}): ${value.toLocaleString(this.locale.code)}`
    );

    this.date = value;
  }
}
