import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CategoriesComponent} from "./categories/categories.component";
import {CategoriesAddComponent} from "./categories-add/categories-add.component";
import {CategoriesEditComponent} from "./categories-edit/categories-edit.component";
import {ProductsComponent} from "./products/products.component";
import {ProductAddComponent} from "./product-add/product-add.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {ClientsComponent} from "./clients/clients.component";
import {ClientsEditComponent} from "./clients-edit/clients-edit.component";
import {OrdersComponent} from "./orders/orders.component";
import {OrdersEditComponent} from "./orders-edit/orders-edit.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
    { path: '', component: CategoriesComponent }
    ,{ path: 'login', component: LoginComponent }
    ,{ path: 'categories', component: CategoriesComponent }
    ,{ path: 'categories-add', component: CategoriesAddComponent }
    ,{ path: 'categories/:id', component: CategoriesEditComponent }
    ,{ path: 'products', component: ProductsComponent }
    ,{ path: 'products/:id', component: ProductEditComponent }
    ,{ path: 'products-add', component: ProductAddComponent }
    ,{ path: 'clients', component: ClientsComponent }
    ,{ path: 'clients/:id', component: ClientsEditComponent }
    ,{ path: 'orders', component: OrdersComponent }
    ,{ path: 'orders/:id', component: OrdersEditComponent }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}