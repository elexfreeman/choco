// модальное окно при нажатии на кнопку корзине в top-Menu
import React, {Component} from 'react';
import {connect} from 'react-redux';

import CartModalItem from './CartModalItem'
import {pricePipe} from "../base/pipes/price_pipe";


// кнопка корзины в главном меню
class CartButtonModal extends Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);

        let s = props.products.reduce((s, item) => s + (item.count * item.price), 0);
        let cartLink = '/cart';
        if ((localStorage.getItem('apiKey') !== null) && (localStorage.getItem('apiKey') !== '')) {
            cartLink = '/user/cart';
        }

        this.state = {
            summa: s
            , cartLink: cartLink
        }
    }

    onDelete(productId) {
        this.props.onDeletedCartItem(productId);
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.products.length !== prevProps.products.length) {
            /*высчитываем сумму*/
            let s = this.props.products.reduce((s, item) => s + (item.count * item.price), 0);
            this.setState({
                summa: s
            })
        }
    }


    render() {
        return (<div>
            <div className={"modal " + this.props.modalVisible}>
                <a onClick={this.props.onClose} className="modal-overlay" aria-label="Close"></a>
                <div className="modal-container">
                    <div className="modal-header">
                        <a onClick={this.props.onClose} className="btn btn-clear float-right" aria-label="Close"></a>
                        <div className="modal-title h5">Ваша корзина</div>
                    </div>
                    <div className="modal-body">
                        <div className="content">

                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th style={{width: '30%'}}>Товар</th>
                                    <th>Кол-во</th>
                                    <th>Цена</th>
                                    <th>Сумма</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.products.map((item, key) =>
                                    <CartModalItem onDelete={this.onDelete} key={key} item={item}/>
                                )}
                                </tbody>
                            </table>

                            <div className='cart-modal-total'>Итого: <b>{pricePipe(this.state.summa)}</b> руб.</div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href={this.state.cartLink} className="btn">Перейти в корзину</a>
                    </div>
                </div>
            </div>
        </div>)
    }
}


/*props from redux*/
function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(CartButtonModal);
