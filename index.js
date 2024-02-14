const redux = require('redux');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

// State
const initialStateOfCake = {
    total_of_existed_cakes: 100
}

const initialStateOfIceCream = {
    total_of_existed_iceCreams: 100
}

// Actions of Cake
const buyCake = (sum_of_taked_cakes) => {
    return {
        type: 'BUY_CAKE',
        payload: {
            sum_of_taked_cakes: sum_of_taked_cakes
        }
    };
}

// Actions of Ice Cream
const buyIceCream = (sum_of_taked_ice_creams) => {
    return {
        type: 'BUY_ICECREAM',
        payload: {
            sum_of_taked_ice_creams: sum_of_taked_ice_creams
        }
    };
}

// Reducer of Cake
const reducerCake = (state = initialStateOfCake, action) => {
    switch(action.type){
        case 'BUY_CAKE':
            return {
                total_of_existed_cakes: state.total_of_existed_cakes - action.payload.sum_of_taked_cakes
            }
        default:
            return state;
    }
}

// Reducer of Ice Cream
const reducerIceCream = (state = initialStateOfIceCream, action) => {
    switch(action.type){
        case 'BUY_ICECREAM':
            return {
                total_of_existed_iceCreams: state.total_of_existed_iceCreams - action.payload.sum_of_taked_ice_creams
            }
        default:
            return state;
    }
}

// Store
rootReducers = combineReducers({
    cake: reducerCake,
    iceCream: reducerIceCream
})
const store = createStore(rootReducers);

// subscribe(listener)​: Adds a change listener. 
// It will be called any time an action is dispatched, and some part of the state tree may potentially have changed. 
// You may then call getState() to read the current state tree inside the callback.
const unsubscribe = store.subscribe(() => {console.log('Subscribe function: ', store.getState())});

store.dispatch(buyCake(1));
store.dispatch(buyCake(1));
store.dispatch(buyCake(3));
store.dispatch(buyCake(1));

store.dispatch(buyIceCream(1));
store.dispatch(buyIceCream(1));
store.dispatch(buyIceCream(3));
store.dispatch(buyIceCream(1));

unsubscribe();