import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {onUpdateUserData} from '../redux/actions/userInfo';

/*регистрация пользователя*/
class UserRegister extends Component {
    constructor(props) {
        super(props);

        if (props.userInfoReducer.length === 0) {
            this.state = {
                name: ''
                , surname: ''
                , patronymic: ''
                , email: ''
                , avatar: ''
                , phone: ''
                , photo: null
            };
        } else {
            this.state = {
                name: props.userInfoReducer.name
                , surname: props.userInfoReducer.surname
                , patronymic: props.userInfoReducer.patronymic
                , email: props.userInfoReducer.email
                , avatar: props.userInfoReducer.avatar
                , phone: props.userInfoReducer.phone
                , photo: null
            };
        }

        this.onChangeB = this.onChangeB.bind(this);

    }


    onChangeB(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {

        if ( window.localStorage.getItem('cart')!=null) {
            document.getElementById('u_name').value = this.state.name;
            document.getElementById('u_phone').value = this.state.phone;
        }
    }

    render() {
        return (
            <div>
                {window.localStorage.getItem('cart')!=null && (
                    <div className='user-register'>
                        <h4>Контактные данные</h4>
                        <div className='columns'>
                            <div className='column col-6 col-sm-12'>
                                <div className="form-horizontal">
                                    <div className="form-group">
                                        <div className="col-3 col-sm-12">
                                            <label className="form-label">Ваше имя</label>
                                        </div>
                                        <div className="col-9 col-sm-12">
                                            <input disabled id='u_name' className="form-input" type="text"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-3 col-sm-12">
                                            <label className="form-label">Телефон</label>
                                        </div>
                                        <div className="col-9 col-sm-12">
                                            <input disabled id='u_phone' className="form-input" type="text"
                                                   placeholder="+7.."/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

            </div>)
    }
}


function mapStateToProps(state) {
    let st = state.userInfoReducer;
    if (!(st.length === 0)) st.cart = state.cart;
    return {
        userInfoReducer: st
    }
}

/*actions from redux*/
function matchDispatchToProps(dispatch) {
    return bindActionCreators({onUpdateUserData: onUpdateUserData}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(UserRegister);



