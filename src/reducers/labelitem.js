import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    item: {
        status: 'INIT',
        error: -1,
    }
}

export default function labelitem(state, action) {
    if(typeof state == "undefined") state = initialState;

    switch(action.type) {
        case types.LABEL_ITEM:
            return update(state, {
                item: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.LABEL_SUCCESS:
            return update(state, {
                item: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.LABEL_FAILURE:
            return update(state, {
                item: {
                    statue: { $set: 'FAILURE'},
                    error: { $set: action.error }
                }
            });
        default:
            return state;
    }
}