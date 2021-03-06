import {
    GET_LABELED_ITEM,
    GET_LABELED_ITEM_SUCCESS,
    GET_LABELED_ITEM_FAILURE,
    VERIFY_ITEM,
    VERIFY_ITEM_SUCCESS,
    VERIFY_ITEM_FAILURE,
    GET_VERIFIED_ITEM,
    GET_VERIFIED_ITEM_SUCCESS,
    GET_VERIFIED_ITEM_FAILURE
} from './ActionTypes';
import axios from 'axios';

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

/* DO VERIFY ITEM */
export function verifyItemRequest(files) {
    return (dispatch) => {
        dispatch(verifyItem());

        return axios.post('/api/label/doVerify', { files })
            .then((response) => {
                dispatch(verifyItemSuccess());
            }).catch((error) => {
                dispatch(verifyItemFailure(error.response.data.code));
            }) 
    }
}

export function verifyItem() {
    return {
        type: VERIFY_ITEM
    };
}

export function verifyItemSuccess() {
    return {
        type: VERIFY_ITEM_SUCCESS
    };
}

export function verifyItemFailure(error) {
    return {
        type: VERIFY_ITEM_FAILURE,
        error 
    };
}

/* GET VERIFIED ITEM */
export function getVerifiedItemRequest() {
    return (dispatch) => {
        dispatch(getVerifiedItem());

        return axios.get('/api/label/getVerified')
            .then((response) => {
                dispatch(getVerifiedItemSuccess(response.data));
            }).catch((error) => {
                dispatch(getVerifiedItemFailure(error.response.data.code));
            })
    }
}

export function getVerifiedItem() {
    return {
        type: GET_VERIFIED_ITEM
    };
}

export function getVerifiedItemSuccess(data) {
    return {
        type: GET_VERIFIED_ITEM_SUCCESS,
        data
    };
}

export function getVerifiedItemFailure(error) {
    return {
        type: GET_VERIFIED_ITEM_FAILURE,
        error
    };
}