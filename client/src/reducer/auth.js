import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR,LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../action/types';

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    loading: true,
    isAuthenticated: null
}

export default function(state = initialState, action){
    const { type, payload } = action;

    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token: null,
                user: null
            }
        default:
            return {
                ...state
            }
    }
}