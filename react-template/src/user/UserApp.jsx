import React from 'react';
import {Route, Switch} from 'react-router-dom';

import LoginComponent from "../login/LoginComponent";
import UserDashboard from "./UserDashboard";

import UserEditProfile from "./UserEditProfile";


import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {onUpdateUserData} from '../redux/actions/userInfo';
import {BrowserRouter} from 'react-router-dom';
import UserCart from "./UserCart";
import UserDelivery from "./UserDelivery";
import UserOrder from "./order/UserOrder";

const UserApp = (props) => {

    return (
        <div>
            {props.userInfoReducer.length == 0 ? (
                <LoginComponent/>
            ) : (
                <div className='user'>
                    <div className='center-container-wrap-g'>
                        <div className="container grid-xl center-container">

                                <BrowserRouter>
                                        <Switch>
                                            <Route exact path={'/'}
                                                   render={props => (
                                                       <UserDashboard isLK={true} {...props}/>
                                                   )}/>

                                            <Route path={'/edit_profile'} component={UserEditProfile}/>
                                            <Route path={'/order/:order_id'} component={UserOrder}/>
                                            <Route exact path={'/cart'} component={UserCart}/>
                                            <Route exact path={'/delivery'} component={UserDelivery}/>
                                        </Switch>
                                </BrowserRouter>

                        </div>
                    </div>
                </div>
            )}
        </div>)
};


function mapStateToProps(state) {
    return {
        routing: state.routing
        , userInfoReducer: state.userInfoReducer
    }
}

/*actions from redux*/
function matchDispatchToProps(dispatch) {
    return bindActionCreators({onUpdateUserData: onUpdateUserData}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(UserApp);

