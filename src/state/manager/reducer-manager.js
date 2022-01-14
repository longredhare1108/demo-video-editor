
import { combineReducers } from 'redux';
import {USER_LOGGED_OUT} from '../manager/action-types'
import { user } from '../feature/user/user-reducer';
const allReducers = combineReducers({
    user
});

const rootReducer = (state, action) => {
    if (action.type === USER_LOGGED_OUT) {
        state = undefined;
    }
    return allReducers(state, action)
}

export default rootReducer;