import { inject, Injectable } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

import * as gregorian from 'date-fns';
import * as jalali from 'date-fns-jalali';
//
import { Locale } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { faIR } from 'date-fns-jalali/locale';

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

type CalendarType = 'gregorian' | 'jalali';

type DateFnsSubset = {
  setMonth: typeof gregorian.setMonth;
  setDate: typeof gregorian.setDate;
  getMonth: typeof gregorian.getMonth;
  getYear: typeof gregorian.getYear;
  getDate: typeof gregorian.getDate;
  getDay: typeof gregorian.getDay;
  getHours: typeof gregorian.getHours;
  getMinutes: typeof gregorian.getMinutes;
  getSeconds: typeof gregorian.getSeconds;
  getDaysInMonth: typeof gregorian.getDaysInMonth;
  formatISO: typeof gregorian.formatISO;
  addYears: typeof gregorian.addYears;
  addMonths: typeof gregorian.addMonths;
  addDays: typeof gregorian.addDays;
  addSeconds: typeof gregorian.addSeconds;
  isValid: typeof gregorian.isValid;
  isDate: typeof gregorian.isDate;
  format: typeof gregorian.format;
  parseISO: typeof gregorian.parseISO;
  parse: typeof gregorian.parse;
  set: typeof gregorian.set;
};

const dateFns: Record<CalendarType, DateFnsSubset> = {
  gregorian: {
    setMonth: gregorian.setMonth,
    setDate: gregorian.setDate,
    getMonth: gregorian.getMonth,
    getYear: gregorian.getYear,
    getDate: gregorian.getDate,
    getDay: gregorian.getDay,
    getHours: gregorian.getHours,
    getMinutes: gregorian.getMinutes,
    getSeconds: gregorian.getSeconds,
    getDaysInMonth: gregorian.getDaysInMonth,
    formatISO: gregorian.formatISO,
    addYears: gregorian.addYears,
    addMonths: gregorian.addMonths,
    addDays: gregorian.addDays,
    addSeconds: gregorian.addSeconds,
    isValid: gregorian.isValid,
    isDate: gregorian.isDate,
    format: gregorian.format,
    parseISO: gregorian.parseISO,
    parse: gregorian.parse,
    set: gregorian.set,
  },
  jalali: {
    setMonth: jalali.setMonth,
    setDate: jalali.setDate,
    getMonth: jalali.getMonth,
    getYear: jalali.getYear,
    getDate: jalali.getDate,
    getDay: jalali.getDay,
    getHours: jalali.getHours,
    getMinutes: jalali.getMinutes,
    getSeconds: jalali.getSeconds,
    getDaysInMonth: jalali.getDaysInMonth,
    formatISO: jalali.formatISO,
    addYears: jalali.addYears,
    addMonths: jalali.addMonths,
    addDays: jalali.addDays,
    addSeconds: jalali.addSeconds,
    isValid: jalali.isValid,
    isDate: jalali.isDate,
    format: jalali.format,
    parseISO: jalali.parseISO,
    parse: jalali.parse,
    set: jalali.set,
  },
};

// date-fns doesn't have a way to read/print month names or days of the week directly,
// so we get them by formatting a date with a format that produces the desired month/day.
const MONTH_FORMATS = {
  long: 'LLLL',
  short: 'LLL',
  narrow: 'LLLLL',
};

const DAY_OF_WEEK_FORMATS = {
  long: 'EEEE',
  short: 'EEE',
  narrow: 'EEEEE',
};

@Injectable()
export class DateFnsAdapter extends DateAdapter<Date, Locale> {
  /** Calendar type. */
  private _calendarType: CalendarType = 'gregorian';

  private get activeDateFns() {
    return dateFns[this._calendarType];
  }

  /**
   * constructor
   */
  constructor(...args: unknown[]);

  constructor() {
    super();
    const matDateLocale = inject(MAT_DATE_LOCALE, { optional: true });
    this.setLocale(matDateLocale as Locale);
  }

  /**
   * Sets the locale used for all dates.
   *
   * @param locale The new locale
   */
  override setLocale(locale: Locale = enUS): void {
    if (locale.code === 'fa-IR') {
      locale = faIR;
      this._calendarType = 'jalali';
    } else {
      this._calendarType = 'gregorian';
    }

    super.setLocale(locale);
  }

  getYear(date: Date): number {
    return this.activeDateFns.getYear(date);
  }

  getMonth(date: Date): number {
    return this.activeDateFns.getMonth(date);
  }

  getDate(date: Date): number {
    return this.activeDateFns.getDate(date);
  }

  getDayOfWeek(date: Date): number {
    return this.activeDateFns.getDay(date);
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const pattern = MONTH_FORMATS[style];
    return range(12, (i) => this.format(this.activeDateFns.setMonth(this.today(), i), pattern));
  }

