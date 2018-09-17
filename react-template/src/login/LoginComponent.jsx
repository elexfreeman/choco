import React, {Component} from 'react';

import {generateSmsPass, login} from '../models/login_model';

// кнопка корзины в главном меню
class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPassInput: false
            , phone: ''
            , pass: ''
        };

        this.OnGenerateSmsPass = this.OnGenerateSmsPass.bind(this);
        this.OnLogin = this.OnLogin.bind(this);
        this.onChangeB = this.onChangeB.bind(this);

    }

    OnGenerateSmsPass(e) {
        generateSmsPass(this.state.phone).then(resp => {
            console.log(resp);
        }).catch(e => console.log(e));
        this.setState({showPassInput: true})
    }

    OnLogin(e) {
        login(this.state.phone, this.state.pass).then(resp => {
            localStorage.setItem('apiKey',resp.user.apiKey);
            location.reload();
        }).catch(e => console.log(e));
    }

    onChangeB(e) {
        this.setState({[e.target.name]: e.target.value})
    }


    render() {
        return (<div className='login-form'>
            <div className="container">
                <div className="columns">
                    <div className="column col-3"></div>
                    <div className="column col-6">
                        <h3>Вход в личный кабинет</h3>
                        <div className="form-group">
                            <label className="form-label" htmlFor="user-phone">Ваш номер телефона</label>
                            <input className="form-input" onChange={this.onChangeB} name="phone" type="text" id="user-phone" placeholder="+7..."/>
                        </div>
                        <div className='text-right'>
                            <button onClick={this.OnGenerateSmsPass} className="btn btn-primary">Получить одноразовый
                                пароль
                            </button>
                        </div>
                        <div className={this.state.showPassInput ? ('') : ('hide')}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="user-pass">Одноразовый пароль из смс</label>
                                <input className="form-input" onChange={this.onChangeB} name="pass" type="text" id="user-pass"
                                       placeholder=". . . "/>
                            </div>
                            <div className='text-right'>
                                <button onClick={this.OnLogin} className="btn btn-primary">Войти</button>
                            </div>
                        </div>
                    </div>
                    <div className="column col-3"></div>

                </div>
            </div>

        </div>)
    }
}


export default LoginComponent;
