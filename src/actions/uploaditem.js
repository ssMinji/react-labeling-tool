import {
    UPLOAD_ITEM, 
    UPLOAD_SUCCESS,
    UPLOAD_FAILURE
} from './ActionTypes';
import axios from 'axios';


/* UPLOAD ITEM */
export function uploadItemRequest(files) {
    return (dispatch) => {
        dispatch(uploadItem());

        return axios.post('/api/upload', { files })
            .then((response) => {
                dispatch(uploadSuccess());
            }).catch((error) => {
                dispatch(uploadFailure(error.response.data.code));
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

export function uploadFailure(error) {
    return {
        type: UPLOAD_FAILURE,
        error
    };
}