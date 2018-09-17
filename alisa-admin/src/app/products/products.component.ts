import {Component, OnInit} from '@angular/core';
import {Product, ProductsService} from '../products.service';
import {restServer} from '../settings';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {DataTablesResponse} from '../Interfaces';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit {
    rest: string = restServer;
    products: Product[];
    dtOptions: DataTables.Settings = {};
    onModalShow: false;

    constructor(private productsService: ProductsService, private http: HttpClient) {
    }

    rowClickHandler(info: any): void {
        console.log(info);
    }

    ngOnInit() {
        this.getList();
        const that = this;

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            autoWidth: false,
            serverSide: true,
            processing: true,
            ajax: (dataTablesParameters: any, callback) => {
                that.http
                    .post<DataTablesResponse>(
                        restServer + 'admin/products/getListTable',
                        dataTablesParameters, {}
                    ).subscribe(resp => {
                    console.log(resp);
                    that.products = resp.data;

                    callback({
                        recordsTotal: resp.recordsTotal,
                        recordsFiltered: resp.recordsFiltered,
                        data: []
                    });
                });
            },
            columns: [{data: 'id'}, {data: 'main_img'}, {data: 'caption'}, {data: 'price'}],
            rowCallback: (row: Node, data: any[] | Object, index: number) => {
                const self = this;
                // Unbind first in order to avoid any duplicate handler
                // (see https://github.com/l-lin/angular-datatables/issues/87)
                $('td', row).unbind('click');
                $('td', row).bind('click', () => {
                    self.rowClickHandler(data);
                });
                return row;
            }
        };
    }

    getList() {
        this.productsService.getList()
            .subscribe(products => this.products = products);
    }

    onDialogDone(d: boolean) {
        this.onModalShow = false;
    }

}
