import { createAction, props } from '@ngrx/store';
import { Book } from '../../models/book.model';


export const loadBooks = createAction('[Books] Load Books');
export const loadBooksSuccess = createAction('[Books] Load Books Success', props<{ books: Book[] }>());
export const loadBooksFailure = createAction('[Books] Load Books Failure', props<{ error: any }>());

export const addBook = createAction('[Books] Add Book', props<{ book: Book }>());
export const addBookSuccess = createAction('[Books] Add Book Success', props<{ book: Book }>());
export const addBookFailure = createAction('[Books] Add Book Failure', props<{ error: any }>());

export const updateBook = createAction('[Books] Update Book', props<{ book: Book }>());
export const updateBookSuccess = createAction('[Books] Update Book Success', props<{ book: Book }>());
export const updateBookFailure = createAction('[Books] Update Book Failure ', props<{ error: any }>());

export const uploadBookPhoto = createAction('[Books] Upload Book Photo', props<{ file: File, book: Book }>());
export const uploadBookPhotoFailure = createAction('[Books] Upload Book Photo Failure', props<{ error: any }>());

export const deleteBook = createAction('[Books] Delete Book', props<{ id: number }>());
export const deleteBookSuccess = createAction('[Books] Delete Book Success', props<{ id: number }>());
export const deleteBookFailure = createAction('[Books] Delete Book Failure', props<{ error: any }>());