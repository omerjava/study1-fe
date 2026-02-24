import { Component, inject, signal } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as BooksActions from '../../store/books/books.actions';
import { selectAllBooks, selectBooksState, selectError } from '../../store/books/books.selectors';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  imports: [FormsModule, CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {

  private store = inject(Store);
  private http = inject(HttpClient);

  books = signal<Book[]>([]);
  selectedBook = signal<Book | null>(null);
  formBook = signal<Book>({ id: undefined, name: '', author: '', description: '' });
  isEditMode = signal(false);
  selectedFile?: File;
  selectedFilePreview: string | ArrayBuffer | null = null;


  constructor() {
    this.store.select(selectAllBooks).subscribe(books =>
      this.books.set(books)
    )
    this.loadBooks();
  }


  loadBooks() {
    this.store.dispatch(BooksActions.loadBooks());
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFilePreview = reader.result;
      };
      reader.readAsDataURL(file);

      // Save the file or its data for upload
      this.selectedFile = file; // if you have such a property
    }
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

  deleteBook(book: Book) {
    if (book.id !== undefined) {
      this.store.dispatch(BooksActions.deleteBook({ id: book.id }))
    }
  }

  save() {
    const book = this.formBook();

    if (this.selectedFile) {
      this.store.dispatch(BooksActions.uploadBookPhoto({ file: this.selectedFile, book }));
    } else {
      if (book.id !== undefined) {
        this.store.dispatch(BooksActions.updateBook({ book }));
      } else {
        this.store.dispatch(BooksActions.addBook({ book }));
      }
    }

    this.isEditMode.set(false);
    this.selectedFile = undefined;
    this.selectedFilePreview = null;
  }

  cancel() {
    this.isEditMode.set(false);
  }










  /*

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

}
