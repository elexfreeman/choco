/*класс модели корзины*/
const conn = require('../../db');

class CartModel {

    static Get(products) {
        return new Promise(function (resolve, reject) {

            let sql = "select * from products p where (p.id in (" + products + ") ) and (p.deleted = 0) order by p.caption";
            conn.query(sql, [], function (data, err) {
                if (!err) {
                    data = JSON.parse(JSON.stringify(data));
                    if (data.length > 0) {
                        resolve(data);
                    } else {
                        reject(1);
                    }
                } else {
                    reject(err);
                }
            });
        });
    }
}


module.exports = CartModel;
