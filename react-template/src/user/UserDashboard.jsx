import React, {Component} from 'react';
import UserOrders from "./orders/UserOrders";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {onUpdateUserData} from '../redux/actions/userInfo';
import NavLink from "react-router-dom/es/NavLink";
import {rest_server} from '../models/settings';
import UserMenu from "./UserMenu";

// кнопка корзины в главном меню
class UserDashboard extends Component {
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
                    <div className='user-head'>
                        <div className="container">

                            <div className="columns">
                                <div className="column col-3 col-sm-12">
                                    <img className='user-avatar'
                                         src={rest_server + this.props.userInfoReducer.avatar}
                                         alt="..."/>
                                </div>
                                <div className="column col-6 col-sm-12">
                                    <h4>{this.props.userInfoReducer.surname} {this.props.userInfoReducer.name} {this.props.userInfoReducer.patronymic}</h4>
                                    <p>{this.props.userInfoReducer.phone}</p>
                                    <p>{this.props.userInfoReducer.email}</p>
                                </div>
                                <div className="column col-3 col-sm-12 text-right">
                                    <NavLink className="btn btn-primary btn-lg" to={'/edit_profile'}>
                                        <i className="icon icon-edit"></i>
                                    </NavLink>
                                </div>

                            </div>

                        </div>
                    </div>
                    <UserOrders user={this.props.user}/>
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


export default connect(mapStateToProps, matchDispatchToProps)(UserDashboard);

