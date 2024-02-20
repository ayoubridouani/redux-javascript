const redux = require('redux');
const reduxLogger = require('redux-logger');
const thunk = require('redux-thunk').thunk;
const axios = require('axios');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger;

// State
const initialState = {
    loading: false,
    data: [],
    error: ''
};

// Actions
const fetchUsersRequest = () => {
    return {
        type: 'FETCH_USERS_REQUEST'
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: 'FETCH_USERS_SUCCESS',
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: 'FETCH_USERS_FAILURE',
        payload: error
    }
}

// Reducers
const fetch_data_reducer = (state, action) => {
    switch(action.type){
        case 'FETCH_USERS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_USERS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ''
            }
        case 'FETCH_USERS_FAILURE':
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        default:
            return state;
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/usersss/1')
        .then((response) => {
            const user = response.data;
            dispatch(fetchUsersSuccess(user));
        })
        .catch((error) => {
            dispatch(fetchUsersFailure(error.message));
        });
    }
}

// Store
const store = createStore(fetch_data_reducer, applyMiddleware(logger(),thunk));

store.dispatch(fetchUsers());
