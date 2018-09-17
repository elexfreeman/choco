import {Injectable} from '@angular/core';
import {restServer} from './settings';

import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';


export interface Manufacturer {
    id: number;
    caption: string;
    description: string;
    logo: string;
    phone: string;
    address: string;
    user_id: number;
    url: string;

}

@Injectable()
export class ManufacturerService {

    constructor(private http: HttpClient) {
    }

    /*список всех кают корабеля*/
    getList(): Observable<Manufacturer[]> {
        return this.http.get<Manufacturer[]>(
            restServer + 'admin/manufacturer/getAll',
            {})
            .pipe();
    }
}
