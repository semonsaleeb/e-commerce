import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductsService } from '../../feature/products/services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../model/product';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { Category } from '../../model/category';

@Component({
  selector: 'app-create-new-product',
  standalone: true,
  imports: [CommonModule, MessageModule, InputNumberModule, ButtonModule, ReactiveFormsModule, CardModule, NavbarComponent],
  templateUrl: './create-new-product.component.html',
  styleUrl: './create-new-product.component.css'
})
export class CreateNewProductComponent {
  private productService = inject(ProductsService);
  constructor(private fb:FormBuilder) {}
  public router =inject(Router);

  productForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(10)]],
    price: [0, [Validators.required]],
    category: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(100)]],
  });
  
  categories: Category[] | undefined;

  ngOnInit() {
    this.productService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log('Categories:', this.categories);
    });
    
  }
  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = {
        id: Math.floor(Math.random() * 1000), 
        title: this.productForm.get('title')?.value || '',
        price: this.productForm.get('price')?.value || 0,
        category: this.productForm.get('category')?.value || '',
        description: this.productForm.get('description')?.value || '',
        image: 'default-image-url.jpg' 
      };
  
      this.productService.addNewProduct(newProduct).subscribe(
        (response) => {
          console.log('New product successfully added:', response);
          this.productForm.reset();
        },
        (error) => {
          console.error('Error adding new product:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
    this.router.navigate(['products']);

  }
}  