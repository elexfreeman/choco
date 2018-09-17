import React, {Component} from 'react';
import {connect} from 'react-redux';

import Summa from './Summa';
import CommitModal from './CommitModal';

import {onAddCart} from '../redux/actions/cart';
import {bindActionCreators} from "redux";


class ProductOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: '1'
            , modalVisible: false
        };
        this.handlCountChange = this.handlCountChange.bind(this);
        this.addCart = this.addCart.bind(this);
    }

    handlCountChange(event) {
        event.preventDefault();
        if (event.target.value <= 0) {
            this.setState({count: 1});
        } else {
            this.setState({count: event.target.value});
        }
    }

    addCart() {
        this.props.onAddCart({
            count: this.state.count,
            productId: this.props.productId
            ,cart: this.props.cart
        });

        this.setState({modalVisible: true});
        setTimeout(() => {
            this.setState({modalVisible: false});
        }, 800)
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
            <CommitModal visible={this.state.modalVisible}/>
        </div>)
    };

}


/*props from redux*/
function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}

/*actions from redux*/
function matchDispatchToProps(dispatch) {
    return bindActionCreators({onAddCart: onAddCart}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductOrder);
