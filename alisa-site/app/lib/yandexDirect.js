var https = require('https');
var querystring = require("querystring");
var tsv = require('tsv');


var Direct = function (api_key, clientLogin) {

    function request(host, path) {
        console.info(host + path);
        return new Promise(function (resolve, reject) {

            var request = https.request({
                host: host
                , path: path
                , headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                    , 'Accept-Language': 'ru'
                    , 'Client-Login': clientLogin
                    , 'Authorization': 'Bearer ' + api_key
                }
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

    function requestPost(host, path, post_data) {
        console.info(host + path);
        return new Promise(function (resolve, reject) {

            var request = https.request({
                host: host
                , path: path
                , method: 'POST'
                , headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                    , 'Accept-Language': 'ru'
                    //, 'Client-Login': clientLogin
                    , 'Authorization': 'Bearer ' + api_key
                    , 'returnMoneyInMicros': false
                }
            }, function (res) {
                var data = '';
                res.on('data', function (chunk) {
                    data += chunk;
                });
                res.on('end', function () {
                    resolve(data);
                });
            });

            request.write(JSON.stringify(post_data));

            request.on('error', function (e) {
                reject(e);
            });
            request.end();
        });
    }

    function requestGet(host, path, get) {
        return new Promise(function (resolve, reject) {
            request(host, path + '?' + querystring.stringify(get)).then(function (i) {
                resolve(JSON.parse(i));
            });
        });
    }

    /*формирует строку get запроса*/
    function genParamsString(data_check) {
        var res = '';
        for (key in data_check) {
            res += key + '=' + data_check[key] + '&';
        }
        return res;
    }

    function getInfo(DateFrom, DateTo) {
        return new Promise(function (resolve, reject) {

            var param = {
                "params": {
                    "SelectionCriteria": {
                        "DateFrom": DateFrom,
                        "DateTo": DateTo
                    },
                    "FieldNames": ["Date", "CampaignId", "Clicks", "Cost"],
                    "OrderBy": [{
                        "Field": "Date"
                    }],
                    "ReportName": "Actual Data",
                    "ReportType": "CAMPAIGN_PERFORMANCE_REPORT",
                    "DateRangeType": "CUSTOM_DATE",
                    "Format": "TSV",
                    "IncludeVAT": "YES",
                    "IncludeDiscount": "YES"
                }
            };

            requestPost('api.direct.yandex.com', '/json/v5/reports', param).then(function (i) {
                //console.info(i);
                var out = tsv.parse(i);
                var j = 1;
                var res = [];
                for (a in out) {
                    if (j != 1) {
                        res.push({
                            campaign_id: out[a][1]
                            , clicks: out[a][2]
                            , cost: out[a][3]
                            , date: out[a]['Actual Data (' + DateFrom + ' - ' + DateTo + ')']
                        })
                    }
                    j++;
                }
                resolve(res);
            })
        });
    }

    return {
        requestPost: requestPost
        ,getInfo: getInfo
    }

};


if (module.parent) {
    module.exports = Direct;
} else {

    var m = new Direct('AQAAAAATl6yDAATRG1YNWrbvz0Z_uYKikBiX_BQ', 'elama-15955290@yandex.ru');


    var param = {
        "params": {
            "SelectionCriteria": {
                "DateFrom": '2018-01-01',
                "DateTo": '2018-01-31'
            },
            "FieldNames": ["Date", "CampaignId", "Clicks", "Cost"],
            "OrderBy": [{
                "Field": "Date"
            }],
            "ReportName": "Actual Data",
            "ReportType": "CAMPAIGN_PERFORMANCE_REPORT",
            "DateRangeType": "CUSTOM_DATE",
            "Format": "TSV",
            "IncludeVAT": "YES",
            "IncludeDiscount": "YES"
        }
    };
    m.getInfo('2018-01-01', '2018-01-31').then(function (i) {
        console.info(i);
    })



}
