import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {FancyImageUploaderModule} from 'ng2-fancy-image-uploader';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {TopNavbarComponent} from './top-navbar/top-navbar.component';
import {LeftNavbarComponent} from './left-navbar/left-navbar.component';
import {CategoriesComponent} from './categories/categories.component';
import {ProductsComponent} from './products/products.component';
import {CategoriesAddComponent} from './categories-add/categories-add.component';
import {CategoriesEditComponent} from './categories-edit/categories-edit.component';
import {ProductAddComponent} from './product-add/product-add.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OrdersComponent} from './orders/orders.component';
import {ClientsComponent} from './clients/clients.component';
import {OrdersEditComponent} from './orders-edit/orders-edit.component';
import {ClientsEditComponent} from './clients-edit/clients-edit.component';
import {CategoriesService} from './categories.service';
import {HttpClientModule} from '@angular/common/http';
import {ModalDialogComponent} from './modal-dialog/modal-dialog.component';
import {SearchDayPipe} from './pipes/search-day.pipe';
import {StrToLatPipe} from './pipes/str-to-lat.pipe';
import {CautesPipe} from './pipes/cautes.pipe';
import {safeHtml} from './pipes/safeHtml';
import {Safe} from './pipes/safe';
import {replaceImgUrl} from './pipes/replaceImgUrl.pipe';
import {SearchNightPipe} from './pipes/search-night.pipe';
import {PricePipe} from './pipes/price.pipe';
import {ProductsService} from './products.service';
import {DialogDeletedComponent} from './dialog-deleted/dialog-deleted.component';
import {LoginComponent} from './login/login.component';
import {DataTablesModule} from 'angular-datatables';
import {ManufacturerService} from './manufacturer.service';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        TopNavbarComponent,
        LeftNavbarComponent,
        CategoriesComponent,
        ProductsComponent,
        CategoriesAddComponent,
        CategoriesEditComponent,
        ProductAddComponent,
        ProductEditComponent,
        OrdersComponent,
        ClientsComponent,
        OrdersEditComponent,
        ClientsEditComponent,
        ModalDialogComponent,
        /*pipes*/
        SearchDayPipe,
        StrToLatPipe,
        CautesPipe,
        safeHtml,
        Safe,
        replaceImgUrl,
        SearchNightPipe,
        PricePipe,
        DialogDeletedComponent,
        LoginComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        FancyImageUploaderModule,
        DataTablesModule

    ],
    providers: [CategoriesService, ProductsService, ManufacturerService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
