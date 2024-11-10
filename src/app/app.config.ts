import { ApplicationConfig } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideDateFnsAdapter } from 'ngx-material-date-fns-adapter';
import { enUS } from 'date-fns/locale';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideDateFnsAdapter(), { provide: MAT_DATE_LOCALE, useValue: enUS }],
};
