import {rest_server} from './settings';

// выдает содержимое корзины по серверу
export function getCartRest() {
    // формируем массив из localStorage
    let data = window.localStorage.getItem('cart');
    if (data == null) {
        data = [];
    } else {
        data = JSON.parse(data);
    }

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        let body = 'cart=' + encodeURIComponent(JSON.stringify(data));

        xhr.open("POST", rest_server + "cart_api/get", true);
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
