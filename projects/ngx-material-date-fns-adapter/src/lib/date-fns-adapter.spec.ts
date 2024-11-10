import { TestBed } from '@angular/core/testing';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Locale } from 'date-fns';
import { enUS, faIR } from 'date-fns/locale';

import { DateFnsModule } from './index';

const JAN = 0,
  MAR = 2;

describe('DateFnsAdapter', () => {
  let adapter: DateAdapter<Date, Locale>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DateFnsModule],
    });

    adapter = TestBed.inject(DateAdapter);
    adapter.setLocale(enUS);
  });

  it('should get year', () => {
    expect(adapter.getYear(new Date(2017, JAN, 1))).toBe(2017);
  });

  it('should get year in a different locale', () => {
    adapter.setLocale(faIR);
    expect(adapter.getYear(new Date(2017, MAR, 21))).toBe(1396);
  });

  it('should get month', () => {
    expect(adapter.getMonth(new Date(2017, JAN, 1))).toBe(0);
  });

  it('should get month in a different locale', () => {
    adapter.setLocale(faIR);
    expect(adapter.getMonth(new Date(2017, MAR, 21))).toBe(0);
  });

  it('should get date', () => {
    expect(adapter.getDate(new Date(2017, JAN, 1))).toBe(1);
  });

  it('should get date in a different locale', () => {
    adapter.setLocale(faIR);
    expect(adapter.getDate(new Date(2017, MAR, 21))).toBe(1);
  });

  it('should get long month names', () => {
    expect(adapter.getMonthNames('long')).toEqual([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]);
  });

  it('should get month names in a different locale', () => {
    adapter.setLocale(faIR);
    expect(adapter.getMonthNames('long')).toEqual([
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ]);
  });

  it('should get long day of week names', () => {
    expect(adapter.getDayOfWeekNames('long')).toEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });

  it('should get long day of week names in a different locale', () => {
    adapter.setLocale(faIR);
    expect(adapter.getDayOfWeekNames('long')).toEqual([
      'یک‌شنبه',
      'دوشنبه',
      'سه‌شنبه',
      'چهارشنبه',
      'پنج‌شنبه',
      'جمعه',
      'شنبه',
    ]);
  });

  it('should get narrow day of week names', () => {
    expect(adapter.getDayOfWeekNames('narrow')).toEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
  });

  it('should get narrow day of week names in a different locale', () => {
    adapter.setLocale(faIR);
    expect(adapter.getDayOfWeekNames('narrow')).toEqual(['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش']);
  });

  it('should get year name', () => {
    expect(adapter.getYearName(new Date(2017, JAN, 1))).toBe('2017');
  });

  it('should get year name in a different locale', () => {
    adapter.setLocale(faIR);
    expect(adapter.getYearName(new Date(2017, MAR, 21))).toBe('1396');
  });

  it('should get first day of week', () => {
    expect(adapter.getFirstDayOfWeek()).toBe(0);
  });

  it('should get first day of week in a different locale', () => {
    adapter.setLocale(faIR);
    expect(adapter.getFirstDayOfWeek()).toBe(6);
  });

  it('should parse string according to given format', () => {
    expect(adapter.parse('1/2/2017', 'M/d/yyyy')).toEqual(new Date(2017, JAN, 2));
  });

  it('should parse string according to given format in a different locale', () => {
    adapter.setLocale(faIR);
    expect(adapter.parse('1395/10/13', 'yyyy/M/d')).toEqual(new Date(2017, JAN, 2));
  });

  it('should parse Date', () => {
    let date = new Date(2017, JAN, 1);
    expect(adapter.parse(date, 'MM/dd/yyyy')).toEqual(date);
  });

  it('should parse Date in a different locale', () => {
    adapter.setLocale(faIR);
    let date = new Date(2017, JAN, 1);
    expect(adapter.parse(date, 'MM/dd/yyyy')).toEqual(date);
  });

  it('should parse empty string as null', () => {
    expect(adapter.parse('', 'MM/dd/yyyy')).toBeNull();
  });

  it('should parse based on the specified locale', () => {
    adapter.setLocale(faIR);
    expect(adapter.parse('1403/01/01', 'P')).toEqual(new Date(2024, MAR, 20));
  });

  it('should parse invalid value as invalid', () => {
    let d = adapter.parse('hello', 'MM/dd/yyyy');
    expect(d).not.toBeNull();
    expect(adapter.isDateInstance(d)).toBe(true);
    expect(adapter.isValid(d as Date))
      .withContext('Expected to parse as "invalid date" object')
      .toBe(false);
  });

  it('should format date according to given format', () => {
    expect(adapter.format(new Date(2017, JAN, 2), 'MM/dd/yyyy')).toEqual('01/02/2017');
  });

  it('should format date according to given format in a different locale', () => {
    adapter.setLocale(faIR);
    expect(adapter.format(new Date(2017, JAN, 2), 'yyyy/MM/dd')).toEqual('1395/10/13');
  });

  it('should clone', () => {
    let date = new Date(2017, JAN, 1);
    let clone = adapter.clone(date);

    expect(clone).not.toBe(date);
    expect(clone.getTime()).toEqual(date.getTime());
  });

  it('should create invalid date', () => {
    assertValidDate(adapter, adapter.invalid(), false);
  });

  it('should get hours', () => {
    expect(adapter.getHours(new Date(2024, JAN, 1, 14))).toBe(14);
  });

  it('should get minutes', () => {
    expect(adapter.getMinutes(new Date(2024, JAN, 1, 14, 53))).toBe(53);
  });

  it('should get seconds', () => {
    expect(adapter.getSeconds(new Date(2024, JAN, 1, 14, 53, 42))).toBe(42);
  });

  it('should set the time of a date', () => {
    const target = new Date(2024, JAN, 1, 0, 0, 0);
    const result = adapter.setTime(target, 14, 53, 42);
    expect(adapter.getHours(result)).toBe(14);
    expect(adapter.getMinutes(result)).toBe(53);
    expect(adapter.getSeconds(result)).toBe(42);
  });

  it('should throw when passing in invalid hours to setTime', () => {
    expect(() => adapter.setTime(adapter.today(), -1, 0, 0)).toThrowError(
      'Invalid hours "-1". Hours value must be between 0 and 23.'
    );
    expect(() => adapter.setTime(adapter.today(), 51, 0, 0)).toThrowError(
      'Invalid hours "51". Hours value must be between 0 and 23.'
    );
  });

  it('should throw when passing in invalid minutes to setTime', () => {
    expect(() => adapter.setTime(adapter.today(), 0, -1, 0)).toThrowError(
      'Invalid minutes "-1". Minutes value must be between 0 and 59.'
    );
    expect(() => adapter.setTime(adapter.today(), 0, 65, 0)).toThrowError(
      'Invalid minutes "65". Minutes value must be between 0 and 59.'
    );
  });

  it('should throw when passing in invalid seconds to setTime', () => {
    expect(() => adapter.setTime(adapter.today(), 0, 0, -1)).toThrowError(
      'Invalid seconds "-1". Seconds value must be between 0 and 59.'
    );
    expect(() => adapter.setTime(adapter.today(), 0, 0, 65)).toThrowError(
      'Invalid seconds "65". Seconds value must be between 0 and 59.'
    );
  });

  it('should parse a 24-hour time string', () => {
    const result = adapter.parseTime('14:52', 'p')!;
    expect(result).toBeTruthy();
    expect(adapter.isValid(result)).toBe(true);
    expect(adapter.getHours(result)).toBe(14);
    expect(adapter.getMinutes(result)).toBe(52);
    expect(adapter.getSeconds(result)).toBe(0);
  });

  it('should parse a 12-hour time string', () => {
    const result = adapter.parseTime('2:52 PM', 'p')!;
    expect(result).toBeTruthy();
    expect(adapter.isValid(result)).toBe(true);
    expect(adapter.getHours(result)).toBe(14);
    expect(adapter.getMinutes(result)).toBe(52);
    expect(adapter.getSeconds(result)).toBe(0);
  });

  it('should parse a padded time string', () => {
    const result = adapter.parseTime('03:04:05 AM', 'pp')!;
    expect(result).toBeTruthy();
    expect(adapter.isValid(result)).toBe(true);
    expect(adapter.getHours(result)).toBe(3);
    expect(adapter.getMinutes(result)).toBe(4);
    expect(adapter.getSeconds(result)).toBe(5);
  });

  it('should add seconds to a date', () => {
    const amount = 20;
    const initial = new Date(2024, JAN, 1, 12, 34, 56);
    const result = adapter.addSeconds(initial, amount);
    expect(result).not.toBe(initial);
    expect(result.getTime() - initial.getTime()).toBe(amount * 1000);
  });
});

describe('DateFnsAdapter with MAT_DATE_LOCALE override', () => {
  let adapter: DateAdapter<Date, Locale>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DateFnsModule],
      providers: [{ provide: MAT_DATE_LOCALE, useValue: faIR }],
    });

    adapter = TestBed.inject(DateAdapter);
  });

  it('should take the default locale id from the MAT_DATE_LOCALE injection token', () => {
    const date = adapter.format(new Date(2017, JAN, 2), 'PP');
    expect(date).toEqual('13 دی 1395');
  });
});

function assertValidDate(adapter: DateAdapter<Date, Locale>, d: Date | null, valid: boolean) {
  expect(adapter.isDateInstance(d)).not.withContext(`Expected ${d} to be a date instance`).toBeNull();
  expect(adapter.isValid(d!))
    .withContext(`Expected ${d} to be ${valid ? 'valid' : 'invalid'},` + ` but was ${valid ? 'invalid' : 'valid'}`)
    .toBe(valid);
}
