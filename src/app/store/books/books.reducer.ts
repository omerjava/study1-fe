import { createReducer, on } from '@ngrx/store';
import { Book } from '../../models/book.model';
import * as BooksActions from './books.actions';

export interface State {
    books: Book[];
    error: any;
    loading: boolean;
}

export const initialState: State = {
    books: [],
    error: null,
    loading: false,
}


export const booksReducer = createReducer(
    initialState,

    on(BooksActions.loadBooks, (state) => ({ ...state, loading: true })),
    on(BooksActions.loadBooksSuccess, (state, { books }) => ({ ...state, books, loading: false })),
    on(BooksActions.loadBooksFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(BooksActions.addBook, (state) => ({ ...state, loading: true })),
    on(BooksActions.addBookSuccess, (state, { book }) => ({ ...state, books: [...state.books, book], loading: false })),
    on(BooksActions.addBookFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(BooksActions.updateBook, (state) => ({ ...state, loading: true })),
    on(BooksActions.updateBookSuccess, (state, { book }) =>
        ({ ...state, books: state.books.map(b => b.id === book.id ? book : b), loading: false })
    ),
    on(BooksActions.updateBookFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(BooksActions.deleteBook, (state) => ({ ...state, loading: true })),
    on(BooksActions.deleteBookSuccess, (state, { id }) => ({ ...state, books: state.books.filter(b => b.id !== id), loading: false })),
    on(BooksActions.deleteBookFailure, (state, { error }) => ({ ...state, error, loading: false })),






);


/*
export const booksReducer = createReducer(
    initialState,
    on(BooksActions.loadBooks, (state) => ({ ...state, loading: true })),
    on(BooksActions.loadBooksSuccess, (state, { books }) => ({ ...state, books, loading: false })),
    on(BooksActions.loadBooksFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(BooksActions.addBook, (state) => ({ ...state, loading: true })),
    on(BooksActions.addBookSuccess, (state, { book }) => ({ ...state, books: [...state.books, book], loading: false })),
    on(BooksActions.addBookFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(BooksActions.updateBook, (state) => ({ ...state, loading: true })),
    on(BooksActions.updateBookSuccess, (state, { book }) => ({
        ...state,
        books: state.books.map(b => b.id === book.id ? book : b),
        loading: false
    })),
    on(BooksActions.updateBookFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(BooksActions.deleteBook, (state) => ({ ...state, loading: true })),
    on(BooksActions.deleteBookSuccess, (state, { id }) => ({
        ...state,
        books: state.books.filter(b => b.id !== id),
        loading: false
    })),
    on(BooksActions.deleteBookFailure, (state, { error }) => ({ ...state, error, loading: false }))
)

*/