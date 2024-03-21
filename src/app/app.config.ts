import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideDateFnsAdapter } from 'ngx-material-date-fns-adapter';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(), provideDateFnsAdapter()],
};
