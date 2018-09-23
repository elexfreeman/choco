import {rest_server} from './settings';


export class ProductsModel {
    static Get(offset, limit, xhr) {
        return new Promise(function (resolve, reject) {

            //let xhr = new XMLHttpRequest();
            let body = 'offset=' + encodeURIComponent(offset);
            body += '&limit=' + encodeURIComponent(limit);

            xhr.open("POST", rest_server + 'products_api/get', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            /*событие изменения статуса запроса*/
            xhr.onreadystatechange = function () {
                /*4: request finished and response is ready*/
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(this.responseText));
                    } else {
                        /*чтото с конектом или сервером или еще чего*/
                        reject(xhr.status);
                    }
                }
            };
            /*отправляем запрос*/
            xhr.send(body);
        });
    }
}
