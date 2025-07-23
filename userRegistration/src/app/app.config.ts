import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideNgxMask } from 'ngx-mask';

registerLocaleData(localePt, "pt-BR");

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideNgxMask(),
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    }
  ]
};