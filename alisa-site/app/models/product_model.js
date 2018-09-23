let conn = require('../../db');

class ProductModel {

    static get(id) {
        return new Promise(function (resolve, reject) {

            let sql = "select * from products where (id = ?) and (deleted = 0)";
            conn.query(sql, [id], function (data, err) {
                if (!err) {
                    data = JSON.parse(JSON.stringify(data));
                    if (data.length > 0) {
                        resolve(data[0]);
                    } else {
                        resolve(false);
                    }

                } else {
                    reject(err);
                }
            });
        });
    }
}


module.exports = ProductModel;