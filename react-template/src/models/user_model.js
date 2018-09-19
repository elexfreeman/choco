import {rest_server} from './settings';


export function getUserInfo() {
    return new Promise(function (resolve, reject) {
        if (localStorage.getItem('apiKey') === undefined) {
            reject(1);
        } else {
            let xhr = new XMLHttpRequest();
            let body = 'apiKey=' + encodeURIComponent(localStorage.getItem('apiKey'));

            xhr.open("POST", rest_server + 'user_api/getUserInfo', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            /*событие изменения статуса запроса*/
            xhr.onreadystatechange = function () {
                /*4: request finished and response is ready*/
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        /*все норм логин прошел*/
                        let user = JSON.parse(this.responseText);

                        if (user.user === false) {
                            reject(1)
                        } else {
                            resolve(user.user);
                        }
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



export function update(arg) {
    return new Promise(function (resolve, reject) {
        if (localStorage.getItem('apiKey') === undefined) {
            reject(1)
        } else {
            let xhr = new XMLHttpRequest();
            let body = 'apiKey=' + encodeURIComponent(localStorage.getItem('apiKey'));
            for (let key in arg) {
                body += '&' + key + '=' + encodeURIComponent(arg[key]);
            }

            xhr.open("POST", rest_server + 'user_api/update', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            /*событие изменения статуса запроса*/
            xhr.onreadystatechange = function () {
                /*4: request finished and response is ready*/
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        /*все норм логин прошел*/
                        let user = JSON.parse(this.responseText);

                        if (user.user === false) {
                            reject(1)
                        } else {
                            resolve(user.user);
                        }
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


export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


export function updateAvatar(data) {

    /*тут есть косяк можо зспамить сервер*/
    let formdata = new FormData();
    formdata.append('avatar', data.avatar,  data.avatar.name);

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open("POST", rest_server + 'admin/imgUploader', true);
       // xhr.setRequestHeader('Content-Type', 'multipart/form-data');

        /*событие изменения статуса запроса*/
        xhr.onreadystatechange = function () {
            /*4: request finished and response is ready*/
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let resp=JSON.parse(this.responseText);
                    if(resp.path===''){
                        reject('path-err');
                    }
                    resolve(resp.path);
                } else {
                    /*чтото с конектом или сервером или еще чего*/
                    reject(xhr.status);
                }
            }
        };
        /*отправляем запрос*/
        xhr.send(formdata);
    });
}
