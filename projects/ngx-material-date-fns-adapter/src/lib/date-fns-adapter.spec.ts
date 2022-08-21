import { TestBed, waitForAsync } from '@angular/core/testing';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { Locale } from 'date-fns';
import { enUS, faIR } from 'date-fns/locale';

import { DateFnsModule } from './index';

const JAN = 0,
  MAR = 2;

describe('DateFnsAdapter', () => {
  let adapter: DateAdapter<Date, Locale>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DateFnsModule],
    }).compileComponents();

    adapter = TestBed.inject(DateAdapter);
    adapter.setLocale(enUS);
  }));

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
});

describe('DateFnsAdapter with MAT_DATE_LOCALE override', () => {
  let adapter: DateAdapter<Date, Locale>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DateFnsModule],
      providers: [{ provide: MAT_DATE_LOCALE, useValue: faIR }],
    }).compileComponents();

    adapter = TestBed.inject(DateAdapter);
  }));

  it('should take the default locale id from the MAT_DATE_LOCALE injection token', () => {
    const date = adapter.format(new Date(2017, JAN, 2), 'PP');
    expect(date).toEqual('13 دی 1395');
  });
});
