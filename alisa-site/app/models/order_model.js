/*класс модели корзины*/
const conn = require('../../db');

class OrderModel {

    constructor() {
        this.ORDER_NEW = 1;
        this.ORDER_PAYID = 2;
        this.ORDER_IN_ROAD = 3;
        this.ORDER_IN_POST = 4;
        this.ORDER_DONE = 5;
    }


    Get(order_id, user_id) {

        return new Promise((resolve, reject) => {
            let sql = "select * from orders o where (o.id=?)and(o.user_id=?) limit 1";
            conn.query(sql, [order_id, user_id], (data, err) => {
                if (!err) {
                    let resp = JSON.parse(JSON.stringify(data));
                    if (resp.length > 0) {
                        resolve(resp[0]);
                    } else {
                        resolve({});
                    }

                } else {
                    reject(err);
                }
            });
        });
    }

    //выдает продукты к заказу
    GetOrderProducts(order_id) {
        return new Promise((resolve, reject) => {
            let sql = "select " +
                "p.*," +
                "op.price by_price " +
                ", op.summa " +
                ", op.`count` " +
                "From order_products op " +
                "join products p " +
                "on p.id = op.product_id " +
                "where op.order_id = ?";
            conn.query(sql, [order_id], (data, err) => {
                if (!err) {
                    data = JSON.parse(JSON.stringify(data));
                    if (data.length > 0) {
                        resolve(data);
                    } else {
                        resolve([]);
                    }
                } else {
                    reject(err);
                }
            });
        });
    }

    //подсчет суммы продуктов
    GetProductsSumma(products) {
        return products.reduce((sum, item) => {
            return sum + (item.count * item.price);
        }, 0);
    }


    //создает новый заказ для юзер
    async Create(order) {
        let order_id = null;
        //подсчитываем общую сумму
        order.summa = this.GetProductsSumma(order.products);
        order_id = await this.Insert(order);

        await order.products.forEach((product, key) => {
            this.InserOrderProduct(order_id, product);
        });

        let order_products = await this.GetOrderProducts(order_id);

        let summa = 0;
        order_products.forEach((product, key) => {
            summa += (product.price * product.count);
        });

        await this.UpdateOrderPrice(order_id, summa);

        return order_id;
    };

    //вставляет новый заказ
    /* 
        order = {
           user_id: 1
           ,products: [{
               id: 1
               , price: 100
               , count: 2
               , summa: 200
           },
           {
               id: 2
               , price: 200
               , count: 2
               , summa: 400
           }]
           ,summa: 20
           ,delivery_address: 'address 123'
           ,comment: 'my comment'
           , status: _ORDER_STATUS
       }
   */

    // @returns {number} - order_id
    Insert(order) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO orders (`user_id`, `summa` , `delivery_address`, `comment`, `status`) " +
                " VALUES (?, ?, ?, ?, ? )";
            conn.query(sql, [
                order.user_id
                , order.summa
                , order.delivery_address
                , order.comment
                , order.status
            ], function (data, err) {
                if (err) {
                    reject(err);
                }
                resolve(data.insertId);
            });
        });
    }

    InserOrderProduct(order_id, product) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO order_products (`order_id`, `product_id` , `price`, `summa`, `count`) " +
                " VALUES (?, ?, ?, ?, ? )";
            conn.query(sql, [
                order_id
                , product.id
                , product.price
                , product.summa
                , product.count

            ], function (data, err) {
                if (err) {
                    reject(err);
                }
                resolve(data.insertId);
            });
        });
    }

    UpdateOrderPrice(order_id, summa) {
        return new Promise(function (resolve, reject) {
            let sql = "update orders set summa = ? where id = ? ";
            conn.query(sql, [summa, order_id], (resp, err) => {
                if (err) reject({e: err});
                resolve(true);
            });
        });
    }

}


module.exports = OrderModel;
