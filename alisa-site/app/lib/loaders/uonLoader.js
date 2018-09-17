var events = require('events');
events.defaultMaxListeners = 0;


var moment = require('moment');
/*модель работы с базой*/
var uon_sync = require('../../indicators/model/uon_sync');
/*клас для загрузки с апи юона*/
var Uon = require('../uon');
var u = new Uon('K5sDAOPv30ri4igOt404');
var monthArr = require('../month_arr');
var date;

var day = '';
var val = '';
var m_key = '';
var i_counter = 0;
/*массив для сборки данных*/
var m_Arr = [];


/*входной параметр элемент массива monthArr*/
function q(m_counter) {
    return new Promise(function (resolve, reject) {
        if (monthArr[m_counter] != null) {
            console.info();
            console.info('////////////////////////' + monthArr[m_counter].date1 + '////////////////////////');

            /*получаем лиды из юона*/
            u.leads(monthArr[m_counter].date1, monthArr[m_counter].date2).then(function (d) {
                /*перебираем полученные данные*/
                for (key in d) {
                    date = moment(d[key].dat).format('YYYY-MM-DD');
                    console.info(date);
                    console.info(d[key]);
                    m_Arr = [];
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
                    uon_sync.insertI(date, d[key].id,  m_Arr)
                }
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
    console.info('db-insetrt: ' + m_Arr.length);
    /*вставляем в базу когда дошли до конца*/
    return true;
    //return reqInsert();

}).then(function (i) {
    console.info('done');
});








