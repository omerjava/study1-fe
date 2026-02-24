import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookService } from '../../services/book.service';
import * as BooksActions from './books.actions';

@Injectable()
export class BooksEffects {
    private actions$ = inject(Actions);
    private bookService = inject(BookService);

    loadBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksActions.loadBooks),
            mergeMap(() =>
                this.bookService.getBooks().pipe(
                    map((books) => BooksActions.loadBooksSuccess({ books })),
                    catchError((error) => of(BooksActions.loadBooksFailure({ error })))
                )
            )
        )
    )

    addBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksActions.addBook),
            mergeMap(({ book }) =>
                this.bookService.addBook(book).pipe(
                    map(newBook => BooksActions.addBookSuccess({ book: newBook })),
                    catchError(error => of(BooksActions.addBookFailure({ error })),)
                )
            )
        )
    )


    updateBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksActions.updateBook),
            mergeMap(({ book }) =>
                this.bookService.updateBook(book).pipe(
                    map(updatedBook => BooksActions.updateBookSuccess({ book: updatedBook })),
                    catchError(error => of(BooksActions.addBookFailure))
                )
            )
        )
    )

    uploadPhoto$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksActions.uploadBookPhoto),
            mergeMap(({ file, book }) =>
                this.bookService.uploadPhotoWithBook(file, book).pipe(
                    map(savedBook => {
                        if (book.id !== undefined) {
                            return BooksActions.updateBookSuccess({ book: savedBook });
                        } else {
                            return BooksActions.addBookSuccess({ book: savedBook });
                        }
                    }),
                    catchError(error => of(BooksActions.uploadBookPhotoFailure({ error })))
                )
            )
        )
    );

    deleteBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksActions.deleteBook),
            mergeMap(({ id }) =>
                this.bookService.deleteBook(id).pipe(
                    map(() => BooksActions.deleteBookSuccess({ id })),
                    catchError(error => of(BooksActions.deleteBookFailure({ error })))
                )
            )
        )
    )

}