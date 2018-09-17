var events = require('events');
events.defaultMaxListeners = 0;


var Metrika = require('../yandexMetrika');
var ym_model = require('../../indicators/model/i_yandex_metrica_sync');
var m = new Metrika('AQAAAAATl6yDAATRG1YNWrbvz0Z_uYKikBiX_BQ', '35441960');

var monthArr = require('../month_arr');

var day = '';
var val = '';
var m_key = '';
var i_counter = 0;
/*массив для сборки данных*/
var m_Arr = [];

/*вставка рекурсией значения*/
/*todo переписать на синхронную ф-ю*/
function reqInsert() {
    for(aa in m_Arr){
        console.info(aa);
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


/*перебирает месяца рекурсией*/

/*входной параметр элемент массива monthArr*/
function q(m_counter) {
    return new Promise(function (resolve, reject) {
        if (monthArr[m_counter] != null) {
            console.info();
            console.info('////////////////////////' + monthArr[m_counter].date1 + '////////////////////////');
            day = '';
            val = '';
            m_key = '';
            m.SourcesSummary(monthArr[m_counter].date1, monthArr[m_counter].date2).then(function (d) {
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
                    //  console.info('---------------------------------');
                }
                //
                return true
            }).then(function (i) {
                resolve(q(m_counter - 1));
            });
        } else {
            resolve(true);
        }
    });

}

function t(m_counter) {
    return new Promise(function (resolve, reject) {
        if (monthArr[m_counter] != null) {
            console.info(monthArr[m_counter]);
            resolve(t(m_counter - 1));
        } else {
            resolve(true);
        }
    });
}


console.info(monthArr.length);
//t(monthArr.length-1);

q(monthArr.length - 1).then(function (i) {
    console.info('db-insetrt: '+m_Arr.length);
    /*вставляем в базу когда дошли до конца*/
    reqInsert();
    return true;
    //return reqInsert();

}).then(function (i) {
    console.info('done');
});








