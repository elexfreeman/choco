import React, {Component} from 'react';
import {update, updateAvatar, getBase64} from "../models/user_model";
import {rest_server} from '../models/settings';

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {onUpdateUserData} from '../redux/actions/userInfo';
import NavLink from "react-router-dom/es/NavLink";
import UserMenu from "./UserMenu";
import {url_pref} from "../models/url_pref";

/*редактирование персональных данных*/
class UserEditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.userInfoReducer.name
            , surname: props.userInfoReducer.surname
            , patronymic: props.userInfoReducer.patronymic
            , email: props.userInfoReducer.email
            , avatar: props.userInfoReducer.avatar
            , photo: null
        };

        this.onChangeB = this.onChangeB.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onAddImages = this.onAddImages.bind(this);
        this.doUpdate = this.doUpdate.bind(this);

    }


    onChangeB(e) {
        this.setState({[e.target.name]: e.target.value}, () => console.log(this.state));
    }

    onUpdate(e) {
        this.doUpdate().then(() => {
            /*обновлем инфу в редаксе*/
            this.props.onUpdateUserData();
            this.props.history.push('/');
        })
    }

    doUpdate() {
        let that = this;
        return new Promise((resolve, reject) => {
            update({
                name: that.state.name
                , surname: that.state.surname
                , patronymic: that.state.patronymic
                , email: that.state.email
                , avatar: that.state.avatar
            }).then(resp => {
                resolve(resp);

            })
        });

    }


    /*орабатывает при монтировании компонента*/
    componentDidMount() {
        document.getElementById('u_name').value = this.state.name;
        document.getElementById('u_surname').value = this.state.surname;
        document.getElementById('u_patronymic').value = this.state.patronymic;
        document.getElementById('u_email').value = this.state.email;

    }

    onAddImages(event) {
        event.preventDefault();
        let that = this;
        Array.from(event.target.files).forEach(function (file, i, files) {

            /*меняем аву*/
            updateAvatar({
                avatar: file
            }).then(path => {
                that.setState({avatar: path})
            });
            /*конфертируем в base64 ля превью*/
            getBase64(file).then(
                data => {
                    console.log(file);
                    that.setState({
                        photo: data
                    })
                }
            );
        });
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
                                    <div className="avatar-photo-wraper">

                                        {this.state.photo ? (
                                            <img className='user-avatar'
                                                 src={this.state.photo}
                                                 alt="..."/>

                                        ) : (
                                            <img className='user-avatar'
                                                 src={rest_server + this.state.avatar}
                                                 alt="..."/>
                                        )}

                                        <div className="bg-hover">
                                            Изменить
                                        </div>

                                        <input id="avatarPhoto" className="add-pictures__form-control"
                                               onChange={this.onAddImages}
                                               type='file'></input>
                                    </div>
                                </div>
                                <div className="column col-6 col-sm-12">
                                    <div className="form-horizontal">
                                        <div className="form-group">
                                            <div className="col-3 col-sm-12">
                                                <label className="form-label">Фамилия</label>
                                            </div>
                                            <div className="col-9 col-sm-12">
                                                <input onChange={this.onChangeB} name='surname' id='u_surname'
                                                       className="form-input"
                                                       type="text"
                                                       placeholder=""/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-3 col-sm-12">
                                                <label className="form-label">Имя</label>
                                            </div>
                                            <div className="col-9 col-sm-12">
                                                <input onChange={this.onChangeB} name='name' id='u_name'
                                                       className="form-input"
                                                       type="text"
                                                       placeholder=""/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-3 col-sm-12">
                                                <label className="form-label">Отчество</label>
                                            </div>
                                            <div className="col-9 col-sm-12">
                                                <input onChange={this.onChangeB} name='patronymic' id='u_patronymic'
                                                       className="form-input"
                                                       type="text"
                                                       placeholder=""/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-3 col-sm-12">
                                                <label className="form-label">Email</label>
                                            </div>
                                            <div className="col-9 col-sm-12">
                                                <input onChange={this.onChangeB} name='email' id='u_email'
                                                       className="form-input"
                                                       type="text"
                                                       placeholder=""/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="col-3 col-sm-12">

                                            </div>
                                            <div className="col-9 col-sm-12 text-right">
                                                <button onClick={this.onUpdate} className="btn btn-primary">Сохранить
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="column col-3 col-sm-12 text-right">
                                    <NavLink className="btn btn-primary btn-lg" to={url_pref().url_main}>
                                        <i className="icon icon-cross"></i>
                                    </NavLink>
                                </div>

                            </div>

                        </div>
                    </div>
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


export default connect(mapStateToProps, matchDispatchToProps)(UserEditProfile);



