/*класс модели юзера*/
var conn = require('../../db');
var path = require('path');
var crypto = require('crypto');
var base64url = require('base64url');

class UserModel {


    constructor() {
        this.avatarPath = path.join(__dirname, '../../public') + '/images/avatars/';
        this.avatarSrc = '/images/avatars/';
        this.avatarDefault = 'profle-512.png';
    }

    static getInfoByPhone(phone) {
        return new Promise(function (resolve, reject) {
            let sql = "select \n" +
                "u.* \n" +
                ",uapk.apiKey \n" +
                "from users u \n" +
                "join user_apikey uapk \n" +
                "on uapk.user_id=u.id \n" +
                "where u.phone=? limit 1";
            conn.query(sql, [UserModel.phoneFormat(phone)], (resp, err) => {
                if (err) reject({e: err});
                let user = JSON.parse(JSON.stringify(resp))[0];
                if (user === undefined) {
                    reject({e: 'getInfoByPhone - cant find user'})
                } else {
                    resolve(user);
                }

            })
        });
    }

    static update(userId, arg) {
        return new Promise(function (resolve, reject) {
            let sql = "update users set name = ?, surname = ?, patronymic = ?, email = ?, avatar=? where id = ? ";

            conn.query(sql, [arg.name, arg.surname, arg.patronymic, arg.email, arg.avatar, userId], (resp, err) => {
                if (err) reject({e: err});

                resolve(true);
            });
        });
    }

    static getUserById(userId) {
        return new Promise(function (resolve, reject) {
            /*получем такую строчку*/
            conn.query("select \n" +
                "u.* \n" +
                ",uapk.apiKey \n" +
                "from users u \n" +
                "join user_apikey uapk \n" +
                "on uapk.user_id=u.id \n" +
                "where u.id=? limit 1", userId, (resp, err) => {
                if (err) reject(err);
                resolve(JSON.parse(JSON.stringify(resp))[0]);
            });
        });
    }

    static getUserInfoByApiKey(api_key) {
        let that = this;
        return new Promise(function (resolve, reject) {
            conn.query("select u.`*`, upk.apiKey from users u " +
                "join user_apikey upk " +
                "on upk.user_id=u.id " +
                "where upk.apiKey = ? " +
                "order by upk.`date` desc limit 1", api_key, (resp, err) => {
                if (err) reject(err);
                let response = JSON.parse(JSON.stringify(resp))[0];

                if (response === undefined) {
                    reject(1);
                } else {
                    if (response.avatar == null) {
                        response.avatar = that.avatarSrc + that.avatarDefault;
                    } else {
                        response.avatar = response.avatar;
                    }
                    resolve(response);
                }
            });
        })
    }


    static getApiKeyBySms(user_phone, sms_pass) {
        return new Promise(function (resolve, reject) {
            var sql = "SELECT *" +
                " FROM (" +
                " SELECT u.*, apk.apiKey, apk.`date`, " +
                " (" +
                " SELECT usl.code" +
                " FROM user_sms_login_data usl" +
                " WHERE " +
                " (usl.user_id=u.id) AND" +
                " (usl.s_date> DATE_SUB(NOW(), INTERVAL 10 MINUTE))" +
                " ORDER BY usl.s_date DESC" +
                " LIMIT 1" +
                " ) sms" +
                " FROM users u" +
                " JOIN user_apikey apk ON apk.user_id=u.id" +
                " WHERE " +
                " (u.phone = ?)" +
                " ORDER BY apk.`date` DESC" +
                " LIMIT 1" +
                ") a" +
                " HAVING sms = ?";


            conn.query(sql, [user_phone, sms_pass], (resp, err) => {

                if (err) reject(err);
                let response = JSON.parse(JSON.stringify(resp))[0];
                if (response === undefined) {
                    reject(1);
                } else {
                    resolve(response.apiKey)
                }
            });
        });
    }

    /*todo сделать флрматирование к ст виду 71234567899*/
    static phoneFormat(phone) {
        return phone;
    }

    static generateApiKey() {
        return base64url(crypto.randomBytes(48));
    }


