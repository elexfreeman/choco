var Metrika = require('../../app/lib/yandexMetrika');
var ym_model = require('../../app/indicators/model/i_yandex_metrica');
var m = new Metrika('AQAAAAATl6yDAATRG1YNWrbvz0Z_uYKikBiX_BQ', '35441960');

var day = '';
var val = '';
var m_key = '';
var i_counter = 0;
/*массив для сборки данных*/
var m_Arr = [];
/*вставка рекурсией значения*/
function reqInsert() {
    console.info(i_counter);
    console.info(m_Arr[i_counter]);
    if(m_Arr[i_counter] != null){
        if (m_Arr[i_counter].m_key == 'Прямые заходы') {
            ym_model.insertI(m_Arr[i_counter].day, 'traffic_source_direct_calls', m_Arr[i_counter].val).then(function (i) {
                i_counter++;
                reqInsert();
            });
        }

        if (m_Arr[i_counter].m_key == 'Переходы из поисковых систем') {
            ym_model.insertI(m_Arr[i_counter].day, 'traffic_source_search_system', m_Arr[i_counter].val).then(function (i) {
                i_counter++;
                reqInsert();

            });
        }

        if (m_Arr[i_counter].m_key == 'Переходы из социальных сетей') {
            ym_model.insertI(m_Arr[i_counter].day, 'traffic_source_social_net', m_Arr[i_counter].val).then(function (i) {
                i_counter++;
                reqInsert();
            });
        }

        if (m_Arr.m_key == 'Переходы по рекламе') {
            ym_model[i_counter].insertI(m_Arr.day, 'traffic_source_advertising', m_Arr[i_counter].val).then(function (i) {
                i_counter++;
                reqInsert();
            });
        }
    }
}
var params = {
    row_ids:'[["direct"],["organic","organic.yandex"],["social","social.vkontakte"],["ad"]]'
    ,date1:'2018-02-01'
    ,date2:'2018-02-28'
    ,group:'day'
    ,dimensions:'ym:s:<attribution>TrafficSource,ym:s:<attribution>SourceEngine'
    ,attribution:'last'
    ,ids:'35441960'
    ,metrics:'ym:s:visits'
    ,oauth_token:'AQAAAAATl6yDAATRG1YNWrbvz0Z_uYKikBiX_BQ'
};

m.requestGet('api-metrika.yandex.ru','/stat/v1/data/bytime',params).then(function (d) {

    for (key2 in d.data) {
        var i = 0;
        for (key in d.time_intervals) {

            day = d.time_intervals[key][0];
            val = d.data[key2].metrics[0][i];
            m_key = d.data[key2].dimensions[0].name;

            console.info(d.data[key2].dimensions[0]);

            m_Arr.push({
                day: day
                ,m_key: m_key
                ,val: val
            });
            i++;
        }
        console.info('---------------------------------');
    }

    i_counter = 0;
    reqInsert(m_Arr)
});
