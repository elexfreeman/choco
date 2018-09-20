import {Injectable} from '@angular/core';
import {restServer} from './settings';

import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

export interface ProductCategories {
    id: number;
    caption: string;
    checked: number;
}

/*данные по товару*/
export interface Product {
    id: number;
    price: number;
    caption: string;
    url: string;
    main_img: string;
    description: string;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
    deleted: number;
    manufacturer_id: number;
    massa: number;
    cacao_percent: number;
    filling: string;
    sugar: number;
    categories: ProductCategories[];
}

@Injectable()
export class ProductsService {


    constructor(private http: HttpClient) {

    }

    /*список всех кают корабеля*/
    getList(): Observable<Product[]> {
        return this.http.get<Product[]>(
            restServer + 'admin/products/getList',
            {})
            .pipe();
    }

    /*список всех кают корабеля*/
    getListTable(): Observable<Product[]> {
        return this.http.get<Product[]>(
            restServer + 'admin/products/getListTable',
            {})
            .pipe();
    }

    /*список всех кают корабеля*/
    get(id: number): Observable<Product> {
        return this.http.post<Product>(
            restServer + 'admin/products/get',
            {
                id: id
            })
            .pipe();
    }

    /*список категорий продукта*/
    getCategories(id: number): Observable<ProductCategories[]> {
        return this.http.post<ProductCategories[]>(
            restServer + 'admin/products/getCategories',
            {
                id: id
            })
            .pipe();
    }

    /*список всех кают корабеля*/
    add(product: Product): Observable<JSON> {
        return this.http.post<JSON>(
            restServer + 'admin/products/add', product)
            .pipe();
    }

    /*список всех кают корабеля*/
    update(product: Product): Observable<JSON> {
        return this.http.post<JSON>(
            restServer + 'admin/products/update', product)
            .pipe();
    }


}
