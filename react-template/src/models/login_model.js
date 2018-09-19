import {rest_server} from './settings';



export function generateSmsPass(phone) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        let body = 'phone=' + encodeURIComponent(phone);

        xhr.open("POST", rest_server + 'login_api/generateSmsPass', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        /*событие изменения статуса запроса*/
        xhr.onreadystatechange = function () {
            /*4: request finished and response is ready*/
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    /*все норм логин прошел*/
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


export function login(phone, pass) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        let body = 'phone=' + encodeURIComponent(phone) +
            '&pass=' + encodeURIComponent(pass);

        xhr.open("POST", rest_server + 'login_api/login', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        /*событие изменения статуса запроса*/
        xhr.onreadystatechange = function () {
            /*4: request finished and response is ready*/
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    /*все норм логин прошел*/
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
