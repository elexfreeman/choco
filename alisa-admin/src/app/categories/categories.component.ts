import {Component, OnInit} from '@angular/core';
import {CategoriesService, Category} from "../categories.service";
import {restServer} from "../settings";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

    categories: Category[];
    rest: string = restServer;

    constructor(private categoryService: CategoriesService) {
    }

    getCategories() {
        this.categoryService.getCategories()
            .subscribe(categories => this.categories = categories);
    }

    ngOnInit() {
        this.getCategories();
    }

}
