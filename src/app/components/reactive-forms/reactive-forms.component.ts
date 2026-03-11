import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css'
})
export class ReactiveFormsComponent {

  submitted: boolean = false;

  formProduct: FormGroup = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    price: new FormControl(null, { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
    color: new FormControl('', { nonNullable: true, validators: Validators.required })
  })

  myForm: FormGroup;

  constructor() {
    this.myForm = new FormGroup({
      name: new FormControl('John'),
      email: new FormControl('Doe'),
    });
  }

  submitForm() {
    if (this.myForm.valid) {
      alert(`Name: ${this.myForm.value.name}, Email: ${this.myForm.value.email}`);
    }
  }

  sumbitProduct() {
    this.submitted = true;


    if (this.formProduct.valid) {
      console.log('Product form is sublitted:' + this.formProduct.value.description);
      this.submitted = false;
      this.formProduct.reset();
    } else {
      console.log('Product form else:' + this.formProduct.value.description);
      console.log('color error: ', this.formProduct.get('color')?.errors)
    }

  }

}
