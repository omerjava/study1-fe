import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/products/products.actions';
import { selectAllBooks, selectBooksState } from '../../store/books/books.selectors';
import { selectAllProducts } from '../../store/products/products.selectors';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private store = inject(Store);

  products = signal<Product[]>([]);
  isEditable = signal(false);
  productToEdit?: Product;

  constructor() {
    this.store.select(selectAllProducts).subscribe((products) => this.products.set(products));
    this.loadBooks();
  }

  loadBooks() {
    this.store.dispatch(ProductActions.loadProducts());
  }

  deleteProduct(id: number | undefined) {
    if (id) {
      this.store.dispatch(ProductActions.deleteProduct({ id: id }))
    } else {
      console.log('No id provided');
    }
  }
  editProduct(product: Product) {
    this.isEditable.set(true);
    this.productToEdit = product;
  }

  closeForm() {
    console.log('close form worked')
    this.isEditable.set(false);
    this.productToEdit = undefined;
  }



}
