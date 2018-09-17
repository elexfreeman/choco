// модальное окно при нажатии на кнопку корзине в top-Menu
import React, {Component} from 'react';
import {connect} from 'react-redux';

import CartModalItem from './CartModalItem'


// кнопка корзины в главном меню
class CartButtonModal extends Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete(productId) {
        this.props.onDeletedCartItem(productId);
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
                                    <th>Товар</th>
                                    <th>Кол-во</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.products.map((item, key) => <CartModalItem onDelete={this.onDelete}
                                                                                       key={key} item={item}/>)}
                                </tbody>
                            </table>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="/cart" className="btn">Перейти в корзину</a>
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
