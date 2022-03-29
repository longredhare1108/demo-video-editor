import { MENU_OPEN, SET_MENU } from '../../manager/action-types';

export const initialState = {
    isOpen: [],
    opened: true,
};

const menuReducer = (state = initialState, action) => {
    let id;
    switch (action.type) {
        case MENU_OPEN:
            id = action.id;
            return {
                ...state,
                isOpen: [id],
            };
        case SET_MENU:
            return {
                ...state,
                opened: action.opened,
            };
        default:
            return state;
    }
};

export default menuReducer;
