var conn = require('../../../db');
let UserModel = require('../../models/user_model');
let Sms = require('../../lib/sms');
/*модуль логина/регистрации юзера в систему*/

/*построен на промисах*/

class Login extends UserModel {

    static generateSmsPass(phone) {
        return new Promise(function (resolve, reject) {
            UserModel.getInfoByPhone(phone).then(resp => {
                /*такой пользователь есть генерим ему пароль*/
                UserModel.generateUserSmsPass(phone).then(pass => {
                    /*отправляем смс*/
                    Sms.sendSms(phone, 'Пароль: ' + pass)
                        .then(resp => resolve(pass))
                        .cache(e => reject(e))

                }).catch(e => {
                    reject(e);
                });
            }).catch(e => {
                /*такого юзеоа нету*/
                /*создаем нвого юзера*/
                UserModel.registerUser({phone: phone}).then(resp => {
                    /*генерируем пароль*/
                    UserModel.generateUserSmsPass(phone).then(pass => {
                        /*отправляем смс*/
                        Sms.sendSms(phone, 'Пароль: ' + pass)
                            .then(resp => resolve(pass))
                            .cache(e => reject(e));

                    }).catch(e => {
                        reject(e);
                    });
                }).catch(e => reject(e));

            })
        });
    }
}


module.exports = Login;
