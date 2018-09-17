import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService, Category} from "../categories.service";
import {FancyImageUploaderOptions, UploadedFile} from "ng2-fancy-image-uploader";
import {restServer} from "../settings";

@Component({
    selector: 'app-categories-edit',
    templateUrl: './categories-edit.component.html',
    styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {

    onModalShow: boolean = false;
    category: Category;
    categoryId: number;
    rest: string = restServer;
    options: FancyImageUploaderOptions;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private categoryService: CategoriesService) {
    }

    ngOnInit() {
        this.category = {
            id: 0
            , caption: ''
            , url: ''
            , img: ''
            , description: ''
            , deleted: 0
        };
        this.options = {
            thumbnailHeight: 200,
            thumbnailWidth: 200,
            uploadUrl: this.rest + 'admin/imgUploader',
            allowedImageTypes: ['image/png', 'image/jpeg'],
            maxImageSize: 3
        };


        this.categoryId = parseInt(this.route.snapshot.paramMap.get('id'));
        this.getCategory();
    }


    response: string;

    getCategory() {
        this.categoryService.getCategory(this.categoryId)
            .subscribe(category => this.category = category);
    }

    onUpload(file: UploadedFile) {
        let path = JSON.parse(file.response).path;
        this.category.img = JSON.parse(file.response).path;
        console.log(this.category);
        console.log(file.response);
    }

    save() {
        this.categoryService.updateCategory(this.category).subscribe((resp) => {
            this.onModalShow = true;
        });

    }

    onDialogDone(d: boolean) {
        this.onModalShow = false;
        this.router.navigate(['/categories/']);
    }

}
