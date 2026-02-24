import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { booksReducer } from './store/books/books.reducer';
import { BooksEffects } from './store/books/books.effects';
import { provideStore } from '@ngrx/store';
import { Actions, provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ books: booksReducer }),
    provideEffects([BooksEffects]),
    { provide: Actions, useClass: Actions }
  ]
};
