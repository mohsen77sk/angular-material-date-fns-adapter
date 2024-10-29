import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { provideDateFnsAdapter } from 'ngx-material-date-fns-adapter';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideDateFnsAdapter()],
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
