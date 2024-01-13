import { NgModule, Provider } from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatDateFormats,
} from '@angular/material/core';
import { DateFnsAdapter } from './date-fns-adapter';
import { MAT_DATE_FNS_FORMATS } from './date-fns-formats';

@NgModule({
  providers: [
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },
  ],
})
export class DateFnsModule {}

@NgModule({
  providers: [provideDateFnsAdapter()],
})
export class NgxMatDateFnsModule {}

export function provideDateFnsAdapter(
  formats: MatDateFormats = MAT_DATE_FNS_FORMATS
): Provider[] {
  return [
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: formats },
  ];
}
