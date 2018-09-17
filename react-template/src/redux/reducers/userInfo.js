
export default function userInfoReducer(state = [], action) {
    if (action.type === 'UPDATE_USER_DATA') {
        return action.payload;
    }
    return state;
}
