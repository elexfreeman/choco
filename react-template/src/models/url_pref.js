export const url_pref = function () {
    /*проверяем url*/
    let url_prifix = '/user/';
    let url_main = '/user';
    if (window.location.host == 'localhost:8080') {
        url_prifix = '/';
        url_main = '/'
    }

    return {
        url_prifix: url_prifix
        ,url_main: url_main
    }
};