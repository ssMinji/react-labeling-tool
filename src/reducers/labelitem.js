import * as types from 'actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    item: {
        status: 'INIT',
        data: [],
        isLast: false,
        error: -1,
    },
    label: {
        status: 'INIT',
        error: -1
    }
}

export default function labelitem(state, action) {
    if(typeof state == "undefined") state = initialState;

    switch(action.type) {
        case types.GET_UPLOADED_ITEM:
            return update(state, {
                item: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.GET_UPLOADED_ITEM_SUCCESS:
            return update(state, {
                item: {
                    status: { $set: 'SUCCESS' },
                    data: { $set: action.data },
                    isLast: { $set: action.data.length < 10 }
                }
            });
        case types.GET_UPLOADED_ITEM_FAILURE:
            return update(state, {
                item: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        case types.LABEL_ITEM:
            return update(state, {
                label: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.LABEL_ITEM_SUCCESS:
            return update(state, {
                label: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.LABEL_ITEM_FAILURE:
            return update(state, {
                label: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        default:
            return state;
    }
}