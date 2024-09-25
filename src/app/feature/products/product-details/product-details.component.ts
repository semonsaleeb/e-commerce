import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../model/category';
import { Product } from '../../../model/product';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CardModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ProductListingComponent,
    ButtonModule,
    ReactiveFormsModule,
    DropdownModule,
    CommonModule,
    NavbarComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  private productService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private fb = inject(FormBuilder);

  categories: Category[] | undefined;
  form: FormGroup;

  @Input()
  product!: Product;

  constructor() {
    this.form = this.fb.group({
      title: [null],
      Category: [null],
      price: [null],
      Description: [null],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');

      if (idParam !== null) {
        const id = +idParam;
        this.productService.getProductById(id).subscribe((res) => {
          this.product = res;
          this.form.patchValue({
            title: res.title,
            price: res.price,
            Description: res.description,
            Category:res.category,
          });
        });
      }
    });

    this.productService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
      console.log('Categories:', this.categories);
    });
  }

  submitForm() {
    console.log(this.form.value);

    this.productService
      .editProduct(this.product.id, this.form.value)
      .subscribe((res) => console.log(res));

    this.router.navigate(['products']);
  }
}
