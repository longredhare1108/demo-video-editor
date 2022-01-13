
import { combineReducers } from 'redux';
const allReducers = combineReducers({
});

const rootReducer = (state, action) => {
    if (action.type === "USER_LOGGED_OUT") {
        state = undefined;
    }
    return allReducers(state, action)
}

export default rootReducer;