import React, {Component} from 'react';
import {connect} from 'react-redux';

import Summa from './Summa';

import {cartAdd} from './Cart';

class ProductOrder extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            count: '1'
        };
        this.handlCountChange = this.handlCountChange.bind(this);
        this.addCart = this.addCart.bind(this);
    }

    handlCountChange(event) {
        event.preventDefault();
        this.setState({count: event.target.value});
    }

    addCart() {
        console.log(this.props);
        this.props.onAddCart({
            count: parseInt(this.state.count),
            productId: this.props.productId
        });
    }


    render() {
        return (<div className="product-order">
            <Summa price={this.props.price} count={this.state.count}/>
            <div className="divider"></div>

            <div className="columns">

                <div className="form-horizontal column col-xs-6 col-md-6 col-sm-6 col-lg-6 col-xl-6 col-6">

                    <div className="form-group">
                        <div className="col-4 col-xs-6 col-md-6 col-lg-6 col-sm-12">
                            <label className="form-label">Кол-во:</label>
                        </div>
                        <div className="col-4 col-xs-6 col-md-4 col-lg-6 col-sm-12">
                            <input value={this.state.count} onChange={this.handlCountChange} type='number'
                                   className="form-input"/>
                        </div>
                    </div>
                </div>
                <div className="to_cart column col-xs-12 col-sm-12 col-lg-6 col-xl-6 col-6">
                    <button className="btn btn-primary  btn-lg" onClick={this.addCart}>
                        <i className="fa fa-cart-plus" aria-hidden="true"></i>&nbsp; В корзину
                    </button>
                </div>
            </div>
            <div className="divider"></div>
        </div>)
    };

}

export default connect(state => ({cart: state}), dispatch => ({
    onAddCart: (item) => {
        cartAdd(item);
        dispatch({type: 'ADD_CART', payload: item});
    }

}))(ProductOrder);
