import {
    LABEL_ITEM,
    LABEL_SUCCESS,
    LABEL_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* LABEL ITEM */
export function labelItemRequest(item, username) {
    return (dispatch) => {
        dispatch(labelItem());

        return axios.get('/api/label')
            .then((response) => {
                dispatch(labelSuccess(response.data));
            }).catch((error) => {
                dispatch(labelFailure(error.response.data.code));
            })
    }
}

export function labelItem() {
    return {
        type: LABEL_ITEM
    };
}

export function labelSuccess(data) {
    return {
        type: LABEL_SUCCESS,
        data
    };
}

export function labelFailure(error) {
    return {
        type: LABEL_FAILURE,
        error
    };
}