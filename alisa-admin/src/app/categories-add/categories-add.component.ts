import {Component, OnInit} from '@angular/core';
import {FancyImageUploaderOptions, UploadedFile} from 'ng2-fancy-image-uploader';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService, Category} from "../categories.service";
import {restServer} from "../settings";

@Component({
    selector: 'app-categories-add',
    templateUrl: './categories-add.component.html',
    styleUrls: ['./categories-add.component.css']
})
export class CategoriesAddComponent implements OnInit {

    onModalShow: boolean = false;
    rest: string = restServer;
    category: Category;
    options: FancyImageUploaderOptions;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private categoryService: CategoriesService) {

    }

    ngOnInit() {
        /*получаем данные конфига*/

        this.category = {
            id: 0
            ,caption: ''
            ,url: ''
            ,img: ''
            ,description: ''
            ,deleted: 0
        } ;

        this.options = {
            thumbnailHeight: 200,
            thumbnailWidth: 200,
            uploadUrl: this.rest + 'admin/imgUploader',
            allowedImageTypes: ['image/png', 'image/jpeg'],
            maxImageSize: 3
        };
    }


    onUpload(file: UploadedFile) {
        let path = JSON.parse(file.response).path;
        this.category.img = JSON.parse(file.response).path;
        console.log(this.category);
        console.log(file.response);
    }

    save() {
        this.categoryService.addCategory(this.category).
        subscribe((resp) => {
            this.onModalShow = true;
        });
    }

    onDialogDone(d: boolean) {
        this.onModalShow = false;
        this.router.navigate(['/categories']);
    }

}