    static registerUser(arr) {
        return new Promise(function (resolve, reject) {
            /*форматируем телефон*/
            arr.phone = UserModel.phoneFormat(arr.phone);
            /*если есть телефон*/
            if (arr.phone !== undefined) {

                if (arr.name === undefined) {
                    arr.name = '';
                }

                if (arr.surname === undefined) {
                    arr.surname = '';
                }

                if (arr.patronymic === undefined) {
                    arr.patronymic = '';
                }

                if (arr.email === undefined) {
                    arr.email = '';
                }

                if (arr.birthday === undefined) {
                    arr.birthday = null;
                }

                let user = [arr.phone, arr.name, arr.surname, arr.patronymic, arr.email, arr.birthday];
                let sql = "INSERT INTO users (`create_date`, `phone`, `name`, `surname`, `patronymic`, `email`, `birthday`) " +
                    " VALUES (now(), ?, ?, ?, ?, ?, ?)";
                conn.query(sql, user, (resp, err) => {
                    if (err) reject(err);
                    let userId = resp.insertId;
                    /*генерим apiKey*/
                    let sql = "INSERT INTO user_apikey (`date`, `user_id`, `apiKey`) " +
                        " VALUES (now(), ?, ?)";
                    conn.query(sql, [userId, UserModel.generateApiKey()], (resp, err) => {
                        if (err) reject(err);
                        UserModel.getUserById(userId).then(resp => {
                            resolve(resp);
                        })

                    });
                });
            } else {
                reject({e: 'registerUser cant create user without phone'});
            }
        })
    }

    /*выдает ключ по телефону и одноразовому паролю*/
    static getApiKeyBySms(user_phone, sms_pass) {
        return new Promise(function (resolve, reject) {
            var sql = "SELECT *" +
                " FROM (" +
                " SELECT u.*, apk.apiKey, apk.`date`, " +
                " (" +
                " SELECT usl.code" +
                " FROM user_sms_login_data usl" +
                " WHERE " +
                " (usl.user_id=u.id) AND" +
                " (usl.s_date> DATE_SUB(NOW(), INTERVAL 10 MINUTE))" +
                " ORDER BY usl.s_date DESC" +
                " LIMIT 1" +
                " ) sms" +
                " FROM users u" +
                " JOIN user_apikey apk ON apk.user_id=u.id" +
                " WHERE " +
                " (u.phone = ?)" +
                " ORDER BY apk.`date` DESC" +
                " LIMIT 1" +
                ") a" +
                " HAVING sms = ?";


            conn.query(sql, [user_phone, sms_pass], (resp, err) => {
                if (err) reject(err);
                let response = JSON.parse(JSON.stringify(resp))[0];
                if (response === undefined) {
                    reject(1);
                } else {
                    resolve(response.apiKey)
                }
            });
        });
    }


    /*выдает последний смс пароль юзера по телефону*/
    static getUserLastSmsPass(phone) {
        return new Promise(function (resolve, reject) {
            let sql = " SELECT u.*, apk.apiKey, apk.`date`, \n" +
                " (\n" +
                " SELECT usl.code\n" +
                " FROM user_sms_login_data usl\n" +
                " WHERE \n" +
                " (usl.user_id=u.id) AND\n" +
                " (usl.s_date> DATE_SUB(NOW(), INTERVAL 10 MINUTE))\n" +
                " ORDER BY usl.s_date DESC\n" +
                "LIMIT 1\n" +
                ") sms\n" +
                " FROM users u\n" +
                "JOIN user_apikey apk ON apk.user_id=u.id\n" +
                " WHERE \n" +
                " (u.phone = ?)\n" +
                " ORDER BY apk.`date` DESC\n" +
                " LIMIT 1";
            conn.query(sql, [phone], (resp, err) => {
                if (err) reject(err);
                let response = JSON.parse(JSON.stringify(resp))[0];
                if ((response === undefined) || (response.sms == null)) {
                    reject(response);
                } else {
                    resolve(response.sms)
                }
            });
        });
    }

    /*вставляет новый смс пароль*/
    static insertNewUserSmsPas(userId) {
        return new Promise(function (resolve, reject) {
            let sql = "INSERT INTO user_sms_login_data (`user_id`, `s_date`, `code`) VALUES (?, NOW(), ?);";
            let pass = parseInt(Math.random() * (9999 - 1000) + 1000);
            conn.query(sql, [userId, pass], (resp, err) => {
                if (err) reject(err);
                resolve(pass);
            });
        });
    }

    /*генерирует новый смс пароль для юзера*/
    static generateUserSmsPass(phone) {
        return new Promise(function (resolve, reject) {
            /*ессли етсть такой юзер*/
            UserModel.getInfoByPhone(phone).then(user => {
                //user = resp;
                /*получаем последний пароль*/
                UserModel.getUserLastSmsPass(phone).then(resp => {
                    resolve(resp);
                }).catch(e => {
                    /*если пароля нету */
                    /*гененрим*/
                    UserModel.insertNewUserSmsPas(user.id).then(resp => {
                        /*возвр пароль*/
                        resolve(resp);
                    }).catch(e => reject({e: e}));
                });
            }).catch(e => reject({e: 'generateUserSmsPass cant find user'}));
            /*если юзера нету*/
        });
    }
}


module.exports = UserModel;
