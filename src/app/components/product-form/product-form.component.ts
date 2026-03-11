import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ProductActions from '../../store/products/products.actions';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnChanges {
  @Input() productToEdit?: Product;
  @Output() closeEvent = new EventEmitter<boolean>();


  formProduct: FormGroup;

  submitted: boolean = false;

  constructor(private store: Store) {
    this.formProduct = new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: Validators.required }),
      price: new FormControl(0, { nonNullable: true, validators: Validators.required }),
      color: new FormControl('', { nonNullable: true, validators: Validators.required }),
      stock: new FormControl(0, { nonNullable: true, validators: Validators.required })
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productToEdit']) {
      this.formProduct.patchValue({
        name: this.productToEdit?.name,
        color: this.productToEdit?.color,
        price: this.productToEdit?.price,
        stock: this.productToEdit?.stock
      })
    }
  }


  saveProduct() {
    this.submitted = true;

    console.log('saveProduct form component')


    if (this.formProduct.valid) {
      console.log('saveProduct valid')

      const formValue = this.formProduct.value;

      const newProduct: Product = {
        name: formValue.name,
        price: formValue.price,
        stock: formValue.stock,
        color: formValue.color
      };


      console.log('newProduct: ', newProduct)

      if (this.productToEdit) {
        const productToUpdate: Product = {
          ...newProduct,
          id: this.productToEdit.id,
        };

        this.store.dispatch(ProductActions.updateProduct({ product: productToUpdate }));

      } else {
        this.store.dispatch(ProductActions.createProduct({ product: newProduct }));
      }

    } else {
      console.log('form product is invalid')
    }

    this.formProduct.reset();
    this.submitted = false;
    this.closeEvent.emit();

  }


}
