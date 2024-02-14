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

store.dispatch(buyCake(1));
console.log('Current State: ', store.getState());

store.dispatch(buyCake(1));
console.log('Current State: ', store.getState());

store.dispatch(buyCake(3));
console.log('Current State: ', store.getState());

store.dispatch(buyCake(1));
console.log('Current State: ', store.getState());

store.dispatch(buyCake(1));
console.log('Current State: ', store.getState());
