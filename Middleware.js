// https://medium.com/netscape/creating-custom-middleware-in-react-redux-961570459ecb
const redux = require('redux');

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const combineReducers = redux.combineReducers;

// State
const initalState = {
    number: 0
};

// ActionTypes
const ACTION_TYPE_INCREMENT = 'ACTION_TYPE_INCREMENT';
const ACTION_TYPE_DECREMENT = 'ACTION_TYPE_DECREMENT';

// Dispatchs
const increment = () => {
    return {
        type: ACTION_TYPE_INCREMENT,
        payload: 1
    };
}
const decrement = () => {
    return {
        type: ACTION_TYPE_DECREMENT,
        payload: 1
    };
}

// Reducers
const incrementReducer = (state = initalState, action) => {
    switch(action.type){
        case ACTION_TYPE_INCREMENT:
            return {
                ...state,
                number: state.number + action.payload
            }
        default:
            return state;
    }
}

const decrementReducer = (state = initalState, action) => {
    switch(action.type){
        case ACTION_TYPE_DECREMENT:
            return {
                ...state,
                number: state.number - action.payload
            }
        default:
            return state;
    }
}

rootReducer = combineReducers({
    inc: incrementReducer, 
    dec: decrementReducer
});

// Middlewares
const customMiddleware = store => next => action => {
    console.log('Middleware triggered:', action);
    return next(action);
}

const customThunkMiddleware = extraArguments => store => next => action => {
    console.log(extraArguments, store, next, action);
    if(typeof action === 'function') {
        const { dispatch } = store;
        return action(dispatch);
    }
    //return store.dispatch(action);
    return next(action);
}

// Thunk Action Creators
function thunkActionCreator() {
    console.log('Hi from thunk action creator!!');
    return function thunkFunction(dispatch, getState, extraArguments){
        console.log('Hi from thunk function!!');
    }
}

// Store
const store = createStore(rootReducer, applyMiddleware(customMiddleware, customThunkMiddleware({agr1: 'arg 1', agr2: 'arg 2'})));

store.dispatch(thunkActionCreator());

// store.dispatch(increment());
// console.log(store.getState())

// store.dispatch(increment());
// console.log(store.getState())

// store.dispatch(decrement());
// console.log(store.getState())

// store.dispatch(increment());
// console.log(store.getState())
