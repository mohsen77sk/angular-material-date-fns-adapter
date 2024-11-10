import { MatDateFormats } from '@angular/material/core';

export const MAT_DATE_FNS_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'P',
    timeInput: 'p',
  },
  display: {
    dateInput: 'P',
    timeInput: 'p',
    monthYearLabel: 'LLL uuuu',
    dateA11yLabel: 'PP',
    monthYearA11yLabel: 'LLLL uuuu',
    timeOptionLabel: 'p',
  },
};
