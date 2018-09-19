import React, {Component} from 'react';

import {OrdersModel} from '../../models/orders_model';

import UserOrderProducts from './UserOrderProducts';
import {mysqlDatePipe} from "../../base/pipes/date_pipe";
import {pricePipe} from "../../base/pipes/price_pipe";
import UserOrderStatus from "./UserOrderStatus";
import {Link} from "react-router-dom";


// кнопка корзины в главном меню
class UserOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            limit: 10
            , offset: 0
            , orders: []
        };

        this.onChangeB = this.onChangeB.bind(this);

    }

    componentDidMount() {
        OrdersModel.Get(this.state.offset, this.state.limit, new XMLHttpRequest()).then(resp => {
            this.setState({orders: resp.orders}, () => console.log(this.state));
        }).catch(e => {
            console.log(e);
        });
    }


    onChangeB(e) {
        this.setState({[e.target.name]: e.target.value})
    }


    render() {
        return (<div className='user-orders'>
            <div className='base-head'>Мои заказы</div>
            <div className="container orders-container">
                {this.state.orders.map((order, key) =>
                    <div key={order.id}>
                        <Link to={'/order/'+order.id}>
                            <div className="columns">
                                <div className="column col-1 col-md-12">
                                    № <b>{order.id}</b><br/>от {mysqlDatePipe(order.date)}
                                </div>
                                <div className="column col-5 col-md-12">
                                    <UserOrderProducts order_id={order.id}/>
                                </div>
                                <div className="column col-2 col-md-12">
                                    <UserOrderStatus status={order.status}/>
                                </div>
                                <div className="column col-4 col-md-12 text-right summa">
                                    {pricePipe(order.summa)} руб <i className="icon icon-arrow-right"></i>
                                </div>
                            </div>
                        </Link>
                        <hr/>
                    </div>
                )}
            </div>
        </div>)
    }
}


export default UserOrders;
