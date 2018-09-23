let conn = require('../../db');

class ProductsModel {

    static get(offset, limit) {
        return new Promise((resolve, reject) => {
            let sql = "select * from products p where (deleted = 0) order by p.caption limit ?, ?";
            conn.query(sql, [offset, limit], function (data, err) {
                if (!err) {
                    data = JSON.parse(JSON.stringify(data));
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    }

    static getTotal(){
        return new Promise((resolve, reject) => {
            let sql = "select count(*) cc from products p";
            conn.query(sql, [], function (data, err) {
                if (!err) {
                    data = JSON.parse(JSON.stringify(data));
                    resolve(data[0].cc);
                } else {
                    reject(err);
                }
            });
        });
    }

}


module.exports = ProductsModel;