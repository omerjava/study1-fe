import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './books.reducer';

export const selectBooksState = createFeatureSelector<State>('books');

export const selectAllBooks = createSelector(
    selectBooksState,
    (state) => state.books
);

export const selectError = createSelector(
    selectBooksState,
    (state) => state.error
)