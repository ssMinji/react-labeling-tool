import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_GET_STATUS,
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
} from './ActionTypes';
import axios from 'axios';

/* LOGIN */
export function loginRequest(uid, password, job) { 
    return (dispatch) => {
        dispatch(login());

        return axios.post('/api/account/signin', { uid, password, job })
            .then((response) => {
                dispatch(loginSuccess(uid, job));
            }).catch((error) => {
                console.log('error occurred!!!!!!!');
                dispatch(loginFailure());
            });

    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(uid, job) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        uid, 
        job
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}


/* REGISTER */
export function registerRequest(uid, pw, username, job, dateOfBirth, email, phoneNum, company) {
    return (dispatch) => {
        dispatch(register());

        return axios.post('/api/account/signup', { uid, pw, username, job, dateOfBirth, email, phoneNum, company })
            .then((response) => {
                dispatch(registerSuccess());
            }).catch((error) => {
                console.log('returned error!!', error.response.data.code);
                dispatch(registerFailure(error.response.data.code));
            });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

/* GET STATUS */
export function getStatusRequest() {
    return (dispatch) => {
        dispatch(getStatus());

        return axios.get('/api/account/getInfo')
            .then((response) => {
                dispatch(getStatusSuccess(response.data.info.uid, response.data.info.currentJob));
            }).catch((error) => {
                dispatch(getStatusFailure());
            });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(uid, job) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        uid,
        job
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

/* LOGOUT */
export function logoutRequest() {
    return (dispatch) => {
        
        return axios.post('/api/account/logout')
            .then((response) => {
                dispatch(logout());
            });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}


















