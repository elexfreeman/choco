/*загрузчик инфы из источников за текущий день*/

var moment = require('moment');


/*модель работы с юон*/
var uon_sync = require('../../indicators/model/uon_sync');
/*клас для загрузки с апи юона*/
var Uon = require('../uon');
var u = new Uon('K5sDAOPv30ri4igOt404');

/*директ*/
var d_model = require('../../indicators/model/direct_sync');
var Direct = require('../yandexDirect');
var direct = new Direct('AQAAAAATl6yDAATRG1YNWrbvz0Z_uYKikBiX_BQ', '35441960');

/*яндекс метрика*/
var Metrika = require('../yandexMetrika');
var metrika = new Metrika('AQAAAAATl6yDAATRG1YNWrbvz0Z_uYKikBiX_BQ', '35441960');
/*модели*/
var organic_model = require('../../indicators/model/searchEngineOrganic_metrica_sync');
var techPlatforms_model = require('../../indicators/model/techPlatforms_metrica_sync');
var ym_model = require('../../indicators/model/i_yandex_metrica_sync');

/*сегодня и вчера*/
var now = moment().format('YYYY-MM-DD');
var yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');

var m_Arr = [];
/*Юон*/
/*получаем лиды из юона*/
u.leads(yesterday, now).then(function (d) {
    /*перебираем полученные данные*/
    for (key in d) {
        date = moment(d[key].dat).format('YYYY-MM-DD');
        console.info(date);
        console.info(d[key]);
        var m_Arr = [];
        if (d[key].dat_lead == undefined) {
            m_Arr.push(null);
        } else {
            m_Arr.push(moment(d[key].dat_lead).format('YYYY-MM-DD hh:mm:ss'));
        }

        if (d[key].supplier_id == undefined) {
            m_Arr.push(0);
        } else {
            m_Arr.push(d[key].supplier_id);
        }

        if (d[key].manager_surname == undefined) {
            m_Arr.push('');
        } else {
            m_Arr.push(d[key].manager_surname);
        }

        if (d[key].office_id == undefined) {
            m_Arr.push(0);
        } else {
            m_Arr.push(d[key].office_id);
        }

        if (d[key].manager_id == undefined) {
            m_Arr.push(0);
        } else {
            m_Arr.push(d[key].manager_id);
        }


        if (d[key].client_id == undefined) {
            m_Arr.push(0);
        } else {
            m_Arr.push(d[key].client_id);
        }

        if (d[key].client_surname == undefined) {
            m_Arr.push('');
        } else {
            m_Arr.push(d[key].client_surname);
        }

        if (d[key].client_name == undefined) {
            m_Arr.push('');
        } else {
            m_Arr.push(d[key].client_name);
        }

        if (d[key].client_sname == undefined) {
            m_Arr.push('');
        } else {
            m_Arr.push(d[key].client_sname);
        }
        if (d[key].client_phone == undefined) {
            m_Arr.push('');
        } else {
            m_Arr.push(d[key].client_phone);
        }


        if (d[key].client_email == undefined) {
            m_Arr.push('');
        } else {
            m_Arr.push(d[key].client_email);
        }

        if (d[key].travel_type_id == undefined) {
            m_Arr.push(0);
        } else {
            m_Arr.push(d[key].travel_type_id);
        }

        if (d[key].source == undefined) {
            m_Arr.push('');
        } else {
            m_Arr.push(d[key].source);
        }
        if (d[key].travel_type == undefined) {
            m_Arr.push('');
        } else {
            m_Arr.push(d[key].travel_type);
        }

        if (d[key].status_id == undefined) {
            m_Arr.push(0);
        } else {
            m_Arr.push(d[key].status_id);
        }

        if (d[key].status == undefined) {
            m_Arr.push('');
        } else {
            m_Arr.push(d[key].status);
        }

        if (d[key].notes == undefined) {
            m_Arr.push('');
        } else {
            m_Arr.push(d[key].notes);
        }
        if (d[key].company_name == undefined) {
            m_Arr.push('');
        } else {
            m_Arr.push(d[key].company_name);
        }


        console.info(m_Arr);
        uon_sync.insertI(date, d[key].id, m_Arr)
    }
    return true
}).then(function (i) {
    return direct.getInfo(now, now).then(function (directData) {
        /*перебираем подням*/
        for (j in directData) {
            /*вставляем день*/
            console.info(directData[j]);
            if (directData[j].campaign_id != undefined) {
                d_model.insertI(directData[j].date, {
                    campaign_id: directData[j].campaign_id
                    , clicks: directData[j].clicks
                    , cost: directData[j].cost
                });
            }
        }
    })
}).then(function (i) {
    /*techPlatforms*/
    return metrika.techPlatforms(now, now)
}).then(function (d) {
    /*techPlatforms*/
    m_Arr = [];
    day = '';
    val = '';
    m_key = '';
    for (key2 in d.data) {
        var i = 0;
        for (key in d.time_intervals) {

            day = d.time_intervals[key][0];
            val = d.data[key2].metrics[0][i];
            m_key = d.data[key2].dimensions[0].name;

            m_Arr.push({
                day: day
                , m_key: m_key
                , val: val
            });
            i++;
        }
        for (aa in m_Arr) {
            console.info(aa, m_Arr[aa].m_key);
            if (m_Arr[aa].m_key == 'Windows') {
                techPlatforms_model.insertI(m_Arr[aa].day, 'windows', m_Arr[aa].val);
            }

            if (m_Arr[aa].m_key == 'Google Android') {
                techPlatforms_model.insertI(m_Arr[aa].day, 'android', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'iOS') {
                techPlatforms_model.insertI(m_Arr[aa].day, 'ios', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'Mac OS') {
                techPlatforms_model.insertI(m_Arr[aa].day, 'macos', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'GNU/Linux') {
                techPlatforms_model.insertI(m_Arr[aa].day, 'linux', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'Tizen') {
                techPlatforms_model.insertI(m_Arr[aa].day, 'tizen', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'Другие с Java ME') {
                techPlatforms_model.insertI(m_Arr[aa].day, 'javame', m_Arr[aa].val);
            }
        }

    }
}).then(function (i) {
    /*searchEngineOrganic*/
    return metrika.searchEngineOrganic(now, now)
}).then(function (d) {
    /*techPlatforms*/
    day = '';
    val = '';
    m_key = '';
    m_Arr = [];
    for (key2 in d.data) {
        var i = 0;
        for (key in d.time_intervals) {

            day = d.time_intervals[key][0];
            val = d.data[key2].metrics[0][i];
            m_key = d.data[key2].dimensions[0].name;

            m_Arr.push({
                day: day
                , m_key: m_key
                , val: val
            });
            i++;
        }
        for (aa in m_Arr) {
            console.info(aa, m_Arr[aa].m_key);
            if (m_Arr[aa].m_key == 'Яндекс, результаты поиска') {
                organic_model.insertI(m_Arr[aa].day, 'yandex_search', m_Arr[aa].val);
            }

            if (m_Arr[aa].m_key == 'Мобильный Яндекс') {
                organic_model.insertI(m_Arr[aa].day, 'yandex_mobile', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'Яндекс: мобильное приложение') {
                organic_model.insertI(m_Arr[aa].day, 'yandex_mobile_app', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'Google, результаты поиска') {
                organic_model.insertI(m_Arr[aa].day, 'google_search', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'Mail.ru, результаты поиска') {
                organic_model.insertI(m_Arr[aa].day, 'mail_search', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'Google: мобильное приложение') {
                organic_model.insertI(m_Arr[aa].day, 'google_mobile_app', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'Yahoo, результаты поиска') {
                organic_model.insertI(m_Arr[aa].day, 'yahoo_search', m_Arr[aa].val);
            }
        }
    }
}).then(function (i) {
    /*SourcesSummary*/
    return metrika.SourcesSummary(now, now);
}).then(function (d) {
    /*SourcesSummary*/
    day = '';
    val = '';
    m_key = '';
    m_Arr = [];
    for (key2 in d.data) {
        var i = 0;
        for (key in d.time_intervals) {

            day = d.time_intervals[key][0];
            val = d.data[key2].metrics[0][i];
            m_key = d.data[key2].dimensions[0].name;

            m_Arr.push({
                day: day
                , m_key: m_key
                , val: val
            });
            i++;
        }
        for (aa in m_Arr) {
            console.info(aa, m_Arr[aa].m_key);
            if (m_Arr[aa].m_key == 'Прямые заходы') {
                ym_model.insertI(m_Arr[aa].day, 'traffic_source_direct_calls', m_Arr[aa].val);
            }

            if (m_Arr[aa].m_key == 'Переходы из поисковых систем') {
                ym_model.insertI(m_Arr[aa].day, 'traffic_source_search_system', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'Переходы из социальных сетей') {
                ym_model.insertI(m_Arr[aa].day, 'traffic_source_social_net', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'Переходы по рекламе') {
                ym_model.insertI(m_Arr[aa].day, 'traffic_source_advertising', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'Переходы по ссылкам на сайтах') {
                ym_model.insertI(m_Arr[aa].day, 'traffic_source_sites_links', m_Arr[aa].val);
            }
            if (m_Arr[aa].m_key == 'Переходы с сохранённых страниц') {
                ym_model.insertI(m_Arr[aa].day, 'traffic_source_save_pages', m_Arr[aa].val);
            }
        }
    }
});
