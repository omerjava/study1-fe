import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-forms',
  imports: [CommonModule, FormsModule],
  templateUrl: './template-forms.component.html',
  styleUrl: './template-forms.component.css'
})
export class TemplateFormsComponent {

  name: string = 'John';
  email: string = 'Doe';

  product: string = '';
  color: string = '';

  submitForm() {
    alert(`Name: ${this.name}, Email: ${this.email}`);
  }

  saveProduct() {
    console.log('product is saved: ', this.product, ' ', this.color);

  }

}
