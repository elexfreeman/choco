import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {onUpdateUserData} from '../redux/actions/userInfo';
import {generateSmsPass, login} from '../models/login_model';

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
                , showPassInput: false
                , pass: ''
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
        this.OnGenerateSmsPass = this.OnGenerateSmsPass.bind(this);
        this.OnLogin = this.OnLogin.bind(this);

    }


    onChangeB(e) {
        if (e.target.name === 'u_name') {
            this.setState({'u_name': e.target.value})
        } else {
            this.setState({[e.target.name]: e.target.value})
        }

    }

    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        if (window.localStorage.getItem('cart') != null) {
            document.getElementById('u_name').value = this.state.name;
            document.getElementById('phone').value = this.state.phone;
        }
    }

    OnGenerateSmsPass(e) {
        generateSmsPass(this.state.phone).then(resp => {
            console.log(resp);
        }).catch(e => console.log(e));
        this.setState({showPassInput: true})
    }

    OnLogin(e) {
        login(this.state.phone, this.state.pass).then(resp => {
            localStorage.setItem('apiKey', resp.user.apiKey);
            document.location.replace('/user/cart');
        }).catch(e => console.log(e));
    }

    render() {
        return (
            <div>
                {window.localStorage.getItem('cart') != null && (
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
                                            <input disabled={this.props.isRegistered}
                                                   onChange={this.onChangeB}
                                                   id='u_name'
                                                   name='u_name'

                                                   className="form-input"
                                                   type="text"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-3 col-sm-12">
                                            <label className="form-label">Телефон</label>
                                        </div>
                                        <div className="col-9 col-sm-12">
                                            <input disabled={this.props.isRegistered}
                                                   onChange={this.onChangeB}
                                                   id='phone'
                                                   name='phone'
                                                   className="form-input" type="text"
                                                   placeholder="+7.."/>
                                        </div>
                                    </div>
                                    <div className="form-group">

                                        {!this.props.isRegistered && (
                                            <div>
                                                {this.state.showPassInput ? (
                                                    <div>
                                                        <div className="form-group">
                                                            <div className="col-3 col-sm-12">
                                                                <label className="form-label">Введите код из SMS</label>
                                                            </div>
                                                            <div className="col-3 col-sm-12">
                                                                <input disabled={this.props.isRegistered}
                                                                       onChange={this.onChangeB}
                                                                       className="form-input"
                                                                       name="pass" type="text" id="pass"
                                                                       placeholder=". . . ."/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="col-6 col-sm-12">
                                                                Нажимая кнопку "Регистрация"
                                                                вы соглашаетесь с <a href='/agreement' target='_blank'>условиями
                                                                соглашения</a>
                                                            </div>
                                                            <div className="col-6 col-sm-12 text-right">
                                                                <button
                                                                    onClick={this.OnGenerateSmsPass}
                                                                    className="btn btn-link">Повтор SMS
                                                                </button>
                                                                <button
                                                                    onClick={this.OnLogin}
                                                                    className="btn btn-success">Регистрация
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="form-group">
                                                        <div className="col-9 col-sm-12">
                                                            Нажимая кнопку "Регистрация"
                                                            вы соглашаетесь с <a href='/agreement' target='_blank'>условиями
                                                            соглашения</a>
                                                        </div>
                                                        <div className="col-3 col-sm-12 text-right">
                                                            <button
                                                                onClick={this.OnGenerateSmsPass}
                                                                disabled={this.props.isRegistered}
                                                                className="btn btn-success">Регистрация
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}


                                            </div>
                                        )}
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



