const conn = require('../../db');
const path = require('path');


class ManufacturerModel {
    constructor() {
        this.logoPath = path.join(__dirname, '../../public') + '/images/manufacturer/';
        this.avatarSrc = '/images/manufacturer/';
        this.avatarDefault = 'default.jpg';
    }

    static getAll() {
        return new Promise(function (resolve, reject) {
            let sql = "select * from manufacturer m order by m.caption";
            conn.query(sql, [], (resp, err) => {
                if (err) reject(err);
                resolve(JSON.parse(JSON.stringify(resp)));
            });
        })


    }
}

module.exports = ManufacturerModel;