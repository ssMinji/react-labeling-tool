import {
    LABEL_ITEM,
    LABEL_SUCCESS,
    LABEL_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* LABEL ITEM */
export function labelItemRequest(item) {
    return (dispatch) => {
        dispatch(labelItem());

        return axios.post('/api/label', { item })
            .then((response) => {
                dispatch(labelSuccess());
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

export function labelSuccess() {
    return {
        type: LABEL_SUCCESS
    };
}

export function labelFailure(error) {
    return {
        type: LABEL_FAILURE,
        error
    };
}