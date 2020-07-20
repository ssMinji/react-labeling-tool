import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    item: {
        status: 'INIT',
        error: -1
    }
}

export default function uploaditem(state, action) {
    if(typeof state === "undefined") state = initialState;

    switch(action.type) {
        // UPLOAD ITEM
        case types.UPLOAD_ITEM:
            return update(state, {
                item: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.UPLOAD_SUCCESS:
            return update(state, {
                item: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.UPLOAD_FAILURE:
            return update(state, {
                item: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        default:
            return state;
    }
}
