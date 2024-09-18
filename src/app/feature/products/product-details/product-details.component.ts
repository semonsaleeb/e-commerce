import { Component, inject, Input } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Product } from '../../../model/product';
import { ProductListingComponent } from '../product-listing/product-listing.component';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { Router } from '@angular/router';


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
    FormsModule,
    ReactiveFormsModule,
    NavbarComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  private productService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  public router =inject(Router);


  form: FormGroup = new FormGroup({
    title: new FormControl(null),
    Category: new FormControl(null),
    price: new FormControl(null),
    Description: new FormControl(null),
  });

  @Input()
  product!: Product;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');

      if (idParam !== null) {
        const id = +idParam;
        this.productService.getProductById(id).subscribe((res) => {
          this.product = res;
          console.log(this.product);
          this.form.patchValue({
            title: res.title,
            Category: res.category,
            price: res.price,
            Description: res.description,
          });
        });
      }
    });
  }

  submitForm() {
    console.log(this.form?.value);

    this.productService
      .editProduct(this.product.id, this.form?.value)
      .subscribe((res) => console.log(res));

      this.router.navigate(['products']);

  }
}
