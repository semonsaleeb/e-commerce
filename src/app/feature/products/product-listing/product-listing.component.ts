import { Product } from './../../../model/product';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductShellComponent } from "../product-shell/product-shell.component";
import { NgFor } from '@angular/common';
import { CardComponent } from "../../../shared/product/card.component";
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [ProductShellComponent, NgFor, CardComponent, ButtonModule],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.css'
})
export class ProductListingComponent {

  public router =inject(Router);
  @Input() products:Product[] = []

  @Output()
  deleteProduct =new EventEmitter<number>();

  @Output()
  editProduct=new EventEmitter<Product>();

  onProductDelete(product: Product){
      console.log("listing :"+ product.id);      
       this.deleteProduct.emit(product.id)

  }

  onProductEdit(product: Product){
    console.log("listing : " + product.id);    
    this.editProduct.emit(product)
    this.router.navigate(['products/details', product.id]);

  }
}
