import { Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from '../../models/book.model';
import * as BooksActions from '../../store/books/books.actions';
import { selectAllBooks } from '../../store/books/books.selectors';
import { BookFormComponent } from '../book-form/book-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book',
  imports: [CommonModule, FormsModule, BookFormComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  private store = inject(Store);

  books = signal<Book[]>([]);
  isEditMode = signal(false);
  isCreateMode = signal(false);
  formBook?: Book; // currently editing book
  selectedFile?: File;

  constructor() {
    // Subscribe to books from store
    this.store.select(selectAllBooks).subscribe(books => this.books.set(books));
    this.loadBooks();
  }

  /** Load books from backend/store */
  loadBooks() {
    this.store.dispatch(BooksActions.loadBooks());
  }

  /** Start editing an existing book */
  selectBook(book: Book) {
    this.formBook = { ...book };
    this.isEditMode.set(true);
  }

  /** Create a new book */
  createNew() {
    this.formBook = { id: undefined, name: '', author: '', description: '', photoUrl: '' };
    this.isCreateMode.set(true);
  }

  /** Delete book */
  deleteBook(book: Book) {
    if (book.id !== undefined) {
      this.store.dispatch(BooksActions.deleteBook({ id: book.id }));
    }
  }

  /** Called when child cancels */
  onCancel() {
    this.isEditMode.set(false);
    this.isCreateMode.set(false);
    this.formBook = undefined;
    this.selectedFile = undefined;
  }

  /** Optionally capture file change (child emits file) */
  onSelectedFile(file: File) {
    this.selectedFile = file;
  }

}






/*
 <div *ngIf="isEditMode() && formBook().id === book.id">
              <h2>{{ formBook().id ? 'Edit' : 'Add'}} Book</h2>
              <form (ngSubmit)="save(formBook())">
                  <input type="tex" [(ngModel)]="formBook().name" name="name" placeholder="Name" required>
                  <input type="text" [(ngModel)]="formBook().author" name="author" placeholder="Author" required>
                  <textarea [(ngModel)]="formBook().description" name="description" id="description"
                      placeholder="Description"></textarea>
                  <input type="file" accept="image/*" (change)="onFileSelected($event)">

                  <!-- Show preview -->
                  <div *ngIf="selectedFilePreview">
                      <h4>Preview:</h4>
                      <img [src]="selectedFilePreview" alt="Image preview" width="300" height="200">
                  </div>

                  <button type="submit">Save</button>
                  <button type="button" (click)="cancel()">Cancel</button>
              </form>
          </div>

private store = inject(Store);

books = signal<Book[]>([]);
selectedBook = signal<Book | null>(null);
formBook = signal<Book>({ id: undefined, name: '', author: '', description: '' });
isEditMode = signal(false);

constructor() {
  // Subscribe to store's books slice and update signal
  this.store.select(selectAllBooks).subscribe(books => {
    this.books.set(books);
  });
  // Dispatch load books on init
  this.loadBooks();
}

loadBooks() {
  this.store.dispatch(BooksActions.loadBooks());
}

selectBook(book: Book) {
  this.selectedBook.set(book);
  this.formBook.set({ ...book });
  this.isEditMode.set(true);
}

createNew() {
  this.formBook.set({ id: undefined, name: '', author: '', description: '' });
  this.isEditMode.set(true);
}

delete(book: Book) {
  if (book.id !== undefined) {
    this.store.dispatch(BooksActions.deleteBook({ id: book.id }));
  }
}

cancel() {
  this.isEditMode.set(false);
}

save() {
  const book = this.formBook();

  if (book.id !== undefined) {
    this.store.dispatch(BooksActions.updateBook({ book }));
  } else {
    this.store.dispatch(BooksActions.addBook({ book }));
  }
  this.isEditMode.set(false);
}



/*

private bookService = inject(BookService);

books = signal<Book[]>([]);
selectedBook = signal<Book | null>(null);
formBook = signal<Book>({ id: undefined, name: '', author: '', description: '' });
isEditMode = signal(false);

ngOnInit() {
  this.loadBooks();
}

loadBooks() {
  this.bookService.getBooks().subscribe(data => {
    this.books.set(data);
  })
}

selectBook(book: Book) {
  this.selectedBook.set(book);
  this.formBook.set({ ...book });
  this.isEditMode.set(true);
}

createNew() {
  this.formBook.set({ id: undefined, name: '', author: '', description: '' });
  this.isEditMode.set(true);
}



delete(book: Book) {
  if (book.id) {
    this.bookService.deleteBook(book.id).subscribe(() => {
      this.loadBooks();
    })
  }
}

cancel() {
  this.isEditMode.set(false);
}

save() {
  const book = this.formBook();

  if (book.id) {
    this.bookService.updateBook(book).subscribe(() => {
      this.loadBooks();
      this.isEditMode.set(false);
    })
  } else {
    this.bookService.addBook(book).subscribe(() => {
      this.loadBooks();
      this.isEditMode.set(false);
    })
  }

}
 
*/