  getDateNames(): string[] {
    const dtf = typeof Intl !== 'undefined' ? new Intl.DateTimeFormat(this.locale.code, { day: 'numeric' }) : null;

    return range(31, (i) => {
      const date = this.createDate(2017, 0, i + 1);

      if (dtf) {
        return dtf.format(date).replace(/[\u200e\u200f]/g, '');
      }

      return this.format(date, 'd');
    });
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const pattern = DAY_OF_WEEK_FORMATS[style];
    return range(7, (i) => this.format(new Date(2017, 0, i + 1), pattern));
  }

  getYearName(date: Date): string {
    return this.format(date, 'y');
  }

  getFirstDayOfWeek(): number {
    return this.locale.options?.weekStartsOn ?? 0;
  }

  getNumDaysInMonth(date: Date): number {
    return this.activeDateFns.getDaysInMonth(date);
  }

  clone(date: Date): Date {
    return new Date(date.getTime());
  }

  createDate(year: number, month: number, date: number): Date {
    // Check for invalid month and date (except upper bound on date which we have to check after
    // creating the Date).
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    const result = this.activeDateFns.set(new Date(), {
      year,
      month,
      date,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    // Check that the date wasn't above the upper bound for the month, causing the month to overflow
    if (this.getMonth(result) !== month) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }

  today(): Date {
    return new Date();
  }

  parse(value: unknown, parseFormat: string | string[]): Date | null {
    if (typeof value === 'string' && value.length > 0) {
      const iso8601Date = this.activeDateFns.parseISO(value);

      if (this.isValid(iso8601Date)) {
        return iso8601Date;
      }

      const formats = Array.isArray(parseFormat) ? parseFormat : [parseFormat];

      if (!formats.length) {
        throw Error('Formats array must not be empty.');
      }

      for (const currentFormat of formats) {
        const fromFormat = this.activeDateFns.parse(value, currentFormat, new Date(), {
          locale: this.locale,
        });

        if (this.isValid(fromFormat)) {
          return fromFormat;
        }
      }

      return this.invalid();
    } else if (typeof value === 'number') {
      return new Date(value);
    } else if (value instanceof Date) {
      return this.clone(value);
    }

    return null;
  }

  format(date: Date, displayFormat: string): string {
    if (!this.isValid(date)) {
      throw Error('DateFnsAdapter: Cannot format invalid date.');
    }

    // fix persian Month short name
    if (this.locale.code === 'fa-IR' && displayFormat === 'LLL') {
      displayFormat = 'LLLL';
    }

    // fix persian monthYearLabel
    if (this.locale.code === 'fa-IR' && displayFormat === 'LLL uuuu') {
      displayFormat = 'LLLL uuuu';
    }

    return this.activeDateFns.format(date, displayFormat, {
      locale: this.locale,
    });
  }

  addCalendarYears(date: Date, years: number): Date {
    return this.activeDateFns.addYears(date, years);
  }

  addCalendarMonths(date: Date, months: number): Date {
    return this.activeDateFns.addMonths(date, months);
  }

  addCalendarDays(date: Date, days: number): Date {
    return this.activeDateFns.addDays(date, days);
  }

  toIso8601(date: Date): string {
    return this.activeDateFns.formatISO(date, {
      representation: 'date',
    });
  }

  /**
   * Returns the given value if given a valid Date or null. Deserializes valid ISO 8601 strings
   * (https://www.ietf.org/rfc/rfc3339.txt) into valid Dates and empty string into null. Returns an
   * invalid date for all other values.
   */
  override deserialize(value: unknown): Date | null {
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      const date = this.activeDateFns.parseISO(value);
      if (this.isValid(date)) {
        return date;
      }
    }
    return super.deserialize(value);
  }

  isDateInstance(obj: unknown): obj is Date {
    return this.activeDateFns.isDate(obj);
  }

  isValid(date: Date): boolean {
    return this.activeDateFns.isValid(date);
  }

  invalid(): Date {
    return new Date(NaN);
  }

  override setTime(target: Date, hours: number, minutes: number, seconds: number): Date {
    if (hours < 0 || hours > 23) {
      throw Error(`Invalid hours "${hours}". Hours value must be between 0 and 23.`);
    }
    if (minutes < 0 || minutes > 59) {
      throw Error(`Invalid minutes "${minutes}". Minutes value must be between 0 and 59.`);
    }
    if (seconds < 0 || seconds > 59) {
      throw Error(`Invalid seconds "${seconds}". Seconds value must be between 0 and 59.`);
    }

    return this.activeDateFns.set(this.clone(target), {
      hours,
      minutes,
      seconds,
      milliseconds: 0,
    });
  }

  override getHours(date: Date): number {
    return this.activeDateFns.getHours(date);
  }

  override getMinutes(date: Date): number {
    return this.activeDateFns.getMinutes(date);
  }

  override getSeconds(date: Date): number {
    return this.activeDateFns.getSeconds(date);
  }

  override parseTime(value: unknown, parseFormat: string | string[]): Date | null {
    return this.parse(value, parseFormat);
  }

  override addSeconds(date: Date, amount: number): Date {
    return this.activeDateFns.addSeconds(date, amount);
  }
}
