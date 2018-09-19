import React from 'react';

const UserOrderStatus = ({status, label}) => {

    let order_status = '';
    if (parseInt(status) == 1) {
        order_status = 'Ожидает отплаты'
    }
    if (parseInt(status) == 2) {
        order_status = 'Заказ оплачен'
    }
    if (parseInt(status) == 3) {
        order_status = 'В пути'
    }
    if (parseInt(status) == 4) {
        order_status = 'В пункте выдачи'
    }
    if (parseInt(status) == 5) {
        order_status = 'Завершен'
    }

    return (<span className={label && ("label label-primary")}>{order_status}</span>)

};

export default UserOrderStatus;
