import {
    GET_UPLOADED_ITEM,
    GET_UPLOADED_ITEM_SUCCESS,
    GET_UPLOADED_ITEM_FAILURE,
    LABEL_ITEM,
    LABEL_ITEM_SUCCESS,
    LABEL_ITEM_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* GET UPLOADED ITEM */
export function getUploadedItemRequest() {
    return (dispatch) => {
        dispatch(getUploadedItem());

        return axios.get('/api/label')
            .then((response) => {
                dispatch(getUploadedItemSuccess(response.data));
            }).catch((error) => {
                dispatch(getUploadedItemFailure(error.response.data.code));
            })
    }
}

export function getUploadedItem() {
    return {
        type: GET_UPLOADED_ITEM
    };
}

export function getUploadedItemSuccess(data) {
    return {
        type: GET_UPLOADED_ITEM_SUCCESS,
        data
    };
}

export function getUploadedItemFailure(error) {
    return {
        type: GET_UPLOADED_ITEM_FAILURE,
        error
    };
}

/* DO LABEL */
export function labelItemRequest(files) {
    return (dispatch) => {
        dispatch(labelItem());

        return axios.post('/api/label/doLabel', { files })
            .then((response) => {
                dispatch(labelItemSuccess());
            }).catch((error) => {
                dispatch(labelItemFailure(error.response.data.code));
            })
    }
}

export function labelItem() {
    return {
        type: LABEL_ITEM
    };
}

export function labelItemSuccess() {
    return {
        type: LABEL_ITEM_SUCCESS
    };
}

export function labelItemFailure(error) {
    return {
        type: LABEL_ITEM_FAILURE,
        error
    };
}


