/*Обертка для корзины*/
import React, {Component} from 'react';
import CartComponent from "../CartComponent/CartComponent";
import UserMenu from "./UserMenu";
import UserBread from "./UserBread";
import UserRegister from "./UserRegister";
import CartComplete from "../CartComponent/CartComplete";

import {connect} from 'react-redux';

import {OrderModel} from "../models/order_model";
import DeliveryComponent from "../CartComponent/DeliveryComponent";
import {bindActionCreators} from "redux";

import {onClear} from "../redux/actions/cart";
import {url_pref} from "../models/url_pref";

class UserCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            delivery: localStorage.getItem('delivery_address')
            , delivery_error: false
            , isRegistered: props.isLK
        };
        this.onCheckout = this.onCheckout.bind(this);
        this.onChangeRegistered = this.onChangeRegistered.bind(this);
    }

    onChangeRegistered(e) {
        this.setState({isRegistered: e});
    }

    async onCheckout(e) {
        console.log(this.props);
        if (this.props.isLK) {
            if (this.state.delivery.length > 3) {
                let order = {
                    delivery_address: this.state.delivery,
                    comment: '',
                    products: this.props.cart
                };

                let resp = await OrderModel.Create(order, new XMLHttpRequest());
                this.props.onClear();
                this.props.history.push(url_pref().url_prifix + 'order/' + resp.order_id);
            } else {
                this.setState({delivery_error: true});
            }

        } else {
            /*регистрация юзера пото все остальное*/
        }


    }

    componentDidMount() {

    }


    render() {
        return (
            <div>
                {this.props.isLK ? (
                    <div className='columns'>
                        <UserMenu/>
                        <div className='user-dashboard column col-xs-12 col-md-12 col-sm-12 col-lg-8 col-xl-8 col-9'>
                            <UserBread caption={'Корзина'}/>
                            {this.props.cart.length > 0 ? (
                                <div>
                                    <CartComponent/>
                                    <DeliveryComponent
                                        delivery_error={this.state.delivery_error}
                                        onChange={d => this.setState({delivery: d, delivery_error: false})}/>
                                    <UserRegister
                                        onChangeRegistered={this.onChangeRegistered}
                                        isRegistered={this.state.isRegistered}/>
                                    <CartComplete
                                        isRegistered={this.state.isRegistered}
                                        checkout={this.onCheckout}/>
                                </div>
                            ) : (
                                <div>
                                    Корзина пустая
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        {this.props.cart.length > 0 ? (
                            <div>
                                <CartComponent/>
                                <DeliveryComponent/>
                                <UserRegister
                                    onChangeRegistered={this.onChangeRegistered}
                                    isRegistered={this.state.isRegistered}/>
                                <CartComplete
                                    isRegistered={this.state.isRegistered}
                                    checkout={this.onCheckout}/>
                            </div>
                        ) : (
                            <div>
                                Корзина пустая
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        cart: state.cart
    }
}


/*actions from redux*/
function matchDispatchToProps(dispatch) {
    return bindActionCreators({onClear: onClear}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UserCart);
