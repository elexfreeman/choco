/*модуль загрузки инфы с юона*/

var https = require('https');
var querystring = require("querystring");


var Uon = function (apiKey) {


    function request(host, path) {
        console.info(host + path);
        return new Promise(function (resolve, reject) {

            var request = https.request({
                host: host,
                path: path
            }, function (res) {
                var data = '';
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on('end', function () {
                    resolve(data);
                });
            });
            request.on('error', function (e) {
                reject(e);
            });
            request.end();
        });
    }

    /*загружает лиды с date1 по date2*/
    function leads(date1, date2) {
        return new Promise(function (resolve, reject) {
            request('api.u-on.ru', '/' + apiKey + '/lead/' + date1 + '/' + date2 + '.json').then(function (i) {
                i = JSON.parse(i);
                resolve(i.leads);
            })
        });
    }

    return {
        leads:leads
    }

};


if (module.parent) {
    module.exports = Uon;
} else {

    var u = new Uon('K5sDAOPv30ri4igOt404');

    u.leads('2018-01-01','2018-01-31').then(function (i) {
        console.info(i);
    });

}