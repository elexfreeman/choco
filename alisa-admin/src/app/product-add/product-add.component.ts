import {Component, OnInit} from '@angular/core';
import {FancyImageUploaderOptions, UploadedFile} from 'ng2-fancy-image-uploader';
import {Product, ProductCategories, ProductsService} from '../products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {restServer} from '../settings';
import {Manufacturer, ManufacturerService} from '../manufacturer.service';

@Component({
    selector: 'app-product-add',
    templateUrl: './product-add.component.html',
    styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
    onModalShow: boolean = false;
    product: Product;
    rest: string = restServer;

    options: FancyImageUploaderOptions;
    manufacturerList: Manufacturer[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private manufacturerService: ManufacturerService,
                private productsService: ProductsService) {

    }

    ngOnInit() {
        this.product = {
            id: 0,
            caption: '',
            url: '',
            main_img: '',
            description: '',
            img1: '',
            img2: '',
            img3: '',
            img4: '',
            deleted: 0,
            price: 0,
            categories: [],
            manufacturer_id: 0,
            massa: 0,
            cacao_percent: 0,
            filling: '',
            sugar: 0,
            choco_type: 0
        };

        this.options = {
            thumbnailHeight: 200,
            thumbnailWidth: 200,
            uploadUrl: this.rest + 'admin_api/imgUploader',
            allowedImageTypes: ['image/png', 'image/jpeg'],
            maxImageSize: 5
        };
        this.getCategories();
        this.getManufacturerList();
    }

    onUploadMainImg(file: UploadedFile) {
        let path = JSON.parse(file.response).path;
        this.product.main_img = JSON.parse(file.response).path;
    }

    onUploadImg1(file: UploadedFile) {
        let path = JSON.parse(file.response).path;
        this.product.img1 = JSON.parse(file.response).path;
    }

    onUploadImg2(file: UploadedFile) {
        let path = JSON.parse(file.response).path;
        this.product.img2 = JSON.parse(file.response).path;
    }

    onUploadImg3(file: UploadedFile) {
        let path = JSON.parse(file.response).path;
        this.product.img3 = JSON.parse(file.response).path;
    }

    onUploadImg4(file: UploadedFile) {
        let path = JSON.parse(file.response).path;
        this.product.img4 = JSON.parse(file.response).path;
    }

    save() {
        this.productsService.add(this.product).subscribe((resp) => {
            this.onModalShow = true;
        });
    }

    getCategories() {
        this.productsService.getCategories(0).subscribe((categories) => {
            this.product.categories = categories;
        });
    }

    getManufacturerList() {
        this.manufacturerService.getList().subscribe((reps) => {
            this.manufacturerList = reps;
        });
    }

    onDialogDone(d: boolean) {
        this.onModalShow = false;
        this.router.navigate(['/products']);
    }

}
