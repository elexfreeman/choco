import React, {Component} from 'react';

import {OrderModel} from '../../models/order_model';
import {Link} from "react-router-dom";
import UserOrderBread from "./UserOrderBread";
import {rest_server} from "../../models/settings";
import {pricePipe} from "../../base/pipes/price_pipe";
import UserOrderStatus from "../orders/UserOrderStatus";

// кнопка корзины в главном меню
class UserOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order: null
        };
        this.onChangeB = this.onChangeB.bind(this);
    }

    componentDidMount() {
        OrderModel.Get(this.props.match.params.order_id, new XMLHttpRequest()).then(resp => {
            this.setState({order: resp.order}, () => console.log(this.state));
        }).catch(e => {
            console.log(e);
        });
    }


    onChangeB(e) {
        this.setState({[e.target.name]: e.target.value})
    }


    render() {
        return (
            <div>
                <div className="columns">
                    <div className="col-menu-left column col-xs-12 col-sm-12 col-lg-4 col-xl-4 col-3">
                        <div className="menu-left">
                            <div className="head">Личный кабинет</div>
                            <div className="menu">
                                <div className="item">
                                    <a href="/">На главную</a></div>
                                <div className="item">
                                    <Link aria-current="true" to="/">Заказы</Link>
                                </div>
                                <div className="item">
                                    <Link aria-current="false" to="/cart">Корзина</Link>
                                </div>
                                <div className="item">
                                    <a>Выход</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.order && (
                        <div
                            className="user-dashboard column col-xs-12 col-md-12 col-sm-12 col-lg-8 col-xl-8 col-9">
                            <UserOrderBread/>
                            <div>
                                <div className="cart-component">
                                    <div className="container">
                                        <h4>Заказ №{this.state.order.id}</h4>
                                        <div className="order-status">
                                            <p>Статус: <b><UserOrderStatus
                                                status={this.state.order.status}/></b></p>
                                            <p>Номер почтового извещения: <b>9283912832938</b></p>
                                        </div>
                                        <table className="products table table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th>Наименование</th>
                                                <th></th>
                                                <th className='text-center'>Цена</th>
                                                <th className='text-center'>Кол-во</th>
                                                <th className='text-right'>Сумма</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.order.products.map((product, key) =>
                                                <tr key={product.id}>
                                                    <td style={{width: '20%'}}>
                                                        <img className="product-img"
                                                             src={rest_server + product.main_img}/>
                                                    </td>
                                                    <td>{product.caption}</td>
                                                    <td className='text-center'>
                                                        <span>{pricePipe(product.price)}</span>
                                                    </td>
                                                    <td className="count text-center">
                                                        <span>{pricePipe(product.count)}</span>
                                                    </td>
                                                    <td className='text-right'>
                                                        <span>{pricePipe(product.count * product.price)}</span>
                                                    </td>
                                                </tr>
                                            )}

                                            </tbody>
                                        </table>
                                        <div className="summa">
                                            Итого: <span>{pricePipe(this.state.order.summa)}</span> руб.
                                        </div>
                                    </div>
                                </div>

                                <div className="delivery">
                                    <h4>Доставка</h4>
                                    <div className="form-group">
                                        <label className="form-label">Адрес доставки:</label>
                                        <div><b>{this.state.order.delivery_address}</b></div>
                                    </div>
                                    <div className="delivery_description">
                                        Доставка осуществляется "Почтой России".
                                    </div>
                                </div>

                                <div className="cart-complete">
                                    <div className="container">
                                        <div className="columns">
                                            <div className="column col-xs-4 text-right">
                                                <button className="btn btn-success btn-pay">К оплате</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>
                    )}

                </div>
            </div>
        )
    }
}


export default UserOrder;
