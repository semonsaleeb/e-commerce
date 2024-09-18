import { Routes } from '@angular/router';
import { ProductShellComponent } from './feature/products/product-shell/product-shell.component';
import { ProductDetailsComponent } from './feature/products/product-details/product-details.component';
import { CreateNewProductComponent } from './core/create-new-product/create-new-product.component';

export const routes: Routes = [
    {path:'', redirectTo:'products', pathMatch:"full"},
    { path: 'products', component: ProductShellComponent },
    { path: 'products/details/:id', component: ProductDetailsComponent },
    { path: 'products/addNew', component: CreateNewProductComponent },


];
