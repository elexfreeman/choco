var events = require('events');
events.defaultMaxListeners = 0;


var monthArr = require('../month_arr');

var Direct = require('../yandexDirect');
var d_model = require('../../indicators/model/direct_sync');
var m = new Direct('AQAAAAATl6yDAATRG1YNWrbvz0Z_uYKikBiX_BQ', '35441960');



for(key in monthArr){
    console.info(monthArr[key]);

    /*получаем инфу о месяце*/
    m.getInfo(monthArr[key].date1, monthArr[key].date2).then(function (directData) {
        /*перебираем подням*/
        for(j in directData){
            /*вставляем день*/
            d_model.insertI(directData[j].date,{
                campaign_id:directData[j].campaign_id
                ,clicks:directData[j].clicks
                ,cost:directData[j].cost
            });
            console.info(directData[j].date, directData[j].campaign_id );

        }
    })

}







