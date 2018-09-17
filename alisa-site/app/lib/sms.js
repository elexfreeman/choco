/*Случайное целое между min и max*/
var conn = require('../../db');
var mainsms = require('./mainsms')('73ababdf26940');

class Sms {

// использование Math.round() даст неравномерное распределение!
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    /*отправляет смс с паролем  выдат пароль*/
    static getSmsPass(user_phone) {
        return new Promise((resolve, reject) => {
            var rndPass = getRandomInt(1000, 9999);
            sendSms(user_phone, rndPass).then(resp => {
                resolve(rndPass);
            });
        });
    }

    static getLastSmsPass(user_id) {
        return new Promise((resolve, reject) => {
            var sql = 'select * From user_sms_login_data usl ' +
                'where ' +
                '(usl.user_id = ?) and ' +
                '(usl.s_date > DATE_SUB(NOW(), INTERVAL 3 MINUTE)) ' +
                'order by usl.s_date desc limit 1';
            conn.query(sql, [user_id], (data, err) => {

                    var response = JSON.stringify(data);
                    response = JSON.parse(response);
                    if (response != null) {
                        resolve(response[0]);
                    } else {
                        reject(err);
                    }
                }
            )
            ;
        });
    }


    static sendSms(recipient, msg) {
        return new Promise((resolve, reject) => {

                /*проверяем phone*/
                if (recipient.length === 11) {
                    resolve(true);
                 /*   console.log('test');
                    recipient = recipient.substring(1, recipient.length);
                    mainsms.message.send({
                            test: 0,
                            run_at: undefined,
                            sender: 'sendertest',
                            project: 'chocko',
                            recipients: [recipient],
                            message: msg
                        }, (err, res) => {
                            if (err) reject(err);
                            resolve(res);
                        }
                    );*/
                } else {
                    reject({e: 'cant send sendSms'});
                }
            }
        );
    }

}


if (module.parent) {
    module.exports = Sms;
} else {

    Sms.sendSms('89639130484', 'Привет заказ 1').then(resp => console.log(resp)).catch(e => console.log(e));

}