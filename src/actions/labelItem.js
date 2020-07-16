import {
    GET_UPLOADED_ITEM,
    GET_UPLOADED_ITEM_SUCCESS,
    GET_UPLOADED_ITEM_FAILURE,
    LABEL_ITEM,
    LABEL_ITEM_FAILURE,
    LABEL_ITEM_SUCCESS,
    GET_LABELED_ITEM,
    GET_LABELED_ITEM_SUCCESS,
    GET_LABELED_ITEM_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* GET UPLOADED ITEM */
export function getUploadedItemRequest() {
    return (dispatch) => {
        dispatch(getUploadedItem());

        return axios.get('/api/label')
            .then((response) => {
                dispatch(getUploadedItemSuccess(response));
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

/* GET LABELED ITEM */
export function getLabeledItemRequest() {
    return (dispatch) => {
        dispatch(getLabeledItem());

        return axios.get('/api/label/getLabel')
            .then((response) => {
                dispatch(getLabeledItemSuccess(response.data));
            }).catch((error) => {
                dispatch(getLabeledItemFailure(error.response.data.code));
            })
    }
}

export function getLabeledItem() {
    return {
        type: GET_LABELED_ITEM
    };
}

export function getLabeledItemSuccess(data) {
    return {
        type: GET_LABELED_ITEM_SUCCESS,
        data
    };
}

export function getLabeledItemFailure(error) {
    return {
        type: GET_LABELED_ITEM_FAILURE,
        error
    };
}
