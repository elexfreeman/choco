import { rest_server } from './settings';


export class OrdersModel {
    static Get(offset, limit, xhr, testApiKey) {
        return new Promise(function (resolve, reject) {
            let apiKey = null;
            if (testApiKey != undefined) {
                apiKey = testApiKey;
            } else if (localStorage.getItem('apiKey') != undefined) {
                apiKey = localStorage.getItem('apiKey');
            }

            if (apiKey == null) {
                reject(1);
            } else {

                //let xhr = new XMLHttpRequest();
                let body = 'apiKey=' + encodeURIComponent(apiKey);
                body += '&offset=' + encodeURIComponent(offset);
                body += '&limit=' + encodeURIComponent(limit);

                xhr.open("POST", rest_server + 'orders_api/get', true);
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
            }
        });
    }

    static Create(order, xhr, testApiKey) {
        return new Promise(function (resolve, reject) {
            let apiKey = null;
            if (testApiKey != undefined) {
                apiKey = testApiKey;
            } else if (localStorage.getItem('apiKey') != undefined) {
                apiKey = localStorage.getItem('apiKey');
            }

            if (apiKey == null) {
                reject(1);
            } else {
                //let xhr = new XMLHttpRequest();
                let body = 'apiKey=' + encodeURIComponent(apiKey);
                body += '&order=' + encodeURIComponent(JSON.stringify(order));

                xhr.open("POST", rest_server + 'order_api/create', true);
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
            }
        });
    }
}
