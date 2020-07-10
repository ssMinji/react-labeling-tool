import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    category: {
        part: ''
    },
    item: {
        status: 'INIT',
        error: -1
    }
}

export default function uploaditem(state, action) {
    if(typeof state === "undefined") state = initialState;

    switch(action.type) {
        case types.SELECT_CATEGORY:
            return update(state, {
                category: {
                    part: { $set: action.category }
                }
            });
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
