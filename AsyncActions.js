const redux = require('redux');
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger

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
    }
}

// Store
const store = createStore(fetch_data_reducer, applyMiddleware(logger()));

store.dispatch(fetchUsersRequest());
store.dispatch(fetchUsersSuccess(['u1', 'u2', 'u3']));
store.dispatch(fetchUsersFailure('Error!!'));
