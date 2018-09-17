var https = require('https');
var querystring = require("querystring");
var ym_model = require('../../app/indicators/model/i_yandex_metrica');

/*ID: c9b03c6353db453c93667ddf7cb382f1
Пароль: b99087add9094f34b8018115fde8e3ab
Callback URL: https://oauth.yandex.ru/verification_code*/

/*token: AQAAAAATl6yDAATRG1YNWrbvz0Z_uYKikBiX_BQ*/

/*модуль полученяи данных с яндекс метрики*/
var Metrika = function (api_key, metrika_id) {


    var mUrl = 'https://api-metrika.yandex.ru/stat/v1/data';

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

    /*https://api-metrika.yandex.ru/stat/v1/data/bytime?
    date1=2015-01-01
    &date2=2015-01-14
    &group=day&dimensions=ym:s:%3Cattribution%3ETrafficSource&attribution=last&ids=2138128&metrics=ym:s:visits&oauth_token=05dd3dd84ff948fdae2bc4fb91f13e22bb1f289ceef0037*/
    function TrafficSource(date1, date2) {
        return new Promise(function (resolve, reject) {
            host = 'api-metrika.yandex.ru';
            path = "/stat/v1/data/bytime?" +
                "date1=2018-01-16" +
                "&date2=2018-02-17" +
                "&group=day&dimensions=ym:s:%3Cattribution%3ETrafficSource&attribution=last&ids=2138128&metrics=ym:s:visits" +
                "&oauth_token=" + api_key;
            request(host, path).then(function (resp) {
                resolve(JSON.parse(resp));
            })
        });
    }

    function TrafficSource2(date1, date2) {
        return new Promise(function (resolve, reject) {
            host = 'api-metrika.yandex.ru';
            path = "/stat/v1/data/bytime?" +
                "row_ids=%5B%5B%22direct%22%5D,%5B%22organic%22,%22organic.yandex%22%5D,%5B%22social%22,%22social.ya%22%5D,%5B%22ad%22%5D%5D" +
                "&date1=" + date1 +
                "&date2=" + date2 +
                "&group=day&dimensions=ym:s:%3Cattribution%3ETrafficSource,ym:s:%3Cattribution%3ESourceEngine&attribution=last" +
                "&ids=" + metrika_id +
                "&metrics=ym:s:visits" +
                "&oauth_token=" + api_key;
            request(host, path).then(function (resp) {
                resolve(resp);
            })
        });
    }


    function getAuthToken() {
        return new Promise(function (resolve, reject) {
            /*https://api-metrika.yandex.ru/management/v1/counters?oauth_token=05dd3dd84ff948fdae2bc4fb91f13e22bb1f289ceef0037*/
            /* https://oauth.yandex.ru/authorize?
                 response_type=code
                 &client_id=c9b03c6353db453c93667ddf7cb382f1
             [&device_id=jarvisservier
             [& device_name=jarvis
             [& login_hint=<имя пользователя или электронный адрес>]
             [& scope=<запрашиваемые необходимые права>]
             [& optional_scope=<запрашиваемые опциональные права>]
             [& force_confirm=yes]
             [& state=<произвольная строка>]*/

            request(
                'https://api-metrika.yandex.ru'
                , 'management/v1/counters?oauth_token=b99087add9094f34b8018115fde8e3ab'
            ).then()
        });
    }

    function SourcesSummary(date1, date2) {
        /*Отчет "Источники - Сводка"*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'sources_summary'
            , group: 'day'
            , dimensions: 'ym:s:lastTrafficSource'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }


    function searchEngineOrganic(date1, date2) {
        /*данные по органическому поиску*/
        var params = {
            date1: date1
            , date2: date2
            , group: 'day'
            , dimensions: 'ym:s:searchEngine'
            , filters: "ym:s:trafficSource=='organic'"
            , metrics: 'ym:s:visits'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }

    function sourcesSearchPhrases(date1, date2) {
        /*Отчет "Источники - Поисковые фразы"*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'sources_search_phrases'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }


    function techPlatforms(date1, date2) {
        /*Отчет "Технологии"*/
        /*"ym:s:operatingSystemRoot",
         "ym:s:operatingSystem"*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'tech_platforms'
            , group: 'day'

            , metrics: 'ym:s:visits'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }

    function techPlatformsBrowser(date1, date2) {
        /*Отчет "Технологии - Браузеры"*/
        var params = {
            date1: date1
            , date2: date2
            , group: 'day'
            , preset: 'tech_platforms'
            , dimensions: 'ym:s:browser'
            , metrics: 'ym:s:visits'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }

    function advEngine(date1, date2) {
        /*Отчет Источники рекламы*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'adv_engine'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }

    function sourcesDirectPlatforms(date1, date2) {
        /* отчеты о переходах на сайт с объявлений Яндекс.Директа.*/
        /*ym:s:goal*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'sources_direct_platforms'
            , ids: metrika_id
            , metrics: 'ym:s:goal<goal_id>visits'
            , goal_id: 27053184
            , group: 'day'
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }

    /*todo оозначить цели*/
    /*https://tech.yandex.ru/metrika/doc/api2/api_v1/examples-docpage/*/
    function sourcesDirectPlatformsTypes(date1, date2) {
        /* отчеты о переходах на сайт с объявлений Яндекс.Директа.*/
        /*sources_direct_platforms_types*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'sources_direct_platforms_types'
            , ids: metrika_id
            , oauth_token: api_key
            , metrics: 'ym:s:goal<goal_id>visits'
            , goal_id: 27053184
            , group: 'day'
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }

    function sourcesDirectSummary(date1, date2) {
        /* отчеты о переходах на сайт с объявлений Яндекс.Директа.*/
        /*sources_direct_summary*/
        /*общая сводка по компаниям директа*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'sources_direct_summary'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }


    function sourcesDirectClicks(date1, date2) {
        /*todo не работает*/
        /* отчеты о переходах на сайт с объявлений Яндекс.Директа.*/
        /*sources_direct_clicks*/
        /*общая сводка по компаниям директа*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'sources_direct_clicks'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }

    function geoСountry(date1, date2) {
        /* Данные шаблоны позволяют сформировать отчеты о посещаемости сайта с
        распределением по странам.*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'geo_country'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }

    function interests(date1, date2) {
        /* Данные шаблоны позволяют сформировать отчеты об интересах посетителей сайта..*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'interests'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }

    function age(date1, date2) {
        /* Данные шаблоны позволяют получить отчеты по
        основным социально-демографическим характеристикам посетителей сайта.*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'age'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }

    function ageGender(date1, date2) {
        /* Данные шаблоны позволяют получить отчеты по
        основным социально-демографическим характеристикам посетителей сайта.*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'age_gender'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }

    function gender(date1, date2) {
        /* Данные шаблоны позволяют получить отчеты по
        основным социально-демографическим характеристикам посетителей сайта.*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'gender'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }

    function deepnessDepth(date1, date2) {
        /* Активность
       Данные шаблоны позволяют сформировать отчеты об активности посетителей на сайте.*/
        /*Глубина просмотра*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'deepness_depth'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }

    function deepnessTime(date1, date2) {
        /* Активность
          Данные шаблоны позволяют сформировать отчеты об активности посетителей на сайте.*/
        /*Время на сайте*/
        var params = {
            date1: date1
            , date2: date2
            , preset: 'deepness_depth'
            , ids: metrika_id
            , oauth_token: api_key
        };

        return new Promise(function (resolve, reject) {
            requestGet('api-metrika.yandex.ru', '/stat/v1/data/bytime', params).then(function (i) {
                resolve(i);
            });
        })
    }



    return {
        request: request
        , TrafficSource: TrafficSource
        , TrafficSource2: TrafficSource2
        , requestGet: requestGet
        , getAuthToken: requestGet
        , SourcesSummary: SourcesSummary
        , searchEngineOrganic: searchEngineOrganic
        , sourcesSearchPhrases: sourcesSearchPhrases
        , techPlatforms: techPlatforms
        , techPlatformsBrowser: techPlatformsBrowser
        , advEngine: advEngine
        , sourcesDirectPlatforms: sourcesDirectPlatforms
        , sourcesDirectPlatformsTypes: sourcesDirectPlatformsTypes
        , sourcesDirectSummary: sourcesDirectSummary
        , sourcesDirectClicks: sourcesDirectClicks
        , geoСountry: geoСountry
        , interests: interests
        , age: age
        , ageGender: ageGender
        , gender: gender
        , deepnessDepth: deepnessDepth
        , deepnessTime: deepnessTime

    }
};


if (module.parent) {
    module.exports = Metrika;
} else {

    var m = new Metrika('AQAAAAATl6yDAATRG1YNWrbvz0Z_uYKikBiX_BQ', '35441960');


    /*орг и соц сети*/
    var params = {
        row_ids: '[["direct"],["organic","organic.google"],["organic","organic.yandex"],["social","social.vkontakte"],["social","social.odnoklassniki"],["ad"]]'
        , date1: '2018-02-01'
        , date2: '2018-02-28'
        , group: 'day'
        , dimensions: 'ym:s:<attribution>TrafficSource,ym:s:<attribution>SourceEngine'
        , attribution: 'last'
        , ids: '35441960'
        , metrics: 'ym:s:visits'
        , oauth_token: 'AQAAAAATl6yDAATRG1YNWrbvz0Z_uYKikBiX_BQ'
    };


    /*Отчет "Источники - Сводка". Посетители из Санкт-Петербурга*/
    var params = {
        date1: '2018-01-01'
        , date2: '2018-01-31'
        , preset: 'sources_summary'
        , filters: 'ym:s:regionCity=="Санкт-Петербург"'
        , ids: '35441960'
        , oauth_token: 'AQAAAAATl6yDAATRG1YNWrbvz0Z_uYKikBiX_BQ'
    };

    m.sourcesDirectPlatformsTypes('2018-01-01', '2018-01-31').then(function (i) {
        console.info(i);
    });


}

/***************************************/
/***************************************/
/*выдает новый токен*/
/*https://oauth.yandex.ru/authorize?response_type=token&client_id=c9b03c6353db453c93667ddf7cb382f1*/
/***************************************/
/***************************************/