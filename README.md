# Angular material date-fns adapter (Support jalali)

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![npm version](https://badge.fury.io/js/ngx-material-date-fns-adapter.svg)](http://badge.fury.io/js/ngx-material-date-fns-adapter) [![Build Status](https://github.com/mohsen77sk/angular-material-date-fns-adapter/workflows/main/badge.svg)](https://github.com/mohsen77sk/angular-material-date-fns-adapter/actions)

## What is this?

This library provides a custom DateAdapter for the Angular Material Datepicker component using the date-fns library.

* Includes all locales provided by date-fns.
* Supported **Jalali** calendar for `fa-IR` locale.

## Demo

<https://mohsen77sk.github.io/angular-material-date-fns-adapter/>

## Install

### Install [ngx-material-date-fns-adapter](https://www.npmjs.com/package/ngx-material-date-fns-adapter)

```sh
npm install date-fns date-fns-jalali ngx-material-date-fns-adapter
```

Both `date-fns` and `date-fns-jalali` libraries are peer dependencies, but required for the compilation.

### Compatibility

* `@angular/core`: >= 14.0.0
* `@angular/material`: >= 14.0.0
* `date-fns`: >= 2.22.0
* `date-fns-jalali`: >= 2.22.0

## Usage

1. Register the **NgxMatDateFnsModule** in your app module.

    ```typescript
    import { NgxMatDateFnsModule }  from 'ngx-material-date-fns-adapter';

    @NgModule({
      ...
      imports: [
        ...
        NgxMatDateFnsModule,
      ],
      ...
    })
    export class AppModule { }
    ```

2. Register custom locale token in providers if needed.

    ```typescript
    import { MAT_DATE_LOCALE } from "@angular/material/core";
    import { fr } from 'date-fns/esm/locale';

    @NgModule({
      ...
      providers: [{ provide: MAT_DATE_LOCALE, useValue: fr }]
      ...
    })
    export class AppModule { }
    ```

## Change locale dynamically

Use `setLocale()` method of the DateAdapter. In case of using setLocale with a **Locale** argument

```typescript
import { Component } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { enUS, faIR } from 'date-fns/esm/locale';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private _adapter: DateAdapter<any>) {}

  changeLocale(value: any): void {
    switch (value) {
      case 'en-US':
        this._adapter.setLocale(enUS);
        break;
      case 'fa-IR':
        this._adapter.setLocale(faIR);
        break;
    }
  }
}
```

## Default locale

When MAT_DATE_LOCALE tokens are not provided, `en-US` locale is used by default.

## Development

The most useful commands for development are:

* `npm run start` to start a development server
* `npm run build-demo` to build the demo locally (it will be published automatically by GitHub Actions)

## License

[The MIT License (MIT)](LICENSE)
