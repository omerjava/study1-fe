import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { booksReducer } from './store/books/books.reducer';
import { BooksEffects } from './store/books/books.effects';
import { provideStore } from '@ngrx/store';
import { Actions, provideEffects } from '@ngrx/effects';
import { MemberEffects } from './store/member/member.effects';
import { memberReducer } from './store/member/member.reducer';
import { ProductEffects } from './store/products/products.effects';
import { productReducer } from './store/products/products.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ books: booksReducer, members: memberReducer, products: productReducer }),
    provideEffects([BooksEffects, MemberEffects, ProductEffects]),
    { provide: Actions, useClass: Actions }
  ]
};
