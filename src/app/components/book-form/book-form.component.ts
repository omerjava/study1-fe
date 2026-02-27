import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {

  /** Parent book input */
  @Input() book!: Book;

  /** File input from parent */
  @Input() selectedFile?: File;

  /** Child-to-parent events */
  @Output() save = new EventEmitter<Book>();
  @Output() cancel = new EventEmitter<void>();
  @Output() selectedFileChange = new EventEmitter<File>();

  /** Local form state */
  tempBook: Book = { id: undefined, name: '', author: '', description: '', photoUrl: '' };
  selectedFilePreview: string | ArrayBuffer | null = null;

  ngOnChanges() {
    if (this.book) {
      this.tempBook = { ...this.book }; // copy from parent
    }
  }

  /** Generic field update */
  updateField<K extends keyof Book>(field: K, value: Book[K]) {
    this.tempBook[field] = value;
  }

  /** File input */
  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.selectedFileChange.emit(file); // notify parent
    this.selectedFilePreview = URL.createObjectURL(file);
  }

  /** Explicit Save */
  onSave() {
    this.save.emit({ ...this.tempBook });
  }

  /** Explicit Cancel */
  onCancel() {
    this.cancel.emit();
  }
}