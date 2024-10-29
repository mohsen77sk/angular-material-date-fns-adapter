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
    expect(adapter.getDayOfWeekNames('narrow')).toEqual([
      'S',
      'M',
      'T',
      'W',
      'T',
      'F',
      'S',
    ]);
  });

  it('should get narrow day of week names in a different locale', () => {
    adapter.setLocale(faIR);
    expect(adapter.getDayOfWeekNames('narrow')).toEqual([
      'ی',
      'د',
      'س',
      'چ',
      'پ',
      'ج',
      'ش',
    ]);
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
    expect(adapter.parse('1/2/2017', 'M/d/yyyy')).toEqual(
      new Date(2017, JAN, 2)
    );
  });

  it('should parse string according to given format in a different locale', () => {
    adapter.setLocale(faIR);
    expect(adapter.parse('13/10/1395', 'd/M/yyyy')).toEqual(
      new Date(2017, JAN, 2)
    );
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
