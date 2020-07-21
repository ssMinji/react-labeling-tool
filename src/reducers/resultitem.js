import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    item: {
        status: 'INIT',
        data: [],
        isLast: false,
        error: -1,
    }
}

export default function resultitem(state, action) {
    if(typeof state == "undefined") state = initialState;

    switch(action.type) {
        
        // GET LABELED ITEM
        case types.GET_VERIFIED_ITEM:
            return update(state, {
                item: {                    
                    status: { $set: 'WAITING' }
                }
            });
        case types.GET_VERIFIED_ITEM_SUCCESS:
            return update(state, {
                item: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.data },
                    isLast: { $set: action.data.length < 10 }
                }
            });
        case types.GET_VERIFIED_ITEM_FAILURE:
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