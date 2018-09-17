/*Обертка для корзины*/
import React, {Component} from 'react';
import CartComponent from "../CartComponent/CartComponent";
import UserMenu from "./UserMenu";
import UserBread from "./UserBread";
import UserRegister from "./UserRegister";
import CartComplete from "../CartComponent/CartComplete";

class UserCart extends Component {

    constructor(props) {
        super(props);
        this.state = {};
       /* this.onChangeB = this.onChangeB.bind(this);*/
    }

    render() {
        return (
            <div>
                {this.props.isLK ? (
                    <div className='columns'>
                        <UserMenu/>
                        <div className='user-dashboard column col-xs-12 col-md-12 col-sm-12 col-lg-8 col-xl-8 col-9'>
                            <UserBread caption={'Корзина'}/>
                            <CartComponent/>
                            <UserRegister/>
                            <CartComplete/>
                        </div>
                    </div>
                ) : (
                    <div>
                        <CartComponent/>
                        <UserRegister/>
                        <CartComplete/>
                    </div>
                )}

            </div>
        )
    }


}

export default UserCart;