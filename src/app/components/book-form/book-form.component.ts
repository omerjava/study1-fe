import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as BooksActions from '../../store/books/books.actions';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {

  @Input() book!: Book; // initial book (for edit)
  @Output() cancelEvent = new EventEmitter<void>();

  formBook = signal<Book>({ id: undefined, name: '', author: '', description: '', photoUrl: '' });
  selectedFile = signal<File | undefined>(undefined);
  selectedFilePreview: string | ArrayBuffer | null = null;
  formError = '';

  constructor(private store: Store) { }

  ngOnChanges() {
    if (this.book) this.formBook.set({ ...this.book });
  }

  updateField<K extends keyof Book>(field: K, value: Book[K]) {
    this.formBook.set({ ...this.formBook(), [field]: value });
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.selectedFile.set(file);
    this.selectedFilePreview = URL.createObjectURL(file);
  }

  /** Validate required fields */
  validate(): boolean {
    if (!this.formBook().name?.trim() || !this.formBook().author?.trim()) {
      this.formError = 'Name and Author are required!';
      return false;
    }
    this.formError = '';
    return true;
  }

  /** Save logic inside form */
  save() {
    if (!this.validate()) return;

    const book = this.formBook();
    const file = this.selectedFile();

    if (file) {
      this.store.dispatch(BooksActions.uploadBookPhoto({ file, book }));
    } else {
      if (book.id !== undefined) {
        this.store.dispatch(BooksActions.updateBook({ book }));
      } else {
        this.store.dispatch(BooksActions.addBook({ book }));
      }
    }

    this.resetForm();
  }

  cancel() {
    this.resetForm();
  }

  resetForm() {
    this.formBook.set({ id: undefined, name: '', author: '', description: '', photoUrl: '' });
    this.selectedFile.set(undefined);
    this.selectedFilePreview = null;
    this.formError = '';
    this.cancelEvent.emit();

  }
}