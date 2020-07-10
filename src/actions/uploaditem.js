import {
    UPLOAD_ITEM, 
    UPLOAD_SUCCESS,
    UPLOAD_FAILURE,
    SELECT_CATEGORY
} from './ActionTypes';
import axios from 'axios';

/* SELECT CATEGORY */
export function selectCategory(category) {
    return {
        type: SELECT_CATEGORY,
        category
    };
}


/* UPLOAD ITEM */
export function uploadItemRequest(text) {
    return (dispatch) => {
        dispatch(uploadItem());

        return axios.post('/api/upload', { text })
            .then((response) => {
                dispatch(uploadSuccess());
            }).catch((error) => {
                dispatch(uploadFailure());
            })
    }
}

export function uploadItem() {
    return {
        type: UPLOAD_ITEM
    };
}

export function uploadSuccess() {
    return {
        type: UPLOAD_SUCCESS
    };
}

export function uploadFailure() {
    return {
        type: UPLOAD_FAILURE
    };
}