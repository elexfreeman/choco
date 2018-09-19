/*класс модели корзины*/
const conn = require('../../db');

class OrdersModel {

    constructor() {
        this.ORDER_NEW = 1;
        this.ORDER_PAYID = 2;
        this.ORDER_IN_ROAD = 3;
        this.ORDER_IN_POST = 4;
        this.ORDER_DONE = 5;
    }


    /* списк заказов юзера по дате */
    Get(user_id, offset, limit) {       
        return new Promise((resolve, reject) => {
            let sql = "select * from orders o where " +
                "(o.user_id=?) " +
                "order by o.`date` desc " +
                "limit ?, ?";
            conn.query(sql, [user_id, parseInt(offset), parseInt(limit)], (data, err) => {
                if (!err) {
                    resolve(JSON.parse(JSON.stringify(data)));
                } else {
                    reject(err);
                }
            });
        });
    }


}


module.exports = OrdersModel;
