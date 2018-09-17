/*изменение инфы об юзере*/
import {getUserInfo} from "../../models/user_model";

export const onUpdateUserData = () => dispatch => {
    /*загружаем инйу о юзере*/
    getUserInfo().then(user => {
        console.log(user);
        dispatch({type: 'UPDATE_USER_DATA', payload: user})
    }).catch(e => {
        console.log(e);
    })
};



