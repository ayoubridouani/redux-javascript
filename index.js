const redux = require('redux');

const createStore = redux.createStore;

// State
const initialState = {
    total_of_existed_cakes: 100
}

// Actions
const buyCake = (sum_of_taked_cakes) => {
    return {
        type: 'BUY_CAKE',
        payload: {
            sum_of_taked_cakes: sum_of_taked_cakes
        }
    };
}

// Reducer
const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'BUY_CAKE':
            return {
                total_of_existed_cakes: state.total_of_existed_cakes - action.payload.sum_of_taked_cakes
            }
        default:
            return state;
    }
}

// Store
const store = createStore(reducer);
console.log('Initial State: ', initialState);

// subscribe(listener)​: Adds a change listener. 
// It will be called any time an action is dispatched, and some part of the state tree may potentially have changed. 
// You may then call getState() to read the current state tree inside the callback.
const unsubscribe = store.subscribe(() => {console.log('Subscribe function: ', store.getState())});

store.dispatch(buyCake(1));
store.dispatch(buyCake(1));
store.dispatch(buyCake(3));
store.dispatch(buyCake(1));
console.log('Current State: ', store.getState());

unsubscribe();

store.dispatch(buyCake(1));
console.log('Current State: ', store.getState());