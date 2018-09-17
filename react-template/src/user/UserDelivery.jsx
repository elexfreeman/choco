import React, {Component} from 'react';


import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {onUpdateUserData} from '../redux/actions/userInfo';

import UserMenu from "./UserMenu";
import UserBread from "./UserBread";

// кнопка корзины в главном меню
class UserDelivery extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.onChangeB = this.onChangeB.bind(this);
        console.log(props);

    }


    onChangeB(e) {
        this.setState({[e.target.name]: e.target.value})
    }


    render() {
        return (
            <div className='columns'>
                <UserMenu/>
                <div className='user-dashboard column col-xs-12 col-md-12 col-sm-12 col-lg-8 col-xl-8 col-9'>
                    <UserBread caption={'Доставка'}/>

                </div>
            </div>)
    }
}

function mapStateToProps(state) {
    return {

        userInfoReducer: state.userInfoReducer
    }
}

/*actions from redux*/
function matchDispatchToProps(dispatch) {
    return bindActionCreators({onUpdateUserData: onUpdateUserData}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(UserDelivery);

