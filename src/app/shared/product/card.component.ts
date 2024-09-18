import { HttpClient } from '@angular/common/http';
import { Product } from '../../model/product';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

@Input()
product!: Product;

@Output()
productDelete =new EventEmitter<Product>();

@Output()
productSelected =new EventEmitter<Product>();


onDeleteClick(){
    this.productDelete.emit(this.product)  
    // console.log(this.product);
}

onEditClick(){
    //console.log(this.product);
     this.productSelected.emit(this.product)
}
}
